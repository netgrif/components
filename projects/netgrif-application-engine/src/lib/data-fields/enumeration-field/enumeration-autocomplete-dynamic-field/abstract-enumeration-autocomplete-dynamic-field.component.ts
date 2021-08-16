import {ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith} from 'rxjs/operators';
import {DynamicEnumerationField} from '../models/dynamic-enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';

export abstract class AbstractEnumerationAutocompleteDynamicFieldComponent implements OnInit, OnDestroy {

    @Input() enumerationField: DynamicEnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChild('input') text: ElementRef;

    filteredOptions: Observable<EnumerationFieldValue[]>;

    constructor(protected _translate: TranslateService) {
    }

    ngOnInit() {
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(() => this.enumerationField.choices)
        );

        this.enumerationField.choicesChange$.subscribe(() => {
            this.filteredOptions = of(this.enumerationField.choices);
        });
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
    }

    change() {
        if (this.text.nativeElement.value !== undefined) {
            this.filteredOptions = of(this.enumerationField.choices);
        }
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            if (this.enumerationField.choices.find(choice => choice.key === key)) {
                return this.enumerationField.choices.find(choice => choice.key === key).value;
            }
        }
        return key;
    }

    public buildErrorMessage() {
        if (this.formControlRef.hasError(EnumerationFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
    }

}
