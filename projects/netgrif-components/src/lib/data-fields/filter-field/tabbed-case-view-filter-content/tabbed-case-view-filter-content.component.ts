import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import {
    DashboardPortalComponentRegistryService,
    FilterField,
    NAE_BASE_FILTER,
    BaseFilter,
    SimpleFilter,
    FilterType
} from '@netgrif/components-core';

@Component({
  selector: 'nc-tabbed-case-view-filter-content',
  templateUrl: './tabbed-case-view-filter-content.component.html',
  styleUrls: ['./tabbed-case-view-filter-content.component.scss']
})
export class TabbedCaseViewFilterContentComponent implements AfterViewInit {

    @Input() filterField: FilterField;
    componentPortal: ComponentPortal<any>;

    constructor(private registry: DashboardPortalComponentRegistryService, private injector: Injector) {

    }

    ngAfterViewInit(): void {
        console.log("init...")
        this.createFilter();
        this.filterField.valueChanges().subscribe(() => {
            this.createFilter();
        })
    }

    createFilter() {
        const portalInjector = Injector.create({providers: [{ provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.fromQuery({query: this.filterField.value}, FilterType.CASE)} as BaseFilter}], parent: this.injector})
        this.componentPortal = this.registry.get("tabbed-case-filter", portalInjector)
    }

}
