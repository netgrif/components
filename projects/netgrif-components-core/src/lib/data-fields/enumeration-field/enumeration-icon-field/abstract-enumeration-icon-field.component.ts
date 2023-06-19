import {Component, Input, OnInit, Inject, Optional} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-enumerataion-icon-field',
    template: ''
})
export abstract class AbstractEnumerationIconFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit{
    public horizontal: boolean;

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }

    ngOnInit(): void {
        if (this.enumerationField.component?.properties?.horizontal) {
            this.horizontal = this.enumerationField.component.properties.horizontal === "true";
        }
    }

    resolveIconValue(key: string) {
        return this.dataField.component?.optionIcons.find(icon => icon.key === key)?.value;
    }

    resolveIconType(key: string) {
        return this.dataField.component?.optionIcons.find(icon => icon.key === key)?.type;
    }

    resolveArrow(key: string) {
        return this.dataField.component?.properties.arrow === 'true';
    }

    resolveDivider(key: string) {
        return this.dataField.component?.properties.divider === 'true';
    }

    setEnumValue(key: string) {
        if (!this.formControlRef.disabled) {
            this.formControlRef.setValue(key);
        }
    }

    isSelected(key: string): boolean {
        return key === this.dataField.value;
    }
}
