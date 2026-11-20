import {Component} from '@angular/core';

@Component({
    selector: 'nae-app-rail-example',
    templateUrl: './rail-example.component.html',
    styleUrls: ['./rail-example.component.scss']
})
export class RailExampleComponent {

    hover: boolean;

    constructor() {
        this.hover = false;
    }

    onRailChange($event): void {
        console.log($event);
    }

}
