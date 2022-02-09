import {Input} from '@angular/core';

export abstract class AbstractHeaderModeComponent {

    @Input()
    public overflowWidth: string;

    constructor() {
    }

    getMinWidth() {
        return this.overflowWidth;
    }
}
