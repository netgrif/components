import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskViewComponent,
    TaskEventNotification,
    TaskViewService,
    CaseResourceService,
    SearchService,
    ProcessService,
    TaskResourceService,
    AllowedNetsService,
    PublicTaskLoadingService,
    AllowedNetsServiceFactory,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    NAE_BASE_FILTER,
    ChangedFieldsService,
    PublicViewFactory
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
    const array = [];
    if (route.snapshot.paramMap.get('petriNetId') !== null) {
        array.push(route.snapshot.paramMap.get('petriNetId'));
    }
    return factory.createFromArray(array);
};

const processServiceFactory = (publicViewFactory: PublicViewFactory) => {
    return publicViewFactory.resolveProcessService();
};

const taskResourceServiceFactory = (publicViewFactory: PublicViewFactory) => {
    return publicViewFactory.resolveTaskResource();
};

const caseResourceServiceFactory = (publicViewFactory: PublicViewFactory) => {
    return publicViewFactory.resolveCaseResource();
};

const baseFilterFactory = (publicViewFactory: PublicViewFactory, route: ActivatedRoute) => {
    return publicViewFactory.baseFilter(route);
}

@Component({
    selector: 'nae-app-public-task-view',
    templateUrl: './public-task-view.component.html',
    styleUrls: ['./public-task-view.component.scss'],
    providers: [
        TaskViewService,
        PublicTaskLoadingService,
        SearchService,
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
        {   provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicView'},
        {   provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
        ViewIdService,
    ]
})
export class PublicTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, publicTaskLoadingService: PublicTaskLoadingService,
                activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
        this.loading$ = combineLatest(taskViewService.loading$, publicTaskLoadingService.loading$).pipe(
            map(sources => {
                return sources[0] || sources[1];
            })
        );
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }
}
