import {Inject, Injectable, Optional, Type} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ViewService} from '../view-service/view.service';
import {Route, Router} from '@angular/router';
import {View} from '../../../commons/schema';
import {AuthenticationGuardService} from '../../authentication/services/guard/authentication-guard.service';
import {ViewClassInfo} from '../../../commons/view-class-info';
import {classify} from '../../../commons/angular-cli-devkit-core-strings';
import {LoggerService} from '../../logger/services/logger.service';
import {AuthorityGuardService} from '../../authorization/authority/authority-guard.service';
import {RoleGuardService} from '../../authorization/role/role-guard.service';
import {GroupGuardService} from '../../authorization/group/group-guard.service';
import {GroupNavigationConstants} from '../../navigation/model/group-navigation-constants';
import {
    NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT
} from '../../navigation/model/group-navigation-component-resolver-component-injection-token';
import {
    AbstractGroupNavigationComponentResolverComponent
} from '../../navigation/group-navigation-component-resolver/abstract-group-navigation-component-resolver.component';
import {
    DynamicNavigationRouteProviderService
} from '../dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';

export const NAE_ROUTING_CONFIGURATION_PATH = "configPath";

/**
 * Uses the information from nae.json to construct the application's routing
 */
@Injectable({
    providedIn: 'root'
})
export class RoutingBuilderService {

    private _groupNavigationRouteGenerated = false;

    constructor(router: Router,
                private _configService: ConfigurationService,
                private _viewService: ViewService,
                private _logger: LoggerService,
                private _dynamicNavigationRouteService: DynamicNavigationRouteProviderService,
                @Optional() @Inject(NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT)
                private _groupNavigationComponentResolverComponent: Type<AbstractGroupNavigationComponentResolverComponent>) {
        router.config.splice(0, router.config.length);
        for (const [pathSegment, view] of Object.entries(_configService.get().views)) {
            const route = this.constructRouteObject(view, pathSegment);
            if (route !== undefined) {
                router.config.push(route);
            }
        }
        router.config.push(...this.defaultRoutesRedirects());
    }

    private constructRouteObject(view: View, configPath: string, ancestors: Array<Route> = []): Route | undefined {
        const component = this.resolveComponentClass(view, configPath);
        if (component === undefined) {
            return undefined;
        }
        if (!view.routing) {
            this._logger.warn(`nae.json configuration is invalid. View at path '${configPath}'` +
                ` must define a 'routing' attribute. Skipping this view for routing generation.`);
            return undefined;
        }

        const route: Route = {
            path: view.routing.path,
            data: {
                [NAE_ROUTING_CONFIGURATION_PATH]: configPath
            },
            component
        };

        if (view?.layout?.name === GroupNavigationConstants.GROUP_NAVIGATION_OUTLET) {
            if (this._groupNavigationRouteGenerated) {
                this._logger.warn(`Multiple groupNavigationOutlets are present in nae.json. Duplicate entry found at path ${configPath}`);
            } else {
                this._logger.debug(`GroupNavigationOutlet found in nae.json at path '${configPath}'`);
            }

            const pathNoParams = route.path;
            route.path = `${pathNoParams}/:${GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM}`;
            route.canActivate = [AuthenticationGuardService];
            const parentPathSegments = ancestors.map(a => a.path);
            parentPathSegments.push(pathNoParams);
            this._dynamicNavigationRouteService.route = parentPathSegments.join('/');

            this._groupNavigationRouteGenerated = true;
            return route;
        }

        if (view.routing.match !== undefined && view.routing.match) {
            route['pathMatch'] = 'full';
        }
        route['canActivate'] = [];
        if (view.access === 'private'
            || view.access.hasOwnProperty('role')
            || view.access.hasOwnProperty('group')
            || view.access.hasOwnProperty('authority')) {
            route['canActivate'].push(AuthenticationGuardService);
        }
        if (view.access.hasOwnProperty('role')) {
            route['canActivate'].push(RoleGuardService);
        }
        if (view.access.hasOwnProperty('authority')) {
            route['canActivate'].push(AuthorityGuardService);
        }
        if (view.access.hasOwnProperty('group')) {
            route['canActivate'].push(GroupGuardService);
        }
        if (!!view.children) {
            route['children'] = [];
            Object.entries(view.children).forEach(([configPathSegment, childView]) => {
                // TODO check if routes are constructed correctly regarding empty route segments
                const childRoute = this.constructRouteObject(childView, `${configPath}/${configPathSegment}`, [...ancestors, route]);
                if (childRoute !== undefined) {
                    route['children'].push(childRoute);
                }
            });
        }
        if (view?.layout?.name === 'tabView') {
            if (!view.children) {
                route['children'] = [];
            }
            route['children'].push({
                path: '**',
                component
            });
        }

        return route;
    }

    private resolveComponentClass(view: View, configPath: string): Type<any> | undefined {
        let result;
        if (!!view.component) {
            result = this._viewService.resolveNameToClass(view.component.class);
        } else if (!!view.layout) {
            result = this.resolveComponentClassFromLayout(view, configPath);
        } else {
            this._logger.warn(`nae.json configuration is invalid. View at path '${configPath}'` +
                ` must define either a 'layout' or a 'component' attribute. Skipping this view for routing generation.`);
            return undefined;
        }
        if (result === undefined) {
            this._logger.warn(`Some views from nae.json configuration have not been created in the project.` +
                ` Run create-view schematic to rectify this. Skipping this view for routing generation.`);
            return undefined;
        }
        return result;
    }

    private resolveComponentClassFromLayout(view: View, configPath: string): Type<any> | undefined {
        if (view.layout.name === GroupNavigationConstants.GROUP_NAVIGATION_OUTLET) {
            return this._groupNavigationComponentResolverComponent;
        }

        const className = RoutingBuilderService.parseClassNameFromView(view, configPath);
        return this._viewService.resolveNameToClass(className);
    }

    public static parseClassNameFromView(view: View, configPath: string): string {
        if (!!view.layout.componentName) {
            return `${classify(view.layout.componentName)}Component`;
        } else {
            const classInfo = new ViewClassInfo(configPath, view.layout.name, view.layout.componentName);
            return classInfo.className;
        }
    }

    private defaultRoutesRedirects(): Array<Route> {
        const result = [];
        const servicesConfig = this._configService.getServicesConfiguration();
        if (!!servicesConfig && !!servicesConfig.routing) {
            if (!!servicesConfig.routing.defaultRedirect) {
                result.push({
                    path: '',
                    redirectTo: servicesConfig.routing.defaultRedirect,
                    pathMatch: 'full'
                });
            }
            if (!!servicesConfig.routing.wildcardRedirect) {
                result.push({
                    path: '**',
                    redirectTo: servicesConfig.routing.wildcardRedirect
                });
            }
        }
        return result;
    }
}
