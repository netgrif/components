import {Component, OnInit} from '@angular/core';
import {$e} from 'codelyzer/angular/styles/chars';
import {MatSlideToggleChange} from '@angular/material';

@Component({
    selector: 'nae-app-drawer-controls',
    templateUrl: './drawer-controls.component.html',
    styleUrls: ['./drawer-controls.component.scss']
})
export class DrawerControlsComponent implements OnInit {

    fixed: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    openStatusChanged($event) {
        console.log('Drawer status:');
        console.log($event);
    }

}
