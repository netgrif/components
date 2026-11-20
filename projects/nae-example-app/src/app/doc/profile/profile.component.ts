import {Component} from '@angular/core';

@Component({
    selector: 'nae-app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    readonly TITLE = 'User profile';
    readonly DESCRIPTION = 'Ukážka profilu usera...';

    constructor() {
    }

}
