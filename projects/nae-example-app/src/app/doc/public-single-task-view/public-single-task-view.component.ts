import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
    AbstractSingleTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilterFactoryProvider,
    CaseResourceServiceProvider,
    ChangedFieldsService,
    FinishTaskService,
    NAE_TASK_OPERATIONS,
    NAE_VIEW_ID_SEGMENT,
    ProcessServiceProvider,
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
    TaskResourceServiceProvider,
    TaskViewService,
    ViewIdService,
    UserService,
    BaseFilter
} from '@netgrif/components-core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {HeaderComponent} from '@netgrif/components';
import {AsyncPipe} from "@angular/common";

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
    const array = [];
    if (route.snapshot.paramMap.get('petriNetId') !== null) {
        array.push(route.snapshot.paramMap.get('petriNetId'));
    }
    return factory.createFromArray(array);
};

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
export class PublicSingleTaskViewComponent extends AbstractSingleTaskViewComponent implements OnInit, AfterViewInit {

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
        this.noTaskPresent.subscribe(() => this._router.navigate(['process', btoa('nae_1823')]))
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }

    newCase() {
        this._router.navigate(['process', btoa('nae_1823')])
    }

}
