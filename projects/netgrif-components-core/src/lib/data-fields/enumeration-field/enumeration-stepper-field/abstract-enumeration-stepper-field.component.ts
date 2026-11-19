import {
    AfterViewChecked,
    Component,
    ElementRef,
    Inject, OnDestroy,
    OnInit,
    Optional,
    ChangeDetectionStrategy,
    QueryList,
    ViewChildren
} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-enumeration-stepper-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractEnumerationStepperFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit, AfterViewChecked, OnDestroy {

    /**
     * @deprecated the steps of the Material 3 stepper (`mat-stepper`) have no `#oneStep` reference, the list is empty;
     * kept for the applications, will be removed in a future major version
     */
    @ViewChildren('oneStep') steps: QueryList<ElementRef>;
    public arrowStepper: boolean;
    protected subComp: Subscription;

    constructor(protected ref: ElementRef,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
        this.arrowStepper = false;
    }

    ngOnInit() {
        this.arrowStepper = this.dataField.component?.properties?.arrowStepper === 'true';
        this.subComp = this.dataField.componentChange$().subscribe(() => {
            this.arrowStepper = this.dataField.component?.properties?.arrowStepper === 'true';
        });
    }

    /**
     * Index of the selected choice for `mat-stepper` (first step when nothing is selected).
     */
    public get selectedStepIndex(): number {
        return Math.max(0, this.dataField.choices.findIndex(choice => choice.key === this.dataField.value));
    }

    /**
     * @deprecated `mat-stepper` shows the state of its steps itself; kept for the applications, will be removed in a
     * future major version
     */
    canShowDoneIcon(index: number): boolean {
        return index <= this.dataField.choices.findIndex(choice => choice.key === this.dataField.value);
    }

    isSelected(key: string): boolean {
        return key === this.dataField.value;
    }

    /**
     * @deprecated limited the width of the custom steps (`#oneStep`, see {@link steps}), `mat-stepper` lays out its steps
     * itself; kept for the applications (subclasses calling `super.ngAfterViewChecked()`), will be removed in a future
     * major version
     */
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
