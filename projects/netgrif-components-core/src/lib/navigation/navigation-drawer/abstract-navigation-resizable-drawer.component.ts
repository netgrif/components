import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'ncc-abstract-navigation-resizable-drawer',
    template: ''
})
export abstract class AbstractNavigationResizableDrawerComponent implements OnInit {
    @Input() public contentWidth: BehaviorSubject<number>;
    public width: number;

    constructor() {
    }

    ngOnInit(): void {
        if (!!this.contentWidth) {
            this.contentWidth.subscribe(
                newWidth => this.width = newWidth
            );
        }
    }
}
