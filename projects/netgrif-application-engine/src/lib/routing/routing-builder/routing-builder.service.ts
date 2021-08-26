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


/**
 * Uses the information from nae.json to construct the application's routing
 */
@Injectable({
    providedIn: 'root'
})
export class RoutingBuilderService {

    constructor(router: Router,
                private _configService: ConfigurationService,
                private _viewService: ViewService,
                private _logger: LoggerService,
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

    private constructRouteObject(view: View, configPath: string): Route | undefined {
        const component = this.resolveComponentClass(view, configPath);
        if (component === undefined) {
            return undefined;
        }
        if (!view.routing || !view.routing.path) {
            this._logger.warn(`nae.json configuration is invalid. View at path '${configPath}'` +
                ` must define a 'routing' attribute. Skipping this view for routing generation.`);
            return undefined;
        }
        const route = {
            path: view.routing.path,
            component
        };
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
                const childRoute = this.constructRouteObject(childView, `${configPath}/${configPathSegment}`);
                if (childRoute !== undefined) {
                    route['children'].push(childRoute);
                }
            });
        }
        if (!!view.layout && !!view.layout.name && view.layout.name === 'tabView') {
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
            let className;
            if (!!view.layout.componentName) {
                className = `${classify(view.layout.componentName)}Component`;
            } else if (view.layout.name === GroupNavigationConstants.GROUP_NAVIGATION_OUTLET) {
                this._logger.debug('ignoring group navigation outlet during routing construction');
                return undefined;
            } else {
                const classInfo = new ViewClassInfo(configPath, view.layout.name, view.layout.componentName);
                className = classInfo.className;
            }
            result = this._viewService.resolveNameToClass(className);
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

    private defaultRoutesRedirects(): Array<Route> {
        const result = [];
        const servicesConfig = this._configService.getServicesConfiguration();
        if (servicesConfig?.groupNavigation?.groupNavigationRoute !== undefined) {
            result.push({
                path: `${servicesConfig.groupNavigation.groupNavigationRoute}/:${GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM}`,
                component: this._groupNavigationComponentResolverComponent,
                canActivate: [AuthenticationGuardService]
            });
        }
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
