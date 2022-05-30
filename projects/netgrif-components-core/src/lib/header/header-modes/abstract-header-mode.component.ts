import {Component, Input} from '@angular/core';

@Component({
    selector: 'ncc-abstract-header-mode',
    template: ''
})
export abstract class AbstractHeaderModeComponent {

    @Input()
    public overflowWidth: string;

    constructor() {
    }

    getMinWidth() {
        return this.overflowWidth;
    }
}
