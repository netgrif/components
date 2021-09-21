import {ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {DynamicEnumerationField} from '../models/dynamic-enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';

export abstract class AbstractEnumerationAutocompleteDynamicFieldComponent implements OnInit, OnDestroy {

    @Input() enumerationField: DynamicEnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChild('input') text: ElementRef;

    filteredOptions: Observable<Array<EnumerationFieldValue>>;

    private _destroy$: Subject<void>;

    constructor(protected _translate: TranslateService) {
    }

    ngOnInit() {
        this._destroy$ = new Subject();

        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(() => this.enumerationField.choices),
            takeUntil(this._destroy$)
        );

        this.enumerationField.choicesChange$.subscribe(() => {
            this.filteredOptions = of(this.enumerationField.choices);
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    change() {
        if (this.text.nativeElement.value !== undefined) {
            this.filteredOptions = of(this.enumerationField.choices);
        }
    }

    public renderSelection = (key: string | undefined | null) => {
        if (key !== undefined && key !== '' && key !== null) {
            const selected = this.enumerationField.choices.find(choice => choice.key === key);
            if (selected) {
                return selected.value;
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
