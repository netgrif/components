import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

@Component({
    selector: 'ncc-abstract-loading-mode',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractLoadingModeComponent extends AbstractHeaderModeComponent {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
        super();
    }

}
