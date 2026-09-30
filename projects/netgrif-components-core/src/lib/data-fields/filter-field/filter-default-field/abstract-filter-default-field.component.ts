import {Component, ComponentRef, Inject, Injector, OnDestroy, OnInit, Optional, StaticProvider} from "@angular/core";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {AbstractFilterFieldContentComponent} from "../abstract-filter-field-content.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FilterField} from "../models/filter-field";
import {NAE_FILTER_FIELD} from "../models/filter-field-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {
    AbstractFilterStringQueryFieldComponent
} from "../filter-string-query-field/abstract-filter-string-query-field.component";
import {Subscription} from "rxjs";
import {skip} from "rxjs/operators";

@Component({
    selector: 'ncc-abstract-filter-default-field',
    template: ''
})
export abstract class AbstractFilterDefaultFieldComponent extends AbstractBaseDataFieldComponent<FilterField> implements OnInit, OnDestroy {

    public initialized: boolean;
    public portal: ComponentPortal<AbstractFilterFieldContentComponent | AbstractFilterStringQueryFieldComponent>;

    protected _contentQuerySub: Subscription;

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

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this._contentQuerySub && !this._contentQuerySub.closed) {
            this._contentQuerySub.unsubscribe();
        }
    }

    public get editable(): boolean {
        return !!this.dataField.behavior.editable;
    }

    protected abstract getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent | AbstractFilterStringQueryFieldComponent>;

    public onContentAttached(ref: ComponentRef<AbstractFilterFieldContentComponent | AbstractFilterStringQueryFieldComponent>): void {
        if (this._contentQuerySub && !this._contentQuerySub.closed) {
            this._contentQuerySub.unsubscribe();
        }

        const instance = ref.instance;
        if (instance instanceof AbstractFilterFieldContentComponent) {
            this._contentQuerySub = instance.predicateQueryChanged$().pipe(
                skip(1) // skip first emission from loadFromPfql
            ).subscribe(query => {
                this.formControlRef.setValue(query.value ? query.value : '');
            });
        }
    }
}
