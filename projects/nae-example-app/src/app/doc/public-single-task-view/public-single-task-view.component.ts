import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
    AbstractSingleTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CaseResourceService,
    ChangedFieldsService,
    FinishTaskService,
    NAE_BASE_FILTER,
    NAE_TASK_OPERATIONS,
    NAE_VIEW_ID_SEGMENT,
    ProcessService,
    PublicTaskLoadingService,
    RedirectService,
    SearchService,
    SingleTaskContentService,
    SubjectTaskOperations,
    TaskContentService,
    TaskDataService,
    TaskEventNotification,
    TaskEventService,
    TaskRequestStateService,
    TaskResourceService,
    TaskViewService,
    ViewIdService,
    PublicViewFactory
} from '@netgrif/components-core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {HeaderComponent} from '@netgrif/components';

const taskResourceServiceFactory = (publicViewFactory: PublicViewFactory) => {
    return publicViewFactory.resolveTaskResource();
};

const processServiceFactory = (publicViewFactory: PublicViewFactory) => {
    return publicViewFactory.resolveProcessService();
};

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
    const array = [];
    if (route.snapshot.paramMap.get('petriNetId') !== null) {
        array.push(route.snapshot.paramMap.get('petriNetId'));
    }
    return factory.createFromArray(array);
};

const caseResourceServiceFactory = (publicViewFactory: PublicViewFactory) => {
    return publicViewFactory.resolveCaseResource();
};

const baseFilterFactory = (publicViewFactory: PublicViewFactory, route: ActivatedRoute) => {
    return publicViewFactory.baseFilter(route);
}

@Component({
    selector: 'nae-app-public-single-task-view',
    templateUrl: './public-single-task-view.component.html',
    styleUrls: ['./public-single-task-view.component.scss'],
    providers: [
        TaskViewService,
        PublicTaskLoadingService,
        SearchService,
        RedirectService,
        ChangedFieldsService,
        {
            provide: ProcessService,
            useFactory: processServiceFactory,
            deps: [PublicViewFactory]
        },
        {
            provide: TaskResourceService,
            useFactory: taskResourceServiceFactory,
            deps: [PublicViewFactory]
        },
        {
            provide: CaseResourceService,
            useFactory: caseResourceServiceFactory,
            deps: [PublicViewFactory]
        },
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [PublicViewFactory, ActivatedRoute]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, ActivatedRoute]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicTaskView'},
        {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
        ViewIdService,
        {provide: TaskContentService, useClass: SingleTaskContentService},
        TaskDataService,
        FinishTaskService,
        TaskRequestStateService,
        TaskEventService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
        {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
    ]
})
export class PublicSingleTaskViewComponent extends AbstractSingleTaskViewComponent implements OnInit, AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    hidden: boolean;

    constructor(taskViewService: TaskViewService, publicTaskLoadingService: PublicTaskLoadingService,
                activatedRoute: ActivatedRoute, protected _router: Router) {
        super(taskViewService, activatedRoute);
        this.hidden = false;
        this.loading$ = combineLatest(taskViewService.loading$, publicTaskLoadingService.loading$).pipe(
            map(sources => {
                return sources[0] || sources[1];
            })
        );
    }

    ngOnInit(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }
}
