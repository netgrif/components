import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from '@angular/cdk/stepper';
import {catchError, finalize, map, startWith, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource-service';
import {ProcessService} from '../../../process/process.service';
import {Net} from '../../../process/net';
import {LoggerService} from '../../../logger/services/logger.service';
import {SideMenuService} from '../../services/side-menu.service';
import {SideMenuInjectionData} from '../../models/side-menu-injection-data';


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
        {value: 'color-fg-deep-purple-600', viewValue: 'Purple'},
        {value: 'color-fg-amber-500', viewValue: 'Yellow'},
        {value: 'color-fg-deep-orange-500', viewValue: 'Orange'},
        {value: 'color-fg-brown-500', viewValue: 'Brown'}
    ];
    options: Array<Form> = [];
    filteredOptions: Observable<Array<Form>>;
    processOne: Promise<boolean>;
    allowedNets: SideMenuInjectionData = [];

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _formBuilder: FormBuilder,
                private _snackBarService: SnackBarService,
                private _caseResourceService: CaseResourceService,
                private _processService: ProcessService,
                private _petriNetResource: PetriNetResourceService,
                private _log: LoggerService) {
        if (this._sideMenuControl.data) {
            this.allowedNets = this._sideMenuControl.data;
        }
    }

    ngOnInit() {
        if (this.allowedNets.length === 0) {
            this._snackBarService.openErrorSnackBar('No allowed Nets'),
                this._sideMenuControl.close({
                    opened: false
                });
        }
        this.allowedNets.forEach(id => {
            this._processService.getNet(id).subscribe(petriNet => {
                this.options.push({value: petriNet.stringId, viewValue: petriNet.title});
            });
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
        const newCase = {
            title: this.titleFormControl.value,
            color: this.selectedColorControl.value,
            netId: this.options.length === 1 ? this.options[0].value : this.processFormControl.value.value
        };

        this._caseResourceService.createCase(newCase)
            .subscribe(
                () => {
                    this._snackBarService.openInfoSnackBar('Successful create new case ' + newCase.title),
                        this._sideMenuControl.close({
                            opened: false,
                            message: 'Confirm new case setup',
                            data: newCase
                        });
                },
                error => this._snackBarService.openErrorSnackBar(error)
            );
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
    }
}
