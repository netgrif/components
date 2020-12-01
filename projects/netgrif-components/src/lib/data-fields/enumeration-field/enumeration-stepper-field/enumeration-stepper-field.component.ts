import {
    AfterViewChecked,
    Component, ElementRef, QueryList, ViewChildren
} from '@angular/core';
import {AbstractEnumerationStepperFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-enumeration-stepper-field',
    templateUrl: './enumeration-stepper-field.component.html',
    styleUrls: ['./enumeration-stepper-field.component.scss']
})
export class EnumerationStepperFieldComponent extends AbstractEnumerationStepperFieldComponent implements AfterViewChecked {
    @ViewChildren('oneStep') steps: QueryList<ElementRef>;

    constructor(private ref: ElementRef) {
        super();
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
}
