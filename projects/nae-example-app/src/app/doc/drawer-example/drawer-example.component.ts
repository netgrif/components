import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-drawer-example',
    templateUrl: './drawer-example.component.html',
    styleUrls: ['./drawer-example.component.scss']
})
export class DrawerExampleComponent implements OnInit {

    fixed: boolean;

    constructor() {
        this.fixed = true;
    }

    ngOnInit(): void {
    }

    openStatusChanged($event: boolean) {
        console.log('Drawer status:');
        console.log($event);
    }

}
