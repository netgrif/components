import {Component} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'ncc-abstract-logout-shortcut',
    template: ''
})
export abstract class AbstractLogoutShortcutComponent {

    constructor(protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
    }

    logout(): void {
        this._user.logout().subscribe(() => {
            this._log.debug('User is logged out');
            const redirectPath = this._config.getOnLogoutPath();
            if (redirectPath) {
                this._log.info('Redirecting to ' + redirectPath);
                this._router.navigate([redirectPath]);
            }
        });
    }

}
