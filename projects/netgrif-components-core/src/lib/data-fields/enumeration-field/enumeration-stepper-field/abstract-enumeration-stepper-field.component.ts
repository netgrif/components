import {AfterViewChecked, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'ncc-abstract-enumeration-stepper-field',
    template: ''
})
export abstract class AbstractEnumerationStepperFieldComponent implements OnInit, AfterViewChecked {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChildren('oneStep') steps: QueryList<ElementRef>;
    public arrowStepper: boolean;

    constructor(protected ref: ElementRef) {
        this.arrowStepper = false;
    }

    ngOnInit() {
        if (this.enumerationField && this.enumerationField.component && this.enumerationField.component.properties &&
            this.enumerationField.component.properties.arrowStepper) {
            this.arrowStepper = this.enumerationField.component.properties.arrowStepper === 'true';
        }
    }

    canShowDoneIcon(index: number): boolean {
        return index <= this.enumerationField.choices.findIndex(choice => choice.key === this.enumerationField.value);
    }

    isSelected(key: string): boolean {
        return key === this.enumerationField.value;
    }

    ngAfterViewChecked() {
        if (!!this.steps && !!this.steps.toArray()) {
            const width = this.ref.nativeElement.parentElement.offsetWidth;
            const maxWidth = (width + (this.enumerationField.choices.length - 1) * 20) / this.enumerationField.choices.length;
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

    public resolveTitle(): boolean {
        return this.enumerationField.title !== undefined && this.enumerationField.title !== '';
    }

    public resolveValue(key: string): string {
        return this.enumerationField.choices.find(k => k.key === key)?.value;
    }
}
