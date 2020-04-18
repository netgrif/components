import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-login-card',
    templateUrl: './login-card.component.html',
    styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

    readonly TITLE = 'Login card';
    readonly DESCRIPTION = 'Ukážka login card...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
