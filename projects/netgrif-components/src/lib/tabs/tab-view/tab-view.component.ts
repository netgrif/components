import {Component} from '@angular/core';
import {AbstractTabViewComponent, LoggerService, ViewService} from '@netgrif/application-engine';

/**
 * Component that renders a tab view.
 *
 * See {@link TabView} for the class that holds the logic for this view.
 */
@Component({
    selector: 'nc-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent extends AbstractTabViewComponent {

    constructor(protected _viewService: ViewService, protected _logger: LoggerService) {
        super(_viewService, _logger);
    }
}
