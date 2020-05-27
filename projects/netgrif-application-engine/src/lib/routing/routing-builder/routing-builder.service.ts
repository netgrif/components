import {Injectable, Type} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ViewService} from '../view-service/view.service';
import {Route, Router} from '@angular/router';
import {View} from '../../configuration/interfaces/schema';
import {strings} from '@angular-devkit/core';
import {AuthenticationGuardService} from '../../authentication/services/guard/authentication-guard.service';


@Injectable({
    providedIn: 'root'
})
export class RoutingBuilderService {

    private static resolveClassSuffixForView(view: string): string {
        switch (view) {
            case 'login':
                return 'Login';
            case 'tabView':
                return 'TabView';
            case 'taskView':
                return 'TaskView';
            case 'caseView':
                return 'CaseView';
            case 'emptyView':
                return 'EmptyView';
            case 'sidenavView':
                return 'SidenavView';
            case 'toolbarView':
                return 'ToolbarView';
            case 'sidenavAndToolbarView':
                return 'SidenavAndToolbarView';
            case 'dashboard':
                return 'Dashboard';
            default:
                throw new Error(`nae.json configuration is invalid. Unknown view type '${view}'`);
        }
    }

    private static convertPathToClassNamePrefix(path: string): string {
        const regexDash = /-/g;
        return path.replace(regexDash, '_').replace(/\//g, '-').toLocaleLowerCase();
    }

    constructor(configService: ConfigurationService, private _viewService: ViewService, router: Router) {
        router.config.splice(0, router.config.length);
        for (const [pathSegment, view] of Object.entries(configService.get().views)) {
            router.config.push(this.constructRouteObject(view, pathSegment));
        }
    }

    private constructRouteObject(view: View, configPath: string): Route {
        const route = {
            path: view.routing.path,
            component: this.resolveComponentClass(view, configPath)
        };
        if (view.routing.match !== undefined && view.routing.match) {
            route['pathMatch'] = 'full';
        }
        // TODO 26.5.2020 - Finer granularity for view access control
        if (view.access === 'private') {
            route['canActivate'] = AuthenticationGuardService;
        }
        if (!!view.children) {
            route['children'] = [];
            Object.entries(view.children).forEach(([configPathSegment, childView]) => {
                route['children'].push(this.constructRouteObject(childView, `${configPath}/${configPathSegment}`));
            });
        }

        return route;
    }

    private resolveComponentClass(view: View, configPath: string): Type<any> {
        let result;
        if (!!view.component) {
            result = this._viewService.resolveNameToClass(view.component.class);
        } else if (!!view.layout) {
            // more or less copied from schematic implementation of ViewClassInfo, but referencing this class caused a compilation error
            let className;
            if (!!view.layout.componentName) {
                className = `${strings.classify(view.layout.componentName)}Component`;
            } else {
                const prefix = RoutingBuilderService.convertPathToClassNamePrefix(configPath);
                className = `${strings.classify(prefix)}${RoutingBuilderService.resolveClassSuffixForView(view.layout.name)}Component`;
            }
            result = this._viewService.resolveNameToClass(className);
        } else {
            throw new Error(`nae.json configuration is invalid. View at path ${configPath}` +
                ` must define either a 'layout' or a 'component' attribute`);
        }
        if (result === null) {
            throw new Error(`Some views from nae.json configuration have not been created in the project.` +
                ` Run  create-view schematic to rectify this`);
        }
        return result;
    }

}
