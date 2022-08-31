import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-drawer-example',
    templateUrl: './drawer-example.component.html',
    styleUrls: ['./drawer-example.component.scss']
})
export class DrawerExampleComponent {

    fixed: boolean;

    constructor() {
        this.fixed = true;
    }

    openStatusChanged($event) {
        console.log('Drawer status:');
        console.log($event);
    }

}
