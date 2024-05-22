import {Component, Inject, OnDestroy, Optional, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject, Subscription} from 'rxjs';
import {MatToolbar} from '@angular/material/toolbar';
import {
    CaseResourceService, CreateCaseEventOutcome,
    EventOutcomeMessageResource, LoadingEmitter,
    NAE_NET_ALL_VERSIONS, NAE_NET_VERSION_VISIBLE,
    NewCaseInjectionData, SideMenuInjectionData,
    SnackBarService
} from '@netgrif/components-core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith, tap} from 'rxjs/operators';
import semver from 'semver';
import {MatOption} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface Form {
    value: string;
    viewValue: string;
    version?: string;
}

@Component({
    selector: 'nc-new-case-dialog',
    templateUrl: './new-case-dialog.component.html',
    styleUrls: ['./new-case-dialog.component.scss']
})
export class NewCaseDialogComponent implements OnDestroy {

    isVersionVisible?: boolean;
    allVersionEnabled?: boolean;
    processFormControl = new FormControl('', Validators.required);
    titleFormControl = new FormControl('', Validators.required);
    netVersion: string;

    options: Array<Form> = [];
    colors: Array<Form> = [
        {value: 'panel-primary-icon', viewValue: 'Primary'},
        {value: 'panel-accent-icon', viewValue: 'Accent'},
    ];
    filteredOptions$: Observable<Array<Form>>;
    @ViewChild('toolbar') toolbar: MatToolbar;

    @ViewChild('stepper1') stepper1;
    @ViewChild('stepper2') stepper2;

    public loadingSubmit: LoadingEmitter;
    protected _options$: ReplaySubject<Array<Form>>;
    protected _injectedData: NewCaseInjectionData;
    protected _hasMultipleNets$: ReplaySubject<boolean>;
    protected _notInitialized$: BehaviorSubject<boolean>;
    private _allowedNetsSubscription: Subscription;

