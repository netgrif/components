import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractLogoutShortcutComponent, ConfigurationService, LoggerService, UserService} from '@netgrif/components-core';

@Component({
    selector: 'nc-logout-shortcut',
    templateUrl: './logout-shortcut.component.html',
    styleUrls: ['./logout-shortcut.component.scss']
})
export class LogoutShortcutComponent extends AbstractLogoutShortcutComponent {

    constructor(protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
        super(_user, _log, _config, _router);
    }
}
