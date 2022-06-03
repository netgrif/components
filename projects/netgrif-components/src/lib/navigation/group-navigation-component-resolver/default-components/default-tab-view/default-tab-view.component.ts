import {Component, Inject} from '@angular/core';
import {
    ViewIdService,
    TabContent,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    Task,
    DataGroup,
    extractIconAndTitle,
    NAE_VIEW_ID_SEGMENT,
    groupNavigationViewIdSegmentFactory,
    NewCaseCreationConfigurationData
} from '@netgrif/components-core';
import {DefaultTabbedCaseViewComponent} from '../default-tabbed-case-view/default-tabbed-case-view.component';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nc-default-tab-view',
    templateUrl: './default-tab-view.component.html',
    styleUrls: ['./default-tab-view.component.scss'],
    providers: [
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]}
    ]
})
export class DefaultTabViewComponent {

    tabs: Array<TabContent>;

    constructor(@Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>) {
        const labelData = extractIconAndTitle(this._navigationItemTaskData);
        const createCaseButtonTitle: string = _navigationItemTaskData[0].fields
            .find(field => field.stringId === 'create_case_button_title').value;
        const createCaseButtonIcon: string = _navigationItemTaskData[0].fields
            .find(field => field.stringId === 'create_case_button_icon').value;
        const newCaseButtonConfig: NewCaseCreationConfigurationData = {
            enableCaseTitle: true,
            isCaseTitleRequired: true,
            newCaseButtonConfig: {
                createCaseButtonTitle,
                createCaseButtonIcon
            }
        };
        this.tabs = [
            {
                label: {text: labelData.name, icon: labelData.icon},
                canBeClosed: false,
                tabContentComponent: DefaultTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: DefaultTabbedTaskViewComponent,
                    tabViewOrder: 0,
                    navigationItemTaskData: this._navigationItemTaskData,
                    newCaseButtonConfiguration: newCaseButtonConfig
                }
            }
        ];
    }

}
