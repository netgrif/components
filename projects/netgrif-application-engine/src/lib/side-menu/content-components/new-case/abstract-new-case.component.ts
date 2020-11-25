import {Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {map, startWith, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {NewCaseInjectionData} from './model/new-case-injection-data';
import {TranslateService} from '@ngx-translate/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {MatToolbar} from '@angular/material/toolbar';

interface Form {
    value: string;
    viewValue: string;
    version?: string;
}

export abstract class AbstractNewCaseComponent implements OnInit, OnChanges {

    processFormControl = new FormControl('', Validators.required);
    titleFormControl = new FormControl('', Validators.required);

    colors: Form[] = [
        {value: 'panel-primary-icon', viewValue: 'Primary'},
        {value: 'panel-accent-icon', viewValue: 'Accent'},
    ];
    options: Array<Form> = [];
    filteredOptions: Observable<Array<Form>>;
    processOne: Promise<boolean>;
    injectedData: NewCaseInjectionData;
    @ViewChild('toolbar') toolbar: MatToolbar;

    @ViewChild('stepper1') stepper1;
    @ViewChild('stepper2') stepper2;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _formBuilder: FormBuilder,
                protected _snackBarService: SnackBarService,
                protected _caseResourceService: CaseResourceService,
                protected _hotkeysService: HotkeysService,
                protected _translate: TranslateService) {
        if (this._sideMenuControl.data) {
            this.injectedData = this._sideMenuControl.data as NewCaseInjectionData;
        }
        this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
            this.nextStep();
            return false;
        }));
    }

    ngOnInit() {
        if (!this.injectedData) {
            this._snackBarService.openErrorSnackBar(this._translate.instant('side-menu.new-case.noNets'));
            this._sideMenuControl.close({
                opened: false
            });
        }

        this.injectedData.allowedNets$.subscribe(allowedNets => {
            this.options = allowedNets.map(petriNet => ({value: petriNet.stringId, viewValue: petriNet.title, version: petriNet.version}));
        });

        if (!this._sideMenuControl.allVersionEnabled) {
            this.removeOldVersions();
        }

        this.filteredOptions = this.processFormControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.viewValue),
                map(name => name ? this._filter(name) : this.options.slice()),
                tap(() => this.options.length === 1 ? this.processFormControl.setValue(this.options[0]) : undefined)
            );

        this.processOne = Promise.resolve(this.options.length === 1);
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
                color: 'black',
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
                    error => this._snackBarService.openErrorSnackBar(error)
                );
        }
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param  value to compare matching options
     * @return  return matched options
     */
    protected _filter(value: string): Form[] {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.options.filter(option => option.viewValue.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.filteredOptions = this.processFormControl.get('processFormControl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
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
        const name = this.options.length === 1 ? this.options[0].viewValue : this.processFormControl.value.viewValue;
        const title = caze + '-' + name;
        if (title.length > size) {
            const tmp = title.slice(0, size);
            return tmp + '...';
        }
        return title;
    }

    private removeOldVersions() {
        const tempNets = Object.assign([], this.options);
        const petriNetIds = new Set(this.options.map(form => form.value));
        const newestNets = new Array<Form>();

        for (const value of petriNetIds) {
            let current: Form = {value, version: '1.0.0', viewValue: ''};
            for (const net of tempNets) {
                if (value === net.value && this.isNewest(current.version, net.version)) {
                    current = net;
                }
            }
            newestNets.push(current);
        }
        this.options = Object.assign([], newestNets);
    }

    private isNewest(v1: string, v2: string): boolean {
            return v1 <= v2;
    }
}
