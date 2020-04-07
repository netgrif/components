import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-password-card',
    templateUrl: './password-card.component.html',
    styleUrls: ['./password-card.component.scss']
})
export class PasswordCardComponent implements OnInit {

    readonly TITLE = 'Forgotten password card';
    readonly DESCRIPTION = 'Ukážka forgotten password card...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
