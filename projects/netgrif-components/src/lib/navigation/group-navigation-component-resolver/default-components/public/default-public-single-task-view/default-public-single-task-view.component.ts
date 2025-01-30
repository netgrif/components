import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {
    TaskViewService,
    PublicTaskLoadingService,
    SearchService,
    RedirectService,
    ChangedFieldsService,
    ProcessServiceProvider,
    TaskResourceServiceProvider,
    CaseResourceServiceProvider,
    BaseFilterFactoryProvider,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    TaskContentService,
    SingleTaskContentService,
    TaskDataService,
    FinishTaskService,
    TaskRequestStateService,
    TaskEventService,
    NAE_TASK_OPERATIONS,
    SubjectTaskOperations,
    AbstractSingleTaskViewComponent,
    NAE_BASE_FILTER,
    BaseFilter,
} from '@netgrif/components-core';
import {HeaderComponent} from "../../../../../header/header.component";

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
    const array = [];
    if (route.snapshot.paramMap.get('petriNetId') !== null) {
        array.push(route.snapshot.paramMap.get('petriNetId'));
    }
    return factory.createFromArray(array);
};

@Component({
    selector: 'nc-default-public-single-task-view',
    templateUrl: './default-public-single-task-view.component.html',
    styleUrls: ['./default-public-single-task-view.component.scss'],
    providers: [
        TaskViewService,
        PublicTaskLoadingService,
        SearchService,
        RedirectService,
        ChangedFieldsService,
        ProcessServiceProvider,
        TaskResourceServiceProvider,
        CaseResourceServiceProvider,
        BaseFilterFactoryProvider,
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
        AsyncPipe
    ]
})
export class DefaultPublicSingleTaskViewComponent extends AbstractSingleTaskViewComponent implements OnInit, AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    hidden: boolean;

    constructor(taskViewService: TaskViewService,
                publicTaskLoadingService: PublicTaskLoadingService,
                activatedRoute: ActivatedRoute,
                protected _router: Router,
                @Inject(NAE_BASE_FILTER) baseFilter: BaseFilter) {
        super(taskViewService, activatedRoute, baseFilter);
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
}
