import { AfterViewInit, Component, Inject, Injector} from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { FilterField } from './models/filter-field';
import { NAE_BASE_FILTER } from '../../search/models/base-filter-injection-token';
import { SimpleFilter } from '../../filter/models/simple-filter';
import { FilterType } from '../../filter/models/filter-type';
import { NAE_VIEW_ID_SEGMENT } from '../../user/models/view-id-injection-tokens';
import { ViewIdService } from '../../user/services/view-id.service';
import { Dashboard } from '../text-field/dashboard-portal-text-field/dashboard-view-constants';
import { BaseFilter } from '../../search/models/base-filter';
import { NAE_FILTER_FIELD } from './models/filter-field-injection-token';
import { SearchService } from '../../search/search-service/search.service';
import { AbstractFilterFieldContentComponent } from './abstract-filter-field-content.component';
import {ComponentRegistryService} from "../../registry/component-registry.service";

@Component({
    selector: 'ncc-abstract-filter-field-tab-view-content',
    template: ''
})
export abstract class AbstractFilterFieldTabViewContentComponent extends AbstractFilterFieldContentComponent implements AfterViewInit {

    componentPortal: ComponentPortal<any>;

    protected constructor(protected registry: ComponentRegistryService,
                          protected injector: Injector,
                          @Inject(NAE_FILTER_FIELD) filterField: FilterField,
                          searchService: SearchService) {
        super(filterField, searchService)
    }

    ngAfterViewInit(): void {
        this.createFilter();
        this._filterField.valueChanges().subscribe(() => {
            this.createFilter();
        });
    }

    createFilter() {
        const portalInjector = Injector.create({
            providers: [
                {
                    provide: NAE_FILTER_FIELD,
                    useValue: this._filterField
                },
                {
                    provide: NAE_BASE_FILTER,
                    useValue: { filter: SimpleFilter.fromQuery({ query: this._filterField.value }, FilterType.CASE) } as BaseFilter
                },
                {
                    provide: NAE_VIEW_ID_SEGMENT,
                    useValue: this._filterField.parentCaseId + '_' + this._filterField.parentTaskId + '_' + this._filterField.stringId
                },
                { provide: ViewIdService, useClass: ViewIdService }],
            parent: this.injector
        });
        this.componentPortal = this.registry.get(Dashboard.FILTER_TAB_VIEW_ID, portalInjector);
    }
}
