import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FlexModule} from "@ngbracket/ngx-layout";
import {HeaderComponentModule} from "../../../header/header.module";
import {PanelComponentModule} from "../../../panel/panel.module";
import {SearchComponentModule} from "../../../search/search.module";
import {HeaderComponent} from "../../../header/header.component";
import {
    AbstractTaskViewComponent,
    AllowedNetsServiceFactory,
    ChangedFieldsService,
    NAE_TAB_DATA,
    TaskViewService,
    SimpleFilter,
    CategoryFactory,
    SearchService,
    ViewIdService,
    NAE_BASE_FILTER,
    AllowedNetsService,
    TaskEventNotification,
    TaskEvent,
    NAE_DEFAULT_HEADERS
} from "@netgrif/components-core";
import {InjectedTabbedBuilderViewData} from "../../injected-builder-data";
import {BuilderIntegrationService} from "../../services/builder-integration.service";

const baseFilterFactory = (injectedData: InjectedTabbedBuilderViewData) => {
    const caseId = injectedData?.processCase?.stringId ?? "__EMPTY__"
    return {filter: SimpleFilter.fromTaskQuery({case: {id: caseId}, transitionId: ['deploy', 't10', 't11', 't4', 't6', 't9', 'view']})};
};

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromArray(['process']);
};

@Component({
    selector: 'nc-builder-task-mode',
    standalone: true,
    imports: [
        FlexModule,
        HeaderComponentModule,
        PanelComponentModule,
        SearchComponentModule
    ],
    templateUrl: './task-mode.component.html',
    styleUrl: './task-mode.component.scss',
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ViewIdService,
        ChangedFieldsService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {provide: NAE_DEFAULT_HEADERS, useValue: ['meta-title', 'meta-user', 'meta-assign-date']}
    ]
})
export class TaskModeComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService,
                protected _builderIntegrationService: BuilderIntegrationService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    onTaskEvent(event: TaskEventNotification) {
        if (event.event === TaskEvent.FINISH && event.success) {
            this._builderIntegrationService.reloadCase = true;
        }
    }
}
