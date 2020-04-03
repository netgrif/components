import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {LoggerService} from '../../../../logger/services/logger.service';

@Component({
    selector: 'nae-logout-shortcut',
    templateUrl: './logout-shortcut.component.html',
    styleUrls: ['./logout-shortcut.component.scss']
})
export class LogoutShortcutComponent implements OnInit {

    constructor(private _user: UserService, private _log: LoggerService) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this._user.logout().subscribe(() => {
            this._log.debug('User is logged out');
        });
    }

}
