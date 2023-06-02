import {
    AfterViewChecked,
    Component,
    ElementRef,
    Inject,
    OnInit,
    Optional,
    QueryList,
    ViewChildren
} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-enumeration-stepper-field',
    template: ''
})
export abstract class AbstractEnumerationStepperFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit, AfterViewChecked {

    @ViewChildren('oneStep') steps: QueryList<ElementRef>;
    public arrowStepper: boolean;

    constructor(protected ref: ElementRef,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(undefined, dataFieldPortalData);
        this.arrowStepper = false;

    }

    ngOnInit() {
        if (this.dataField && this.dataField.component && this.dataField.component.properties &&
            this.dataField.component.properties.arrowStepper) {
            this.arrowStepper = this.dataField.component.properties.arrowStepper === 'true';
        }
    }

    canShowDoneIcon(index: number): boolean {
        return index <= this.dataField.choices.findIndex(choice => choice.key === this.dataField.value);
    }

    isSelected(key: string): boolean {
        return key === this.dataField.value;
    }

    ngAfterViewChecked() {
        if (!!this.steps && !!this.steps.toArray()) {
            const width = this.ref.nativeElement.parentElement.offsetWidth;
            const maxWidth = (width + (this.dataField.choices.length - 1) * 20) / this.dataField.choices.length;
            this.steps.toArray().forEach(step => {
                step.nativeElement.style.maxWidth = maxWidth >= 72 ? maxWidth + 'px' : '72px';
            });
        }
    }

    setStepperValue(key: string) {
        if (!this.dataField.disabled) {
            this.formControlRef.setValue(key);
        }
    }
}
