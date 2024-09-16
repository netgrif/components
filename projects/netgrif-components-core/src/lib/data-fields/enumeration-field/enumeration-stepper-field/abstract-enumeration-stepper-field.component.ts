import {
    AfterViewChecked,
    Component,
    ElementRef,
    Inject, OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChildren
} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-enumeration-stepper-field',
    template: ''
})
export abstract class AbstractEnumerationStepperFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit, AfterViewChecked, OnDestroy {

    @ViewChildren('oneStep') steps: QueryList<ElementRef>;
    public arrowStepper: boolean;
    protected subComp: Subscription;

    constructor(protected ref: ElementRef,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(undefined, dataFieldPortalData);
        this.arrowStepper = false;
    }

    ngOnInit() {
        this.arrowStepper = this.dataField.component?.properties?.arrowStepper === 'true';
        this.subComp = this.dataField.componentChange$().subscribe(() => {
            this.arrowStepper = this.dataField.component?.properties?.arrowStepper === 'true';
        });
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
        if (!this.formControlRef.disabled) {
            this.formControlRef.setValue(key);
        }
    }

    public hasTitle(): boolean {
        return this.dataField.title !== undefined && this.dataField.title !== '';
    }

    public resolveValue(key: string): string {
        return this.dataField.choices.find(k => k.key === key)?.value;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subComp.unsubscribe();
    }
}
