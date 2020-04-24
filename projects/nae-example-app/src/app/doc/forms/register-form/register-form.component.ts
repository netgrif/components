import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-register-card',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    readonly TITLE = 'Registration form';
    readonly DESCRIPTION = 'Ukážka registration form...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
