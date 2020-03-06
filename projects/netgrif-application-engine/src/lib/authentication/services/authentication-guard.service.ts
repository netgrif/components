import {Injectable} from '@angular/core';
import {BasicAuthenticationService} from '../basic-authentication/basic-authentication.service';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

    constructor(public auth: BasicAuthenticationService, public router: Router) {
    }

    canActivate(): boolean {
        if (!this.auth.token) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
}
