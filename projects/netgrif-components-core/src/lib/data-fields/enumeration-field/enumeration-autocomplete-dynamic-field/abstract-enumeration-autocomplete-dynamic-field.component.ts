import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild
} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith} from 'rxjs/operators';
import {DynamicEnumerationField} from '../models/dynamic-enumeration-field';
import {EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-enumeration-autocomplete-dynamic-field',
    template: ''
})
export abstract class AbstractEnumerationAutocompleteDynamicFieldComponent extends AbstractBaseDataFieldComponent<DynamicEnumerationField> implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('input') text: ElementRef;
    filteredOptions: Observable<Array<EnumerationFieldValue>>;
    choiceSubscription: Subscription;

    constructor(_translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DynamicEnumerationField>) {
        super(_translate, dataFieldPortalData);
    }

    ngOnInit() {
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(() => this.dataField.choices)
        );

       this.choiceSubscription = this.dataField.choicesChange$.subscribe(() => {
            this.filteredOptions = of(this.dataField.choices);
        });
    }

    ngAfterViewInit(): void {
        this.dataField.input = this.text;
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
        this.choiceSubscription.unsubscribe();
    }

    change() {
        if (this.text.nativeElement.value !== undefined) {
            this.filteredOptions = of(this.dataField.choices);
        }
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            if (this.dataField.choices.find(choice => choice.key === key)) {
                return this.dataField.choices.find(choice => choice.key === key).value;
            }
        }
        return key;
    }

    public buildErrorMessage() {
        if (this.formControlRef.hasError(EnumerationFieldValidation.REQUIRED)) {
            return this.translate.instant('dataField.validations.required');
        }
    }

}
