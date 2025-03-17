import {Component} from '@angular/core';
import {AbstractLoadingModeComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-loading-mode',
    templateUrl: './loading-mode.component.html',
    styleUrls: ['./loading-mode.component.scss'],
    standalone: false
})
export class LoadingModeComponent extends AbstractLoadingModeComponent {
    constructor() {
        super();
    }
}
