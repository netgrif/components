import {Component} from '@angular/core';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

@Component({
    selector: 'ncc-abstract-loading-mode',
    template: ''
})
export abstract class AbstractLoadingModeComponent extends AbstractHeaderModeComponent {

    constructor() {
        super();
    }

}
