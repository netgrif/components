import {
    Component,
    Inject,
    OnDestroy,
    Optional,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    ReplaySubject,
    Subscription
} from 'rxjs';
import {
    CaseResourceService,
    CreateCaseEventOutcome,
    EventOutcomeMessageResource,
    LoadingEmitter,
    NAE_NET_ALL_VERSIONS,
    NAE_NET_VERSION_VISIBLE,
    NewCaseInjectionData,
    SideMenuInjectionData,
    SnackBarService
} from '@netgrif/components-core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith, tap } from 'rxjs/operators';
import semver from 'semver';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Form {
    value: string;
    viewValue: string;
    version?: string;
    /** the default case name of the process: the case gets it when the title is not filled in */
    defaultCaseName?: string;
}

@Component({
    selector: 'nc-new-case-dialog',
    templateUrl: './new-case-dialog.component.html',
    styleUrls: ['./new-case-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NewCaseDialogComponent implements OnDestroy {
    isVersionVisible?: boolean;
    allVersionEnabled?: boolean;
    processFormControl = new FormControl<string | Form>(
        '',
        Validators.required
    );
    titleFormControl = new FormControl('', Validators.required);
    /** filters the list of the processes (first step) */
    searchFormControl = new FormControl('');

    /**
     * The step of the dialog: `process` - the list of the allowed processes (more of them are allowed), `title` - the
     * title of the case of the chosen process.
     */
    step: 'process' | 'title' = 'title';
    /** the search field above the list of the processes is shown for more processes than this */
    searchThreshold = 7;
    protected _filteredOptions: Array<Form> = [];
    protected _stepResolved = false;
    /** Enter on the dialog: the next step, removed with the dialog */
    protected _enterHotkey: Hotkey;

    options: Array<Form> = [];
    filteredOptions$: Observable<Array<Form>>;

    public loadingSubmit: LoadingEmitter;
    protected _options$: ReplaySubject<Array<Form>>;
    protected _injectedData: NewCaseInjectionData;
    protected _notInitialized$: BehaviorSubject<boolean>;
    private _allowedNetsSubscription: Subscription;

    constructor(
        protected _dialogRef: MatDialogRef<NewCaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) protected _data: SideMenuInjectionData,
        protected _formBuilder: FormBuilder,
        protected _snackBarService: SnackBarService,
        protected _caseResourceService: CaseResourceService,
        protected _hotkeysService: HotkeysService,
        protected _translate: TranslateService,
        @Optional() @Inject(NAE_NET_VERSION_VISIBLE) isVersionVisible: boolean,
        @Optional() @Inject(NAE_NET_ALL_VERSIONS) allVersionEnabled: boolean
    ) {
        if (this._data) {
            this._injectedData = this._data as NewCaseInjectionData;
        }
        this.isVersionVisible =
            isVersionVisible !== null ? isVersionVisible : true;
        this.allVersionEnabled =
            allVersionEnabled !== null ? allVersionEnabled : false;
        if (!this._injectedData) {
            this.closeNoNets();
        }
        this._enterHotkey = new Hotkey('enter', (event: KeyboardEvent): boolean => {
            if ((event?.target as HTMLElement)?.closest?.('button, a')) {
                return true;
            }
            this.nextStep();
            return false;
        });
        this._hotkeysService.add(this._enterHotkey);

        this._notInitialized$ = new BehaviorSubject<boolean>(true);
        this._options$ = new ReplaySubject(1);
        this.loadingSubmit = new LoadingEmitter(false);

        this._allowedNetsSubscription = this._injectedData.allowedNets$
            .pipe(
                map(nets =>
                    nets.map(petriNet => ({
                        value: petriNet.stringId,
                        viewValue: petriNet.title,
                        version: petriNet.version,
                        defaultCaseName: petriNet.defaultCaseName
                    }))
                ),
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
                    if (!this._stepResolved) {
                        this._stepResolved = true;
                        this.step = options.length > 1 ? 'process' : 'title';
                        if (options.length === 1 && !this.isTitleFieldVisible()) {
                            queueMicrotask(() => this.createNewCase());
                        }
                    }
                })
            )
            .subscribe(options => {
                this._options$.next(options);
                if (!this._notInitialized$.closed) {
                    this._notInitialized$.next(false);
                    this._notInitialized$.complete();
                }
            });

        this.filteredOptions$ = combineLatest([
            this._options$,
            this.searchFormControl.valueChanges.pipe(startWith(''))
        ]).pipe(
            map(([options, input]) => input ? this._filter(input, options) : options.slice()),
            tap(filteredOptions => this._filteredOptions = filteredOptions)
        );
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._enterHotkey);
        this.loadingSubmit.complete();
        this._allowedNetsSubscription.unsubscribe();
    }

    public get notInitialized$(): Observable<boolean> {
        return this._notInitialized$.asObservable();
    }

    public createNewCase(): void {
        if (this.loadingSubmit.value) {
            return;
        }
        if (this.canCreate()) {
            const newCase = {
                title:
                    this.hasDefaultCaseName() || !this.titleFormControl.value
                        ? null
                        : this.titleFormControl.value,
                color: 'panel-primary-icon',
                netId:
                    this.options.length === 1
                        ? this.options[0].value
                        : typeof this.processFormControl.value === 'string'
                        ? this.processFormControl.value
                        : this.processFormControl.value.value
            };
            this.loadingSubmit.on();
            this._caseResourceService.createCase(newCase).subscribe(
                (response: EventOutcomeMessageResource) => {
                    this.loadingSubmit.off();
                    if (!!response.outcome) {
                        const title = (response.outcome as CreateCaseEventOutcome).aCase?.title ?? newCase.title;
                        this._snackBarService.openSuccessSnackBar(
                            response.outcome.message === undefined
                                ? (title
                                    ? this._translate.instant('side-menu.new-case.caseCreated', {title})
                                    : this._translate.instant('side-menu.new-case.caseCreatedDefaultName'))
                                : response.outcome.message
                        );
                        this._dialogRef.close({
                            opened: false,
                            message:
                                response.outcome.message === undefined
                                    ? 'Confirm new case setup'
                                    : response.outcome.message,
                            data: (response.outcome as CreateCaseEventOutcome)
                                .aCase
                        });
                    } else if (!!response.error) {
                        this._snackBarService.openWarningSnackBar(newCase.title
                            ? this._translate.instant('side-menu.new-case.caseCreatedActionsError', {title: newCase.title})
                            : this._translate.instant('side-menu.new-case.caseCreatedDefaultNameActionsError'));
                        this._dialogRef.close({
                            opened: false,
                            message:
                                response.error === undefined
                                    ? 'Confirm new case setup'
                                    : response.error
                        });
                    }
                },
                error => {
                    this.loadingSubmit.off();
                    this._snackBarService.openErrorSnackBar(
                        error.message ? error.message : error
                    );
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
        const filterValue = value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        return options.filter(
            option =>
                option.viewValue
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .indexOf(filterValue) === 0
        );
    }

    protected closeNoNets() {
        this._snackBarService.openErrorSnackBar(
            this._translate.instant('side-menu.new-case.noNets')
        );
        this._dialogRef.close({
            opened: false
        });
    }

    /**
     * A process of the list is picked: the case is created right away when there is no title to fill in (the title is
     * disabled by the configuration, or the process has a default case name), otherwise the title step follows.
     */
    selectProcess(option: Form): void {
        if (this.loadingSubmit.value) {
            return;
        }
        this.processFormControl.setValue(option);
        if (!this.isTitleFieldVisible()) {
            this.createNewCase();
            return;
        }
        this.titleFormControl.markAsUntouched();
        this.step = 'title';
    }

    /** back from the title to the list of the processes, the title belongs to the case of the left process */
    backToProcess(): void {
        this.titleFormControl.reset('');
        this.step = 'process';
    }

    /**
     * Enter in the dialog: picks the only process left in the filtered list (first step), or creates the case when the
     * form is valid (title step)
     */
    nextStep() {
        if (this.step === 'process') {
            if (this._filteredOptions.length === 1) {
                this.selectProcess(this._filteredOptions[0]);
            }
            return;
        }
        if (this.canCreate()) {
            this.createNewCase();
        } else {
            this.processFormControl.markAsTouched();
            this.titleFormControl.markAsTouched();
        }
    }

    /** a process is chosen (an option of the autocomplete), or only one process is allowed */
    isProcessSelected(): boolean {
        if (this.options.length === 1) {
            return true;
        }
        const value = this.processFormControl.value;
        return value !== null && typeof value !== 'string' && value?.value !== undefined;
    }

    /** the chosen process (the only allowed one, or the option picked in the process field) */
    selectedProcess(): Form | undefined {
        if (this.options.length === 1) {
            return this.options[0];
        }
        const value = this.processFormControl.value;
        return value !== null && typeof value !== 'string' ? value : undefined;
    }

    /** the chosen process has a default case name: the user picks only the process, the case gets the name */
    hasDefaultCaseName(): boolean {
        return !!this.selectedProcess()?.defaultCaseName?.trim();
    }

    /** the title field: enabled by the configuration and the process has no default case name */
    isTitleFieldVisible(): boolean {
        return this.isCaseTitleEnabled() && !this.hasDefaultCaseName();
    }

    /** the process is chosen and the title is filled in (when it is required and the process has no default name) */
    canCreate(): boolean {
        return this.options.length > 0
            && this.isProcessSelected()
            && (this.hasDefaultCaseName() || this.titleFormControl.valid || !this.isCaseTitleRequired());
    }

    private removeOldVersions(options: Array<Form>): Array<Form> {
        const tempNets = Object.assign([], options);
        const petriNetIds = new Set(options.map(form => form.value));
        const newestNets = new Array<Form>();

        for (const value of petriNetIds) {
            let current: Form = { value, version: '1.0.0', viewValue: '' };
            for (const net of tempNets) {
                if (
                    value === net.value &&
                    !semver.lt(net.version, current.version)
                ) {
                    current = net;
                }
            }
            newestNets.push(current);
        }
        return newestNets;
    }

    isCaseTitleEnabled(): boolean {
        return !!(
            this._injectedData?.newCaseCreationConfiguration?.enableCaseTitle ??
            true
        );
    }

    isCaseTitleRequired(): boolean {
        return (
            this.isCaseTitleEnabled() &&
            !!(
                this._injectedData?.newCaseCreationConfiguration
                    ?.isCaseTitleRequired ?? true
            )
        );
    }
}
