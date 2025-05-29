import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AbstractNavigationRailComponent} from '@netgrif/components-core';

const railAnimation = trigger('transform', [
    state('expand', style({
        width: '184px',
        'min-width': '184px',
        padding: '8px'
    })),
    state('collapse', style({
        width: '48px',
        'min-width': '48px',
        padding: '4px'
    })),
    transition('expand <=> collapse', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
]);

const railContentAnimation = trigger('transformContent', [
    state('shrink', style({
        'margin-left': '185px'
    })),
    state('grow', style({
        'margin-left': '49px'
    })),
    transition('shrink <=> grow', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
]);

@Component({
    selector: 'nc-navigation-rail',
    templateUrl: './navigation-rail.component.html',
    styleUrls: ['./navigation-rail.component.scss'],
    animations: [railAnimation, railContentAnimation],
    standalone: false
})
export class NavigationRailComponent extends AbstractNavigationRailComponent {
    constructor() {
        super();
    }
}
