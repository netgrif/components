import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-login-card',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    readonly TITLE = 'Login form';
    readonly DESCRIPTION = 'Ukážka login form...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
