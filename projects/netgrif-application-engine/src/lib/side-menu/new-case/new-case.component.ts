import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {SideMenuService} from '../services/side-menu.service';
import {map, startWith, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-reference';
import {NAE_SIDE_MENU_DATA} from '../side-menu-injection-token/side-menu-injection-token.module';

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
        {value: 'color-fg-deep-purple-600', viewValue: 'Purple'},
        {value: 'color-fg-amber-500', viewValue: 'Yellow'},
        {value: 'color-fg-deep-orange-500', viewValue: 'Orange'},
        {value: 'color-fg-brown-500', viewValue: 'Brown'}
    ];
    options: Array<Form> = [];
    filteredOptions: Observable<Array<Form>>;
    processOne: Promise<boolean>;

    constructor(private _formBuilder: FormBuilder,
                private sideMenuService: SideMenuService,
                private _caseResourceService: CaseResourceService,
                private  _petriNetService: PetriNetResourceService,
                private _snackBarService: SnackBarService,
                @Inject(NAE_SIDE_MENU_DATA) public allowedNets: Array<string>) {
        if (!this.allowedNets) {
            this.allowedNets = [];
        }
    }

    ngOnInit() {
        this._petriNetService.getAll().subscribe(petriNets => {
            if (petriNets) {
                if (Array.isArray(this.allowedNets) && this.allowedNets.length) {
                    petriNets.petriNetReferences.forEach(petriNet => {
                        if (this.allowedNets.includes(petriNet.stringId)
                            || this.allowedNets.includes(petriNet.title)
                            || this.allowedNets.includes(petriNet.identifier))
                            this.options.push({value: petriNet.stringId, viewValue: petriNet.title});
                    });
                } else {
                    petriNets.petriNetReferences.forEach(petriNet => {
                        this.options.push({value: petriNet.stringId, viewValue: petriNet.title});
                    });

                }

                if (this.options.length === 1) {
                    this.processOne = Promise.resolve(true);

                } else {
                    this.processOne = Promise.resolve(false);

                }

                this.filteredOptions = this.processFormControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.viewValue),
                        map(name => name ? this._filter(name) : this.options.slice()),
                        tap(() => this.options.length === 1 ? this.processFormControl.setValue(this.options[0]) : undefined)
                    );
            }
        });

    }

    displayFn(process: Form): string {
        return process && process.viewValue ? process.viewValue : '';
    }


    public createNewCase(): void {
        const newCase = {
            title: this.titleFormControl.value,
            color: this.selectedColorControl.value,
            netId: this.options.length === 1 ? this.options[0].value : this.processFormControl.value.value
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
