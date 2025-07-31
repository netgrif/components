import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'ncc-abstract-logout-shortcut',
    template: '',
})
export abstract class AbstractLogoutShortcutComponent {

    @Output() loggedOut = new EventEmitter<any>(true);

    constructor(protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
    }

    logout(): void {
        this._user.logout().subscribe(response => {
            this._log.debug('User is logged out');
            this.loggedOut.emit(response);
            const redirectPath = this._config.getOnLogoutPath();
            if (redirectPath) {
                this._log.info('Redirecting to ' + redirectPath);
                this._router.navigate([redirectPath]);
            }
        });
    }

}
