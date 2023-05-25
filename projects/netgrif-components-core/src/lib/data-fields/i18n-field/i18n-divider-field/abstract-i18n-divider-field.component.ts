import {Component, Inject, Optional} from '@angular/core';
import {I18nField} from '../models/i18n-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-i18n-divider-field',
    template: ''
})
export abstract class AbstractI18nDividerFieldComponent extends AbstractBaseDataFieldComponent<I18nField>{


    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>) {
        super(dataFieldPortalData);
    }

    public getDividerColor(): string {
        if (this.dividerPropertyEnabled('dividerColor')) {
            return this.dataField.component.properties.dividerColor;
        }
    }

    public isDividerLGBTQ(): boolean {
        if (this.dividerPropertyEnabled('dividerLGBTQ')) {
            return this.dataField.component.properties.dividerLGBTQ === 'true';
        }
        return false;
    }

    public getDividerFontSize(): string {
        if (this.dividerPropertyEnabled('fontSize')) {
            return this.dataField.component.properties.fontSize + 'px';
        }
    }

    public dividerPropertyEnabled(property: string): boolean {
        return !!this.dataField?.component?.properties
            && property in this.dataField.component.properties;
    }
}