    constructor(protected _dialogRef: MatDialogRef<NewCaseDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: SideMenuInjectionData,
                protected _formBuilder: FormBuilder,
                protected _snackBarService: SnackBarService,
                protected _caseResourceService: CaseResourceService,
                protected _hotkeysService: HotkeysService,
                protected _translate: TranslateService,
                @Optional() @Inject(NAE_NET_VERSION_VISIBLE) isVersionVisible: boolean,
                @Optional() @Inject(NAE_NET_ALL_VERSIONS) allVersionEnabled: boolean) {
        if (this._data) {
            this._injectedData = this._data as NewCaseInjectionData;
        }
        this.isVersionVisible = isVersionVisible !== null ? isVersionVisible : true;
        this.allVersionEnabled = allVersionEnabled !== null ? allVersionEnabled : false;
        if (!this._injectedData) {
            this.closeNoNets();
        }
        this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
            this.nextStep();
            return false;
        }));

        this._hasMultipleNets$ = new ReplaySubject(1);
        this._notInitialized$ = new BehaviorSubject<boolean>(true);
        this._options$ = new ReplaySubject(1);
        this.loadingSubmit = new LoadingEmitter(false);

        this._allowedNetsSubscription = this._injectedData.allowedNets$.pipe(
            map(nets => nets.map(petriNet => ({
                value: petriNet.stringId,
                viewValue: petriNet.title,
                version: petriNet.version
            }))),
            map(nets => {
                if (!this.allVersionEnabled) {
                    return this.removeOldVersions(nets);
                } else {
                    return nets;
                }
            }),
            tap(options => {
                if (options.length === 0) {
                    this.closeNoNets();
                }
                this.options = options;
                this._hasMultipleNets$.next(options.length > 1);
            })
        ).subscribe(options => {
            this._options$.next(options);
            if (!this._notInitialized$.closed) {
                this._notInitialized$.next(false);
                this._notInitialized$.complete();
            }
        });

        this.filteredOptions$ = combineLatest([this._options$, this.processFormControl.valueChanges.pipe(startWith(''))]).pipe(
            map(sources => {
                const options = sources[0];
                const input = typeof sources[1] === 'string' || sources[1] === null ? sources[1] : sources[1].viewValue;
                return input ? this._filter(input, options) : options.slice();
            }),
            tap(filteredOptions => {
                if (filteredOptions.length === 1) {
                    this.processFormControl.setValue(filteredOptions[0], {emitEvent: false});
                }
            })
        );
    }

    ngOnDestroy(): void {
        this._hasMultipleNets$.complete();
        this.loadingSubmit.complete();
        this._allowedNetsSubscription.unsubscribe();
    }

    public get hasMultipleNets$(): Observable<boolean> {
        return this._hasMultipleNets$.asObservable();
    }

    public get notInitialized$(): Observable<boolean> {
        return this._notInitialized$.asObservable();
    }

    displayFn(process: Form): string {
        return process?.viewValue ? process?.viewValue : '';
    }

    public createNewCase(): void {
        if (this.loadingSubmit.value) {
            return
        }
        if (this.titleFormControl.valid || !this.isCaseTitleRequired()) {
            const newCase = {
                title: this.titleFormControl.value === '' ? null : this.titleFormControl.value,
                color: 'panel-primary-icon',
                netId: this.options.length === 1 ? this.options[0].value : this.processFormControl.value.value
            };
            this.loadingSubmit.on();
            this._caseResourceService.createCase(newCase)
                .subscribe(
                    (response: EventOutcomeMessageResource) => {
                        this.loadingSubmit.off();
                        if (!!response.outcome) {
                            this._snackBarService.openSuccessSnackBar(response.outcome.message === undefined
                                ? this._translate.instant('side-menu.new-case.createCase') + ' ' + newCase.title
                                : response.outcome.message);
                            this._dialogRef.close({
                                opened: false,
                                message: response.outcome.message === undefined
                                    ? 'Confirm new case setup'
                                    : response.outcome.message
                                ,
                                data: (response.outcome as CreateCaseEventOutcome).case
                            });
                        } else if (!!response.error) {
                            this._snackBarService.openWarningSnackBar(this._translate.instant('side-menu.new-case.createCaseError') + ' ' + newCase.title);
                            this._dialogRef.close({
                                opened: false,
                                message: response.error === undefined
                                    ? 'Confirm new case setup'
                                    : response.error
                            });
                        }
                    },
                    error => {
                        this.loadingSubmit.off();
                        this._snackBarService.openErrorSnackBar(error.message ? error.message : error);
                    }
                );
        }
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param value to compare matching options
     * @param options that should be filtered
     * @return  return matched options
     */
    protected _filter(value: string, options: Array<Form>): Array<Form> {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return options.filter(option => option.viewValue.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    protected closeNoNets() {
        this._snackBarService.openErrorSnackBar(this._translate.instant('side-menu.new-case.noNets'));
        this._dialogRef.close({
            opened: false
        });
    }

    nextStep() {
        if (this.stepper1) {
            if (this.stepper1.selectedIndex === 1) {
                this.createNewCase();
            } else {
                this.stepper1.next();
            }
        }
        if (this.stepper2) {
            if (this.stepper2.selectedIndex === 0) {
                this.createNewCase();
            } else {
                this.stepper2.next();
            }
        }
    }

    titleResolving() {
        const caze = this._translate.instant('side-menu.new-case.case');
        const name = typeof this.processFormControl.value === 'string' || this.processFormControl.value === null ?
            undefined : this.processFormControl.value.viewValue;
        return name === undefined ? caze : caze + ' - ' + name;
    }

    private removeOldVersions(options: Array<Form>): Array<Form> {
        const tempNets = Object.assign([], options);
        const petriNetIds = new Set(options.map(form => form.value));
        const newestNets = new Array<Form>();

        for (const value of petriNetIds) {
            let current: Form = {value, version: '1.0.0', viewValue: ''};
            for (const net of tempNets) {
                if (value === net.value && !semver.lt(net.version, current.version)) {
                    current = net;
                }
            }
            newestNets.push(current);
        }
        return newestNets;
    }

    isCaseTitleEnabled(): boolean {
        return !!(this._injectedData?.newCaseCreationConfiguration?.enableCaseTitle ?? true);
    }

    isCaseTitleRequired(): boolean {
        return this.isCaseTitleEnabled() && !!(this._injectedData?.newCaseCreationConfiguration?.isCaseTitleRequired ?? true);
    }

    showVersion(option: MatOption): void {
        if (option?.value?.version !== undefined)
            this.netVersion = option.value.version;
    }

    checkVersion(viewValue: any): void {
        const currentOption = typeof viewValue === 'string' || viewValue === null ? undefined : viewValue.version;
        if (currentOption === undefined) {
            this.netVersion = '';
        }
    }

    toNextStep(viewValue: any): void {
        if (viewValue !== null && viewValue?.value !== undefined) {
            this.stepper1.next();
        }
    }
}
