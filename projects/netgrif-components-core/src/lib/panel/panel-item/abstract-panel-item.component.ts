import { Input } from '@angular/core';
import { FeaturedValue } from '../abstract/featured-value';

export abstract class AbstractPanelItemComponent {

    @Input() leadingIcon: string;
    @Input() featuredValue: FeaturedValue;
    @Input() textEllipsis = false;
    @Input() index: number;

    constructor() {

    }
}
