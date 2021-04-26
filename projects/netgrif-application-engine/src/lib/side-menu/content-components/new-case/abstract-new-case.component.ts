import {Inject, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {map, startWith, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject, Subscription} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {NewCaseInjectionData} from './model/new-case-injection-data';
import {TranslateService} from '@ngx-translate/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {MatToolbar} from '@angular/material/toolbar';
import semver from 'semver';

interface Form {
    value: string;
    viewValue: string;
    version?: string;
}

export abstract class AbstractNewCaseComponent implements OnDestroy {

    processFormControl = new FormControl('', Validators.required);
    titleFormControl = new FormControl('', Validators.required);

    options: Array<Form> = [];
    colors: Form[] = [
        {value: 'panel-primary-icon', viewValue: 'Primary'},
        {value: 'panel-accent-icon', viewValue: 'Accent'},
    ];
    filteredOptions$: Observable<Array<Form>>;
    @ViewChild('toolbar') toolbar: MatToolbar;

    @ViewChild('stepper1') stepper1;
    @ViewChild('stepper2') stepper2;

    protected _options$: ReplaySubject<Array<Form>>;
    protected _injectedData: NewCaseInjectionData;
    protected _hasMultipleNets$: ReplaySubject<boolean>;
    protected _notInitialized$: BehaviorSubject<boolean>;
    private _allowedNetsSubscription: Subscription;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _formBuilder: FormBuilder,
                          protected _snackBarService: SnackBarService,
                          protected _caseResourceService: CaseResourceService,
                          protected _hotkeysService: HotkeysService,
                          protected _translate: TranslateService) {
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as NewCaseInjectionData;
        }
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

        this._allowedNetsSubscription = this._injectedData.allowedNets$.pipe(
            map(nets => nets.map(petriNet => ({value: petriNet.stringId, viewValue: petriNet.title, version: petriNet.version}))),
            map(nets => {
                if (!this._sideMenuControl.allVersionEnabled) {
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
                const input = typeof sources[1] === 'string' ? sources[1] : sources[1].viewValue;
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
        this._allowedNetsSubscription.unsubscribe();
    }

    public get hasMultipleNets$(): Observable<boolean> {
        return this._hasMultipleNets$.asObservable();
    }

    public get notInitialized$(): Observable<boolean> {
        return this._notInitialized$.asObservable();
    }

    public stepChange($event: StepperSelectionEvent): void {
        this._sideMenuControl.publish({
            opened: true,
            message: 'Active step has changed',
            data: $event
        });
    }

    displayFn(process: Form): string {
        return process && process.viewValue ? process.viewValue : '';
    }

    public createNewCase(): void {
        if (this.titleFormControl.valid) {
            const newCase = {
                title: this.titleFormControl.value,
                color: 'panel-primary-icon',
                netId: this.options.length === 1 ? this.options[0].value : this.processFormControl.value.value
            };

            this._caseResourceService.createCase(newCase)
                .subscribe(
                    response => {
                        this._snackBarService.openSuccessSnackBar(this._translate.instant('side-menu.new-case.createCase')
                            + ' ' + newCase.title);
                        this._sideMenuControl.close({
                            opened: false,
                            message: 'Confirm new case setup',
                            data: response
                        });
                    },
                    error => this._snackBarService.openErrorSnackBar(error.message ? error.message : error)
                );
        }
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param value to compare matching options
     * @param options that should be filtered
     * @return  return matched options
     */
    protected _filter(value: string, options: Array<Form>): Form[] {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return options.filter(option => option.viewValue.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    protected closeNoNets() {
        this._snackBarService.openErrorSnackBar(this._translate.instant('side-menu.new-case.noNets'));
        this._sideMenuControl.close({
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

    titleShortening() {
        let size;
        if (this.toolbar && this.toolbar._elementRef && this.toolbar._elementRef.nativeElement &&
            this.toolbar._elementRef.nativeElement.offsetWidth) {
            switch (this.toolbar._elementRef.nativeElement.offsetWidth) {
                case 296:
                    size = 22;
                    break;
                case 496:
                    size = 42;
                    break;
                case 246:
                    size = 18;
                    break;
                default:
                    size = 32;
                    break;
            }
        } else {
            size = 32;
        }

        const caze = this._translate.instant('side-menu.new-case.case');
        const name = typeof this.processFormControl.value === 'string' ? undefined : this.processFormControl.value.viewValue;
        const title = name === undefined ? caze : caze + ' - ' + name;
        if (title.length > size) {
            const tmp = title.slice(0, size);
            return tmp + '...';
        }
        return title;
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
}
