import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    selector: 'nae-app-navigation-rail',
    templateUrl: './navigation-rail.component.html',
    styleUrls: ['./navigation-rail.component.scss'],
    animations: [railAnimation, railContentAnimation]
})
export class NavigationRailComponent implements OnInit {

    @Input() public mainContent: TemplateRef<any> | null;
    @Input() public expandOnHover: boolean;
    @Output() public expandChange: EventEmitter<boolean>;

    @ViewChild('siderail') private _rail: MatSidenav;

    private _expanded: boolean;

    constructor() {
        this.expandChange = new EventEmitter<boolean>();
        this.expandOnHover = false;
        this._expanded = false;
    }

    ngOnInit(): void {
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
