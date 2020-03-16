import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-rail-controls',
    templateUrl: './rail-controls.component.html',
    styleUrls: ['./rail-controls.component.scss']
})
export class RailControlsComponent implements OnInit {

    hover: boolean;

    constructor() {
        this.hover = false;
    }

    ngOnInit(): void {
    }

    onRailChange($event): void {
        console.log($event);
    }

}
