import {Component, Inject, Injector, OnDestroy, OnInit, Optional, Type, ChangeDetectionStrategy} from "@angular/core";
import {merge, Subscription} from "rxjs";
import {TaskRefField} from "../model/task-ref-field";
import {NAE_BASE_FILTER} from "../../../search/models/base-filter-injection-token";
import {SimpleFilter} from "../../../filter/models/simple-filter";
import {BaseFilter} from "../../../search/models/base-filter";
import {NAE_VIEW_ID_SEGMENT} from "../../../user/models/view-id-injection-tokens";
import {ViewIdService} from "../../../user/services/view-id.service";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ComponentPortal} from "@angular/cdk/portal";
import {NAE_DEFAULT_HEADERS} from "../../../header/models/default-headers-token";

@Component({
    selector: 'ncc-abstract-task-ref-list-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractTaskRefListFieldComponent extends AbstractBaseDataFieldComponent<TaskRefField> implements OnInit, OnDestroy {

    public componentPortal: ComponentPortal<any>;
    protected _filterSub: Subscription;

    protected constructor(protected injector: Injector,
                          protected taskViewType: Type<any>,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TaskRefField>) {
        super(dataFieldPortalData);
    }

    /**
     * The task view is created before the first check of the template: created after the view (ngAfterViewInit) it
     * changed the portal of the checked template (NG0100 ExpressionChangedAfterItHasBeenCheckedError).
     */
    ngOnInit(): void {
        this.createFilter();
        this._filterSub = merge(this.dataField.valueChanges(), this.dataField.componentChange$()).subscribe(() => {
            this.createFilter();
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._filterSub?.unsubscribe();
    }

    createFilter() {
        const portalInjector = Injector.create({
            providers: [
                {
                    provide: NAE_BASE_FILTER,
                    useValue: { filter: SimpleFilter.fromTaskQuery({stringId: this.dataField.value}) } as BaseFilter
                },
                {
                    provide: NAE_DEFAULT_HEADERS,
                    useValue: this.dataField.component?.properties?.headers?.split(',')
                        ?.map(header => header.trim())
                        ?.filter(header => header.length > 0)
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
