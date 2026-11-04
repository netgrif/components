import {Component, Injector, Input, OnChanges} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {FeaturedValue} from '../abstract/featured-value';
import {PanelItemComponentRegistryService} from './panel-item-component-registry.service';
import {NAE_PANEL_ITEM_DATA, PanelItemPortalData} from './panel-item-portal-data-injection-token';

@Component({
    selector: 'ncc-abstract-panel-item-component',
    template: ''
})
export abstract class AbstractPanelItemComponent implements OnChanges {

    @Input() leadingIcon: string;
    @Input() leadingIconEnabled: boolean;
    @Input() featuredValue: FeaturedValue;
    @Input() textEllipsis = false;

    public componentPortal: ComponentPortal<any> | undefined;

    protected constructor(protected readonly registry: PanelItemComponentRegistryService,
                          protected readonly injector: Injector) {
    }

    public ngOnChanges(): void {
        this.componentPortal = this.resolveComponentPortal();
    }

    protected resolveComponentPortal(): ComponentPortal<any> | undefined {
        const componentName = this.featuredValue?.component?.name;
        const portalData: PanelItemPortalData = {
            featuredValue: this.featuredValue,
            textEllipsis: this.textEllipsis
        };
        const portalInjector = Injector.create({
            providers: [{provide: NAE_PANEL_ITEM_DATA, useValue: portalData}],
            parent: this.injector
        });
        if (componentName && this.registry.contains(this.featuredValue.type, componentName)) {
            return this.registry.get(this.featuredValue.type, componentName, portalInjector);
        }
        return this.registry.getDefault(this.featuredValue.type, portalInjector);
    }
}
