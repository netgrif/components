import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User, UserService} from '@netgrif/components-core';


@Component({
    selector: 'nc-dashboard-toolbar',
    templateUrl: './dashboard-toolbar.component.html',
    styleUrls: ['./dashboard-toolbar.component.scss']
})
export class DashboardToolbarComponent {

    constructor(
        private _user: UserService,
        private _router: Router) {
    }

    /* user session */
    public logout(): void {
        this._user.logout().subscribe(() => {
            this._router.navigate(['login']);
        });
    }

    public get loggedUser(): User {
        return this._user.user;
    }

    public isImpersonating(): boolean {
        return this.loggedUser.isImpersonating();
    }

}

