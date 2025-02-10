import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
    AbstractTabbedSingleTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    ChangedFieldsService,
    FinishTaskService,
    NAE_BASE_FILTER,
    NAE_TAB_DATA,
    NAE_TASK_OPERATIONS,
    NAE_VIEW_ID_SEGMENT,
    FrontActionService,
    RedirectService,
    SearchService,
    SubjectTaskOperations,
    TaskDataService,
    TaskEventService,
    TaskRequestStateService,
    TaskViewService,
    ViewIdService,
} from 'netgrif-components-core';
import {AsyncPipe} from "@angular/common";
import {
    InjectedTabbedTaskViewDataWithNavigationItemTaskData
} from "../../model/injected-tabbed-task-view-data-with-navigation-item-task-data";

function baseFilterFactory(injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData) {
    return {
        filter: injectedTabData.baseFilter
    };
}

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

@Component({
    selector: 'nc-default-tabbed-single-task-view',
    templateUrl: './default-tabbed-single-task-view.component.html',
    styleUrls: ['./default-tabbed-single-task-view.component.scss'],
    providers: [
        TaskViewService,
        SearchService,
        RedirectService,
        ChangedFieldsService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicTaskView'},
        {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        ViewIdService,
        TaskDataService,
        FrontActionService,
        FinishTaskService,
        TaskRequestStateService,
        TaskEventService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
        AsyncPipe
    ]
})
export class DefaultTabbedSingleTaskViewComponent extends AbstractTabbedSingleTaskViewComponent implements OnInit {

    hidePanelHeader = true;
    hideActionRow = false;
    showPageHeader: boolean = true;
    showPageFooter: boolean = false;
    actionRowJustifyContent: "center" = "center";
    showFinishButton: boolean = true;
    showCloseButton: boolean = true;

    constructor(taskViewService: TaskViewService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData,
                activatedRoute: ActivatedRoute,
                protected _router: Router) {
        super(taskViewService, injectedTabData, activatedRoute);
    }

    ngOnInit(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    closeTab() {
        this._injectedTabData.tabViewRef.closeTabIndex(this._injectedTabData.tabViewRef.currentlySelectedTab());
    }

    public getFinishTitle(): string {
        return (this.finishTitle === '' || this.finishTitle) ? this.finishTitle : 'tasks.view.finish';
    }
}
