import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'nae-logout-shortcut',
    templateUrl: './logout-shortcut.component.html',
    styleUrls: ['./logout-shortcut.component.scss']
})
export class LogoutShortcutComponent implements OnInit {

    constructor(private _user: UserService, private _log: LoggerService, private _config: ConfigurationService, private _router: Router) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this._user.logout().subscribe(() => {
            this._log.debug('User is logged out');
            if (this._config.get().services && this._config.get().services.auth && this._config.get().services.auth.logoutRedirect) {
                const redirectPath = this._config.get().services.auth.logoutRedirect;
                this._log.info('Redirecting to ' + redirectPath);
                this._router.navigate([redirectPath]);
            }
        });
    }

}
