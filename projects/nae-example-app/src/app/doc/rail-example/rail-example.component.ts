import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-rail-example',
    templateUrl: './rail-example.component.html',
    styleUrls: ['./rail-example.component.scss'],
    standalone: false
})
export class RailExampleComponent implements OnInit {

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
