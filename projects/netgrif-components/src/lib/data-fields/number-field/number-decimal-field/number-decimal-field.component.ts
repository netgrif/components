import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    AbstractNumberDecimalFieldComponent
} from "@netgrif/components-core";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'nc-number-decimal-field',
  templateUrl: './number-decimal-field.component.html',
  styleUrls: ['./number-decimal-field.component.scss']
})
export class NumberDecimalFieldComponent extends AbstractNumberDecimalFieldComponent {
    constructor(decimalPipe: DecimalPipe, translate: TranslateService) {
        super(decimalPipe, translate);
    }

    onFocusOut(event: Event) {
        this.transformToText(event);
    }

    onFocusIn() {
        this.transformToNumber();
    }
}
