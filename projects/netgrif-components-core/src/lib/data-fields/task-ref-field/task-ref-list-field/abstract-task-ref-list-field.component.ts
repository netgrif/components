import {AfterViewInit, Component, Inject, Injector, Optional, Type} from "@angular/core";
import {TaskRefField} from "../model/task-ref-field";
import {NAE_FILTER_FIELD} from "../../filter-field/models/filter-field-injection-token";
import {NAE_BASE_FILTER} from "../../../search/models/base-filter-injection-token";
import {SimpleFilter} from "../../../filter/models/simple-filter";
import {BaseFilter} from "../../../search/models/base-filter";
import {NAE_VIEW_ID_SEGMENT} from "../../../user/models/view-id-injection-tokens";
import {ViewIdService} from "../../../user/services/view-id.service";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ComponentPortal} from "@angular/cdk/portal";
import {ComponentRegistryService} from "../../../registry/component-registry.service";

@Component({
    selector: 'ncc-abstract-task-ref-dashboard',
    template: ''
})
export abstract class AbstractTaskRefListFieldComponent extends AbstractBaseDataFieldComponent<TaskRefField> implements AfterViewInit {

    componentPortal: ComponentPortal<any>;

    protected constructor(protected injector: Injector,
                          protected taskViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(dataFieldPortalData);
    }

    ngAfterViewInit(): void {
        this.createFilter();
        this.dataField.valueChanges().subscribe(() => {
            this.createFilter();
        });
    }

    createFilter() {
        const portalInjector = Injector.create({
            providers: [
                {
                    provide: NAE_FILTER_FIELD,
                    useValue: this.dataField
                },
                {
                    provide: NAE_BASE_FILTER,
                    useValue: { filter: SimpleFilter.emptyTaskFilter() } as BaseFilter
                },
                {
                    provide: NAE_VIEW_ID_SEGMENT,
                    useValue: this.dataField.parentCaseId + '_' + this.dataField.parentTaskId + '_' + this.dataField.stringId
                },
                { provide: ViewIdService, useClass: ViewIdService }],
            parent: this.injector
        });
        this.componentPortal = new ComponentPortal(this.taskViewType, null, portalInjector);
    }

}
