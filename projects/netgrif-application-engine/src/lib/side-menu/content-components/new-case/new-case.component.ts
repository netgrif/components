import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from '@angular/cdk/stepper';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';


@Component({
    selector: 'nae-new-case',
    templateUrl: './new-case.component.html',
    styleUrls: ['./new-case.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
    }]
})
export class NewCaseComponent implements OnInit, OnChanges {

    public processFormGroup: FormGroup;
    public titleFormGroup: FormGroup;
    public colorFormGroup: FormGroup;

    public options: Array<string>;
    public colors: Array<string>;
    public filteredOptions: Observable<Array<string>>;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _formBuilder: FormBuilder,
                private _snackBarService: SnackBarService) {
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
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.filteredOptions = this.processFormGroup.get('processFormControl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
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
            title: this.titleFormGroup.getRawValue(),
            color: this.colorFormGroup.value,
            netId: this.processFormGroup.getRawValue()
        };

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
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.options.filter(option => option.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }
}
