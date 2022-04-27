import { Input, OnDestroy, OnInit } from '@angular/core';
import { FeaturedValue } from '../abstract/featured-value';

export abstract class AbstractPanelItemComponent implements OnInit, OnDestroy {

    @Input() leadingIcon: string;
    @Input() featuredValue: FeaturedValue;
    @Input() textEllipsis = false;
    @Input() index: number;

    constructor() {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }
}
