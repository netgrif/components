import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-password-card',
    templateUrl: './password-form.component.html',
    styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

    readonly TITLE = 'Forgotten password form';
    readonly DESCRIPTION = 'Ukážka forgotten password form...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
