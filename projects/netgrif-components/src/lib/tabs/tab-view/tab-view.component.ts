import {Component, Injector} from '@angular/core';
import {AbstractTabViewComponent, LoggerService, ViewService} from '@netgrif/components-core';

/**
 * Component that renders a tab view.
 *
 * See {@link TabView} for the class that holds the logic for this view.
 */
@Component({
    selector: 'nc-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss'],
    standalone: false
})
export class TabViewComponent extends AbstractTabViewComponent {

    constructor(protected _viewService: ViewService, protected _logger: LoggerService, injector: Injector) {
        super(_viewService, _logger, injector);
    }
}
