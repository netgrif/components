import {Injectable, Type} from '@angular/core';
import {
    DataGroup,
    GroupNavigationComponentResolverService,
    LoggerService,
    MenuResourceService,
    ConfigurationService,
    View,
    ViewService,
    extractFieldValueFromData,
    hasView,
    RoutingBuilderService
} from '@netgrif/components-core';
import {DefaultTabViewComponent} from './default-components/tabbed/default-tab-view/default-tab-view.component';
import {DefaultSingleTaskViewComponent} from './default-components/simple-views/default-single-task-view/default-single-task-view.component';
import {
    DefaultNoFilterProvidedComponent
} from "./default-components/default-no-filter-provided/default-no-filter-provided.component";

@Injectable()
export class DefaultGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

    constructor(menuResourceService: MenuResourceService, log: LoggerService, private _configService: ConfigurationService, private _viewService: ViewService,) {
        super(menuResourceService, log);
    }

    public resolveViewComponent(navItemData: Array<DataGroup>): Type<any> {
        const useCustomRouting = extractFieldValueFromData<boolean>(navItemData, 'use_custom_view');
        if (useCustomRouting) {
            return this.resolveCustomComponent(navItemData);
        } else {
            return this.resolveDefaultComponent(navItemData);
        }
    }

    protected resolveCustomComponent(navItemData: Array<DataGroup>): Type<any> {
        const customSelector = extractFieldValueFromData<string>(navItemData, 'custom_view_selector');
        for (const [pathSegment, view] of Object.entries(this._configService.get().views)) {
            if (pathSegment === customSelector) {
                return this.resolveComponentClass(view, pathSegment);
            }
        }
    }

    protected resolveComponentClass(view: View, configPath: string): Type<any> | undefined {
        let result: Type<any>;
        if (!!view.component) {
            result = this._viewService.resolveNameToClass(view.component.class);
        } else if (!!view.layout) {
            result = this.resolveComponentClassFromLayout(view, configPath);
        } else {
            return undefined;
        }
        if (result === undefined) {
            return undefined;
        }
        return result;
    }

    protected resolveComponentClassFromLayout(view: View, configPath: string): Type<any> | undefined {
        const className = RoutingBuilderService.parseClassNameFromView(view, configPath);
        return this._viewService.resolveNameToClass(className);
    }

    protected resolveDefaultComponent(navItemData: Array<DataGroup>): Type<any> {
        if (!hasView(navItemData)) {
            return DefaultNoFilterProvidedComponent;
        }

        const isTabbed: boolean = extractFieldValueFromData(navItemData, 'use_tabbed_view');
        if (!!isTabbed) {
            return DefaultTabViewComponent;
        } else {
            return this.getUntabbedDefaultComponent(navItemData);
        }
    }

    protected getUntabbedDefaultComponent(navItemData: Array<DataGroup>): Type<any> {
        const menuItemDataGroups: Array<DataGroup> = navItemData.slice(0, 1);
        const viewType: string = extractFieldValueFromData<string>(menuItemDataGroups, "view_configuration_type");
        switch (viewType) {
            case "single_task_view":
                return DefaultSingleTaskViewComponent;
            default:
                return DefaultNoFilterProvidedComponent;
        }
    }
}
