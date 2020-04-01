import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {SideMenuService} from '../services/side-menu.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-reference';

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
export class NewCaseComponent implements OnInit {

    processFormControl = new FormControl('', Validators.required);
    titleFormControl = new FormControl('', Validators.required);
    selectedColorControl = new FormControl('', Validators.required);

    colors: Form[] = [
        {value: 'color-0', viewValue: 'Black'},
        {value: 'color-1', viewValue: 'Blue'},
        {value: 'color-2', viewValue: 'Yellow'},
        {value: 'color-3', viewValue: 'Red'}
    ];
    options: Array<Form>  = [];
    filteredOptions: Observable<Array<Form>>;

    constructor(private _formBuilder: FormBuilder,
                private sideMenuService: SideMenuService,
                private _caseResourceService: CaseResourceService,
                private  _petriNetService: PetriNetResourceService,
                private _snackBarService: SnackBarService) {

    }

    ngOnInit() {
        this._petriNetService.getAll().subscribe(petriNets => {
            if (petriNets) {
                petriNets.petriNetReferences.forEach(petriNet => {
                    console.log(petriNet.title);
                    this.options.push({value: petriNet.stringId, viewValue: petriNet.title});
                });
            }
            this.filteredOptions = this.processFormControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => typeof value === 'string' ? value : value.viewValue),
                    map(name => name ? this._filter(name) : this.options.slice())
                );
        });



// this.filteredOptions = this.processFormGroup.get('firstCtrl').valueChanges.pipe(
        //     startWith(''),
        //     map(value => this._filter(value))
        // );
    }

    displayFn(process: Form): string {
        return process && process.viewValue ? process.viewValue : '';
    }


    // ngOnChanges(changes: SimpleChanges): void {
    //     this.filteredOptions = this.processFormGroup.get('firstCtrl').valueChanges.pipe(
    //         startWith(''),
    //         map(value => this._filter(value))
    //     );
    // }

    public createNewCase(): void {
        // TODO: inject resource service - JOZO
        const newCase = {
            title: this.titleFormControl.value,
            color: this.selectedColorControl.value,
            netId: this.processFormControl.value.value
        };
        this._caseResourceService.createCase(newCase)
            .subscribe(
                caze => this._snackBarService.openInfoSnackBar('Successful create new case'),
                error => this._snackBarService.openErrorSnackBar(error)
            );

        this.sideMenuService.close();
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
