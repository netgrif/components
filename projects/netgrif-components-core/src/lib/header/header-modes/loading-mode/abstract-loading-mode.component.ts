import {Component, Input} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

@Component({
    selector: 'ncc-abstract-loading-mode',
    template: ''
})
export abstract class AbstractLoadingModeComponent extends AbstractHeaderModeComponent {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
        super();
    }

}
