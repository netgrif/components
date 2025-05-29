import {Component} from '@angular/core';
import {AbstractTabCreationDetectorComponent} from '@netgrif/components-core';

/**
 * @ignore
 * Class that detects tab content creation and then initializes then calls the provided `initializeTab` function.
 * It is necessary if the tab content is lazy loaded, because the
 * ComponentPortal's outlet must be initialized before the Portal itself is created.
 */
@Component({
    selector: 'nc-tab-creation-detector',
    templateUrl: './tab-creation-detector.component.html',
    styleUrls: ['./tab-creation-detector.component.scss'],
    standalone: false
})
export class TabCreationDetectorComponent extends AbstractTabCreationDetectorComponent {
    constructor() {
        super();
    }
}
