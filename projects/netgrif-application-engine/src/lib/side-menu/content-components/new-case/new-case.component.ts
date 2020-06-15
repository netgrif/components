import {Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from '@angular/cdk/stepper';
import {map, startWith, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {NewCaseInjectionData} from './model/new-case-injection-data';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';

interface Form {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'nae-new-case',
    templateUrl: './new-case.component.html',
    styleUrls: ['./new-case.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
    }]
})
export class NewCaseComponent implements OnInit, OnChanges {

    processFormControl = new FormControl('', Validators.required);
    titleFormControl = new FormControl('', Validators.required);
    selectedColorControl = new FormControl('', Validators.required);

    colors: Form[] = [
        {value: 'panel-primary-icon', viewValue: 'Primary'},
        {value: 'panel-accent-icon', viewValue: 'Accent'},
    ];
    options: Array<Form> = [];
    filteredOptions: Observable<Array<Form>>;
    processOne: Promise<boolean>;
    injectedData: NewCaseInjectionData;

    @ViewChild('stepper1') stepper1;
    @ViewChild('stepper2') stepper2;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _formBuilder: FormBuilder,
                private _snackBarService: SnackBarService,
                private _caseResourceService: CaseResourceService,
                private _hotkeysService: HotkeysService) {
        if (this._sideMenuControl.data) {
            this.injectedData = this._sideMenuControl.data as NewCaseInjectionData;
        }
        this._hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
            if (this.stepper1) {
                this.stepper1.next();
                if (this.stepper1.selectedIndex === 2) {
                    this.createNewCase();
                }
            }
            if (this.stepper2) {
                this.stepper2.next();
                if (this.stepper2.selectedIndex === 1) {
                    this.createNewCase();
                }
            }
            return false;
        }));
    }

    ngOnInit() {
        if (!this.injectedData) {
            this._snackBarService.openErrorSnackBar('No allowed Nets');
            this._sideMenuControl.close({
                opened: false
            });
        }

        this.injectedData.allowedNets$.subscribe( allowedNets => {
            this.options = allowedNets.map( petriNet => ({value: petriNet.stringId, viewValue: petriNet.title}));
        });

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
        if (this.selectedColorControl.valid) {
            const newCase = {
                title: this.titleFormControl.value,
                color: this.selectedColorControl.value,
                netId: this.options.length === 1 ? this.options[0].value : this.processFormControl.value.value
            };

            this._caseResourceService.createCase(newCase)
                .subscribe(
                    response => {
                        this._snackBarService.openSuccessSnackBar('Successful create new case ' + newCase.title);
                        this._sideMenuControl.close({
                            opened: false,
                            message: 'Confirm new case setup',
                            data: response
                        });
                    },
                    error => this._snackBarService.openErrorSnackBar(error)
            );
        } else {
            this.selectedColorControl.markAsTouched();
        }
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param  value to compare matching options
     * @return  return matched options
     */
    private _filter(value: string): Form[] {
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
            if (this.stepper1.selectedIndex === 2) {
                this.createNewCase();
            } else {
                this.stepper1.next();
            }
        }
        if (this.stepper2) {
            if (this.stepper2.selectedIndex === 1) {
                this.createNewCase();
            } else {
                this.stepper2.next();
            }
        }
    }
}
