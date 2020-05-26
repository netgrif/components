import {Component} from '@angular/core';
import {RoutingBuilderService} from '../routing-builder/routing-builder.service';

@Component({
    selector: 'nae-routing',
    templateUrl: './routing.component.html',
    styleUrls: ['./routing.component.scss']
})
export class RoutingComponent {

    // by injecting the RoutingBuilderService into a Component, it gets created and sets up routing for the app
    constructor(routing: RoutingBuilderService) {
    }

}
