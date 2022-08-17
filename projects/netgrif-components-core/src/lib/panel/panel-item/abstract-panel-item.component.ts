import {Component, Input} from '@angular/core';
import { FeaturedValue } from '../abstract/featured-value';

@Component({
    selector: 'ncc-abstract-panel-item-component',
    template: ''
})
export abstract class AbstractPanelItemComponent {

    @Input() leadingIcon: string;
    @Input() leadingIconEnabled: boolean;
    @Input() featuredValue: FeaturedValue;
    @Input() textEllipsis = false;

    constructor() {

    }
}
