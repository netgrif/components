import {Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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
