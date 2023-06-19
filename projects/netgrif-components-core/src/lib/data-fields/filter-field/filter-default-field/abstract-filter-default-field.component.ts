import {Component, Inject, Injector, OnInit, Optional, StaticProvider} from "@angular/core";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {AbstractFilterFieldContentComponent} from "../abstract-filter-field-content.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FilterField} from "../models/filter-field";
import {NAE_FILTER_FIELD} from "../models/filter-field-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-filter-default-field',
    template: ''
})
export abstract class AbstractFilterDefaultFieldComponent extends AbstractBaseDataFieldComponent<FilterField> implements OnInit {

    public initialized: boolean;
    public portal: ComponentPortal<AbstractFilterFieldContentComponent>;

    constructor(protected _parentInjector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(dataFieldPortalData);
    }

    ngOnInit() {
        const providers: Array<StaticProvider> = [
            {provide: NAE_FILTER_FIELD, useValue: this.dataField}
        ];
        const injector = Injector.create({providers, parent: this._parentInjector});
        this.portal = new ComponentPortal(this.getFilterContentComponent(), null, injector);
        this.initialized = true;
    }

    public get editable(): boolean {
        return !!this.dataField.behavior.editable;
    }

    protected abstract getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent>;
}
