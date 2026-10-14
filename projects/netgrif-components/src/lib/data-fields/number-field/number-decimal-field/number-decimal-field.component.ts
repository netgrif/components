import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    AbstractNumberDecimalFieldComponent,
    ConfigurationService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    LoggerService,
    NumberField
} from "@netgrif/components-core";
import {DecimalPipe} from "@angular/common";
import {MatFormFieldAppearance} from "@angular/material/form-field";

@Component({
  selector: 'nc-number-decimal-field',
  templateUrl: './number-decimal-field.component.html',
  styleUrls: ['./number-decimal-field.component.scss']
})
export class NumberDecimalFieldComponent extends AbstractNumberDecimalFieldComponent {
    constructor(decimalPipe: DecimalPipe,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                @Optional() configService: ConfigurationService,
                @Optional() log: LoggerService
                ) {
        super(decimalPipe, translate, dataFieldPortalData, configService, log);
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
