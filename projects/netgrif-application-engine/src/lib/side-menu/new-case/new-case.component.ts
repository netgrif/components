import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {SideMenuService} from '../side-menu.service';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

    options: string[] = ['Process1', 'Process2', 'Process3'];
    colors: string[] = ['Black', 'Blue', 'Red', 'Yellow'];
    filteredOptions: Observable<string[]>;

    constructor(private _formBuilder: FormBuilder, private sideMenuService: SideMenuService) {
    }

    ngOnInit() {
        this.processFormGroup = new FormGroup({
            firstCtrl: new FormControl('', Validators.required)
        });

        this.titleFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.colorFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });

        this.filteredOptions = this.processFormGroup.get('firstCtrl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.filteredOptions = this.processFormGroup.get('firstCtrl').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    public createNewCase(): void {
        // TODO: create new case

        this.sideMenuService.close();
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
