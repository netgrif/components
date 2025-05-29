import {Component} from '@angular/core';

@Component({
    selector: 'nae-app-drawer-example',
    templateUrl: './double-drawer-example.component.html',
    styleUrls: ['./double-drawer-example.component.scss'],
    standalone: false
})
export class DoubleDrawerExampleComponent {

    fixed: boolean;

    constructor() {
        this.fixed = true;
    }


    openStatusChanged($event) {
        console.log('Drawer status:');
        console.log($event);
    }

}
