import {Injectable, Type} from '@angular/core';
import {
    DataGroup,
    GroupNavigationComponentResolverService,
    LoggerService,
    TaskResourceService,
    ConfigurationService,
    View,
    ViewService,
    extractFieldValueFromData,
    hasView,
    RoutingBuilderService
} from '@netgrif/components-core';
import {DefaultTabViewComponent} from './default-components/tabbed/default-tab-view/default-tab-view.component';
import {
    DefaultNoFilterProvidedComponent
} from "./default-components/default-no-filter-provided/default-no-filter-provided.component";

@Injectable()
export class DefaultGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

    constructor(taskResourceService: TaskResourceService, log: LoggerService, private _configService: ConfigurationService, private _viewService: ViewService,) {
        super(taskResourceService, log);
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
            throw new Error(`Cannot resolve navigation component`);
        }
    }
}
