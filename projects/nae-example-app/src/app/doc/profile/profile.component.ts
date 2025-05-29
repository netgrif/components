import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {
    readonly TITLE = 'User profile';
    readonly DESCRIPTION = 'Ukážka profilu usera...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
