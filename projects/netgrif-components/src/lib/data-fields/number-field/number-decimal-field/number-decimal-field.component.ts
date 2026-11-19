import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    AbstractNumberDecimalFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    NumberField
} from "@netgrif/components-core";
import {DecimalPipe} from "@angular/common";
import {MatFormFieldAppearance} from "@angular/material/form-field";

@Component({
  selector: 'nc-number-decimal-field',
  templateUrl: './number-decimal-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NumberDecimalFieldComponent extends AbstractNumberDecimalFieldComponent {
    constructor(decimalPipe: DecimalPipe,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>
                ) {
        super(decimalPipe, translate, dataFieldPortalData);
    }

    /**
     * @deprecated data fields of the library are always `outline` (Material 3 design),
     * the `appearance` of the field layout is not used any more.
     */
    getAppearance(): MatFormFieldAppearance {
            return 'outline';
    }

    onFocusOut(event: Event) {
        this.transformToText(event);
    }

    onFocusIn() {
        this.transformToNumber();
    }
}
