import {AfterViewInit, Component, Inject, Injector, OnDestroy, Optional, Type} from "@angular/core";
import {TaskRefField} from "../model/task-ref-field";
import {NAE_BASE_FILTER} from "../../../search/models/base-filter-injection-token";
import {SimpleFilter} from "../../../filter/models/simple-filter";
import {BaseFilter} from "../../../search/models/base-filter";
import {NAE_VIEW_ID_SEGMENT} from "../../../user/models/view-id-injection-tokens";
import {ViewIdService} from "../../../user/services/view-id.service";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ComponentPortal} from "@angular/cdk/portal";
import {Subscription} from "rxjs";
import {NAE_DEFAULT_HEADERS} from "../../../header/models/default-headers-token";
import {NAE_CLICKABLE_TASKS} from "../model/task-ref-injection-tokens";
import {NAE_DATAFIELD_ALLOWED_NETS} from "../../case-ref-field/model/case-ref-injection-tokens";
import {TaskSearchRequestBody} from "../../../filter/models/task-search-request-body";

@Component({
    selector: 'ncc-abstract-task-ref-list-field',
    template: ''
})
export abstract class AbstractTaskRefListFieldComponent extends AbstractBaseDataFieldComponent<TaskRefField> implements AfterViewInit, OnDestroy {

    public componentPortal: ComponentPortal<any>;
    protected _sub: Subscription;
    protected _subComp: Subscription;

    protected constructor(protected injector: Injector,
                          protected taskViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.createFilter();
        this._sub = this.dataField.valueChanges().subscribe(() => {
            this.callCreateFilter();
        });
        this._subComp = this.dataField.componentChange$().subscribe(() => {
            this.callCreateFilter();
        });
    }

    protected callCreateFilter() {
        this.createFilter();
    }

    createFilter() {
        let portalInjector;
        const filterProperty: boolean = this.dataField?.component?.properties?.filter === 'true';
        let query: TaskSearchRequestBody;
        if (filterProperty) {
            query = JSON.parse(this.dataField?.component?.properties?.filterQuery) as TaskSearchRequestBody;
        }
        let providers = [
            {
                provide: NAE_DEFAULT_HEADERS, useValue: this.dataField.component?.properties?.headers?.split(',')
            },
            {
                provide: NAE_CLICKABLE_TASKS,
                useValue: this.dataField.component?.properties?.clickable === undefined ?
                    true : this.dataField.component?.properties?.clickable === "true"
            },
            {
                provide: NAE_DATAFIELD_ALLOWED_NETS,
                useValue: this.dataField.component?.properties?.allowedNets === undefined ?
                    [] : this.dataField.component?.properties?.allowedNets.split(',')
            },
            {
                provide: NAE_BASE_FILTER,
                useValue: { filter: SimpleFilter.fromTaskQuery(
                        (filterProperty && query ? query : {stringId: this.dataField.value.length > 0 ? this.dataField.value : ''})
                    )} as BaseFilter
            },
            {
                provide: NAE_VIEW_ID_SEGMENT,
                useValue: this.dataField.parentCaseId + '_' + this.dataField.parentTaskId + '_' + this.dataField.stringId
            },
            { provide: ViewIdService, useClass: ViewIdService }
        ];
        portalInjector = Injector.create({
            providers,
            parent: this.injector
        });
        this.componentPortal = new ComponentPortal(this.taskViewType, null, portalInjector);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._sub) {
            this._sub.unsubscribe();
        }
        this._subComp.unsubscribe()
    }
}
