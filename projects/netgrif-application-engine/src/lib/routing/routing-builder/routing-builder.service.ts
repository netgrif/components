import {Injectable, Type} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ViewService} from '../view-service/view.service';
import {Route, Router} from '@angular/router';
import {View} from '../../configuration/interfaces/schema';
import {AuthenticationGuardService} from '../../authentication/services/guard/authentication-guard.service';
import {ViewClassInfo} from '../../../commons/view-class-info';
import {classify} from '../../../commons/angular-cli-devkit-core-strings';


@Injectable({
    providedIn: 'root'
})
export class RoutingBuilderService {

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
            route['canActivate'] = [AuthenticationGuardService];
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
                className = `${classify(view.layout.componentName)}Component`;
            } else {
                const classInfo = new ViewClassInfo(configPath, view.layout.name, view.layout.componentName);
                className = classInfo.className;
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
