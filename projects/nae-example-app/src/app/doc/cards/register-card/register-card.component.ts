import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-register-card',
    templateUrl: './register-card.component.html',
    styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

    readonly TITLE = 'Registration card';
    readonly DESCRIPTION = 'Ukážka registration card...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
