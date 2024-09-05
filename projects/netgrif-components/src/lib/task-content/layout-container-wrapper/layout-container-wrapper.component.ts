import {Component} from '@angular/core';
import {AbstractLayoutContainerWrapperComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-layout-container-wrapper',
    templateUrl: './layout-container-wrapper.component.html',
    styleUrls: ['./layout-container-wrapper.component.scss']
})
export class LayoutContainerWrapperComponent extends AbstractLayoutContainerWrapperComponent {
    constructor() {
        super();
    }

}
