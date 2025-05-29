import {Component, Inject, Optional} from '@angular/core';
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
  styleUrls: ['./number-decimal-field.component.scss'],
    standalone: false
})
export class NumberDecimalFieldComponent extends AbstractNumberDecimalFieldComponent {
    constructor(decimalPipe: DecimalPipe,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>
                ) {
        super(decimalPipe, translate, dataFieldPortalData);
    }

    getAppearance(): MatFormFieldAppearance {
        if (!this.dataField?.materialAppearance) {
            return 'fill';
        }
        const validAppearances: MatFormFieldAppearance[] = ['fill', 'outline'];
        return validAppearances.includes(this.dataField.materialAppearance as MatFormFieldAppearance) ? this.dataField.materialAppearance as MatFormFieldAppearance : 'fill';
    }

    onFocusOut(event: Event) {
        this.transformToText(event);
    }

    onFocusIn() {
        this.transformToNumber();
    }
}
