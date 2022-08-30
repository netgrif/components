import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
    selector: 'ncc-abstract-navigation-rail',
    template: ''
})
export abstract class AbstractNavigationRailComponent implements OnDestroy {

    @Input() public expandOnHover: boolean;
    @Output() public expandChange: EventEmitter<boolean>;

    @ViewChild('sideRail') protected _rail: MatSidenav;

    protected _expanded: boolean;

    constructor() {
        this.expandChange = new EventEmitter<boolean>();
        this.expandOnHover = false;
        this._expanded = false;
    }

    ngOnDestroy(): void {
        this.expandChange.complete();
    }

    get expanded(): boolean {
        return this._expanded;
    }

    public open(): void {
        this._expanded = true;
        this.expandChange.emit(this._expanded);
    }

    public close(): void {
        this._expanded = false;
        this.expandChange.emit(this._expanded);
    }

    public toggle(): void {
        this._expanded = !this._expanded;
        this.expandChange.emit(this._expanded);
    }
}
