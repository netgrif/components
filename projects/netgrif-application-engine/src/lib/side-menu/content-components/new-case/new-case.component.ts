import {Component, ElementRef, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent} from '@angular/cdk/stepper';
import {map, startWith, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {ProcessService} from '../../../process/process.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {NewCaseInjectionData} from './model/new-case-injection-data';
import {TranslateService} from '@ngx-translate/core';
import {MatToolbar} from '@angular/material';


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
    selectedColorControl = new FormControl('primary-color', Validators.required);

    colors: Form[] = [
        {value: 'panel-primary-icon', viewValue: 'Primary'},
        {value: 'panel-accent-icon', viewValue: 'Accent'},
    ];
    options: Array<Form> = [];
    filteredOptions: Observable<Array<Form>>;
    processOne: Promise<boolean>;
    injectedData: NewCaseInjectionData;
    @ViewChild('toolbar') toolbar: MatToolbar;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _formBuilder: FormBuilder,
                private _snackBarService: SnackBarService,
                private _caseResourceService: CaseResourceService,
                private _processService: ProcessService,
                private _petriNetResource: PetriNetResourceService,
                private _log: LoggerService,
                private _translate: TranslateService) {
        if (this._sideMenuControl.data) {
            this.injectedData = this._sideMenuControl.data as NewCaseInjectionData;
        }
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
        if (!this.selectedColorControl.valid) {
            return;
        }

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
}
