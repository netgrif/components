import {Component, Injector, Input, ChangeDetectionStrategy} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TabViewComponent extends AbstractTabViewComponent {
    /**
     * Renders only the selected tab without the tab header. Tabs are switched / closed programmatically.
     */
    @Input() public hideHeader = false;

    constructor(protected _viewService: ViewService, protected _logger: LoggerService, injector: Injector) {
        super(_viewService, _logger, injector);
    }
}
