import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../user/services/user.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ProcessService} from '../../process/process.service';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: AuthenticationModule
})
export class RoleGuardService implements CanActivate {


    constructor(protected _redirectService: RedirectService,
                protected _userService: UserService,
                protected _processService: ProcessService,
                protected _configService: ConfigurationService,
                protected _router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        this._redirectService.intendedRoute = route;
        const view = this._configService.getViewByUrl(state.url.toString());
        if (typeof view.access !== 'string' && view.access.hasOwnProperty('role')) {
            const netRoleMap: Array<{ net, role }> = [];
            let accessRole;
            if (typeof view.access.role === 'string') {
                accessRole = [view.access.role];
            } else {
                accessRole = view.access.role;
            }
            accessRole.forEach(accessNetRole => {
                const splitRoleArray = accessNetRole.split('.');
                if (splitRoleArray.length === 2) {
                    netRoleMap.push({net: splitRoleArray[0], role: splitRoleArray[1]});
                } else {
                    throw new Error('Please enter the correct format NET.ROLE');
                }
            });
            return await this.promiseRole(netRoleMap);
        }
    }


    async promiseRole(netRoleMap: Array<{ net; role }>): Promise<boolean | UrlTree> {
        return new Promise<boolean | UrlTree>((resolve, reject) => {
            let access = false;
            this._processService.getNets(netRoleMap.map(({net}) => net)).pipe(map(nets => {
                nets.forEach(netId => {
                    netId.roles.forEach(roles => {
                        if (netRoleMap.filter(({net}) => {
                            return net === netId.identifier;
                        }).map(({role}) => role).includes(roles.name)) {
                            if (this._userService.hasRoleById(roles.stringId)) {
                                access = true;
                            }
                        }
                    });
                });
            }));
            resolve(access);
        });
    }

}
