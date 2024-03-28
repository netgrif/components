import {Component, OnInit, Inject, Optional, OnDestroy} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-enumerataion-icon-field',
    template: ''
})
export abstract class AbstractEnumerationIconFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit, OnDestroy{
    public horizontal: boolean;
    protected arrow: boolean;
    protected divider: boolean;
    protected subComp: Subscription;

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }

    ngOnInit(): void {
        this.checkProperties();
        this.subComp = this.dataField.componentChange$().subscribe(() => {
            this.checkProperties();
        })
    }

    checkProperties() {
        this.horizontal = this.dataField.component?.properties?.horizontal === "true";
        this.arrow = this.dataField.component?.properties?.arrow === 'true';
        this.divider = this.dataField.component?.properties?.divider === 'true';
    }

    resolveIconValue(key: string) {
        return this.dataField.component?.optionIcons.find(icon => icon.key === key)?.value;
    }

    resolveIconType(key: string) {
        return this.dataField.component?.optionIcons.find(icon => icon.key === key)?.type;
    }

    resolveArrow() {
        return this.arrow;
    }

    resolveDivider() {
        return this.divider;
    }

    setEnumValue(key: string) {
        if (!this.formControlRef.disabled) {
            this.formControlRef.setValue(key);
        }
    }

    isSelected(key: string): boolean {
        return key === this.dataField.value;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subComp.unsubscribe();
    }
}
