import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';

@Component({
    selector: 'nae-logout-shortcut',
    templateUrl: './logout-shortcut.component.html',
    styleUrls: ['./logout-shortcut.component.scss']
})
export class LogoutShortcutComponent implements OnInit {

    constructor(private _user: UserService) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this._user.logout();
    }

}
