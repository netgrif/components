import { Component, Type } from '@angular/core';
import { TabContent } from '../../tabs/interfaces';
import {
    DashboardPortalComponentRegistryService
} from '../text-field/dashboard-portal-text-field/dashboard-portal-component-registry.service';
import { Dashboard } from '../text-field/dashboard-portal-text-field/dashboard-view-constants';
import { FilterField } from './models/filter-field';

@Component({
    selector: 'ncc-abstract-filter-field-tab-view',
    template: ''
})
export abstract class AbstractFilterFieldTabViewComponent {

    public tabs: Array<TabContent>;

    constructor(protected _registry: DashboardPortalComponentRegistryService,
                protected _filterField: FilterField,
                protected _tabContentComponent?: Type<any>,
                protected _tabViewComponent?: Type<any>) {

        this.tabs = [
            {
                label: {
                    text: this._filterField.filterMetadata[Dashboard.FILTER_TAB_VIEW_TITLE_KEY] ?? this._filterField.title,
                    icon: this._filterField.filterMetadata[Dashboard.FILTER_TAB_VIEW_ICON_KEY] ?? 'home'
                },
                canBeClosed: false,
                tabContentComponent: this.tabContentComponent(),
                injectedObject: {
                    tabViewComponent: this.tabViewComponent(),
                    tabViewOrder: 0,
                }
            }
        ];
    }

    public tabContentComponent(): Type<any> {
        let tabContentComponent: Type<any> = this._tabContentComponent;

        if (!!this._registry.getType(Dashboard.FILTER_CASE_VIEW_ID)) {
            tabContentComponent = this._registry.getType(Dashboard.FILTER_CASE_VIEW_ID)
        }
        return tabContentComponent;
    };

    public tabViewComponent(): Type<any> {
        let tabViewComponent: Type<any> = this._tabViewComponent;

        if (!!this._registry.getType(Dashboard.FILTER_TASK_VIEW_ID)) {
            tabViewComponent = this._registry.getType(Dashboard.FILTER_TASK_VIEW_ID)
        }
        return tabViewComponent;
    };
}
