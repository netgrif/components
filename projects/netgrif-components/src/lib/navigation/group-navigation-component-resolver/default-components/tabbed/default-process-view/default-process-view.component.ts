import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NAE_TASK_FORCE_OPEN, NAE_VIEW_ID_SEGMENT, TabContent, ViewIdService} from '@netgrif/components-core';
import {BuilderComponent} from '../../../../../builder/builder.component';
import {DefaultProcessCaseViewComponent} from '../default-process-case-view/default-process-case-view.component';

/**
 * Process view (it replaces the workflow view): the list of the processes (cases of the `process` net) in the first tab,
 * a process opens in the Petriflow builder (`nc-builder`) in a new tab.
 *
 * Default view of the libraries until the process view gets its own configuration (menu item) in the engine: register it
 * in the `ViewService` of the application and reference it from `nae.json`
 * (`"component": {"class": "DefaultProcessViewComponent"}`). The application imports `BuilderModule` too (the builder
 * registers its data field components in the constructor of the module).
 */
@Component({
    selector: 'nc-default-process-view',
    templateUrl: './default-process-view.component.html',
    styleUrls: ['./default-process-view.component.scss'],
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'processes'},
        {provide: NAE_TASK_FORCE_OPEN, useValue: false},
        ViewIdService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DefaultProcessViewComponent {

    public readonly tabs: Array<TabContent> = [{
        label: {text: 'workflow.processes', icon: 'device_hub'},
        canBeClosed: false,
        tabContentComponent: DefaultProcessCaseViewComponent,
        injectedObject: {
            tabViewComponent: BuilderComponent,
            tabViewOrder: 0
        }
    }];
}
