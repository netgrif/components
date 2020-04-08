import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from '@angular/cdk/stepper';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource-service';


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

    processFormGroup: FormGroup;
    titleFormGroup: FormGroup;
    colorFormGroup: FormGroup;

    colors: Form[] = [
        {value: 'color-fg-deep-purple-600', viewValue: 'Purple'},
        {value: 'color-fg-amber-500', viewValue: 'Yellow'},
        {value: 'color-fg-deep-orange-500', viewValue: 'Orange'},
        {value: 'color-fg-brown-500', viewValue: 'Brown'}
    ];
    options: Array<Form> = [];
    filteredOptions: Observable<Array<Form>>;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _formBuilder: FormBuilder,
                private _snackBarService: SnackBarService,
                private _caseResourceService: CaseResourceService,
                private  _petriNetService: PetriNetResourceService) {
        this.options = [];
        this.colors = [];
    }

    ngOnInit() {
        this.processFormGroup = new FormGroup({
            processFormControl: new FormControl('', Validators.required)
        });

        this.titleFormGroup = this._formBuilder.group({
            titleFormControl: ['', Validators.required]
        });
        this.colorFormGroup = this._formBuilder.group({
            colorFormControl: ['', Validators.required]
        });

        this.filteredOptions = this.processFormGroup.get('processFormControl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        this._petriNetService.getAll().subscribe(petriNets => {
            if (petriNets) {
                petriNets.petriNetReferences.forEach(petriNet => {
                    this.options.push({value: petriNet.stringId, viewValue: petriNet.title});
                });
            }
            this.filteredOptions = this.processFormGroup.valueChanges
                .pipe(
                    startWith(''),
                    map(value => typeof value === 'string' ? value : value.viewValue),
                    map(name => name ? this._filter(name) : this.options.slice())
                );
        });

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.filteredOptions = this.processFormGroup.get('processFormControl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    displayFn(process: Form): string {
        return process && process.viewValue ? process.viewValue : '';
    }


    public stepChange($event: StepperSelectionEvent): void {
        this._sideMenuControl.publish({
            opened: true,
            message: 'Active step has changed',
            data: $event
        });
    }

    public createNewCase(): void {
        // TODO: inject resource service - JOZO
        const newCase = {
            title: this.titleFormGroup.value,
            color: this.colorFormGroup.value,
            netId: this.processFormGroup.value.value
        };
        this._caseResourceService.createCase(newCase)
            .subscribe(
                caze => this._snackBarService.openInfoSnackBar('Successful create new case'),
                error => this._snackBarService.openErrorSnackBar(error)
            );

        this._sideMenuControl.close({
            opened: false,
            message: 'Confirm new case setup',
            data: newCase
        });
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
}
