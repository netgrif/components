import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
    TaskEventNotification,
    TaskViewService,
    CaseResourceService,
    PublicCaseResourceService,
    PublicTaskResourceService,
    SearchService,
    PublicProcessService,
    ProcessService,
    TaskResourceService,
    SnackBarService,
    UserService,
    SessionService,
    PetriNetResourceService,
    PublicPetriNetResourceService,
    LoggerService,
    ResourceProvider,
    ConfigurationService,
    FieldConverterService,
    AuthenticationService,
    PublicUrlResolverService,
    publicBaseFilterFactory,
    publicFactoryResolver,
    AllowedNetsService,
    PublicTaskLoadingService,
    AllowedNetsServiceFactory,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    NAE_BASE_FILTER,
    ChangedFieldsService,
    AbstractSingleTaskViewComponent,
    TaskContentService,
    TaskDataService,
    FinishTaskService,
    SingleTaskContentService,
    TaskRequestStateService,
    TaskEventService,
    NAE_TASK_OPERATIONS,
    SubjectTaskOperations,
    TaskEvent
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';
import { ActivatedRoute, Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
    const array = [];
    if (route.snapshot.paramMap.get('petriNetId') !== null) {
        array.push(route.snapshot.paramMap.get('petriNetId'));
    }
    return factory.createFromArray(array);
};

const processServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                               router: Router, publicResolverService: PublicUrlResolverService, petriNetResource: PetriNetResourceService,
                               publicPetriNetResource: PublicPetriNetResourceService, loggerService: LoggerService) => {
    return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
        new ProcessService(petriNetResource, loggerService),
        new PublicProcessService(publicPetriNetResource, loggerService));
};

const taskResourceServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                    router: Router, publicResolverService: PublicUrlResolverService,
                                    logger: LoggerService, provider: ResourceProvider, config: ConfigurationService,
                                    fieldConverter: FieldConverterService) => {
    return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
        new TaskResourceService(provider, config, fieldConverter, logger),
        new PublicTaskResourceService(provider, config, fieldConverter, logger));
};

const caseResourceServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                    router: Router, publicResolverService: PublicUrlResolverService,
                                    provider: ResourceProvider, config: ConfigurationService) => {
    return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
        new CaseResourceService(provider, config),
        new PublicCaseResourceService(provider, config));
};

@Component({
    selector: 'nae-app-public-single-task-view',
    templateUrl: './public-single-task-view.component.html',
    styleUrls: ['./public-single-task-view.component.scss'],
    providers: [
        TaskViewService,
        PublicTaskLoadingService,
        SearchService,
        ChangedFieldsService,
        {
            provide: ProcessService,
            useFactory: processServiceFactory,
            deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService, PetriNetResourceService,
                PublicPetriNetResourceService, LoggerService]
        },
        {
            provide: TaskResourceService,
            useFactory: taskResourceServiceFactory,
            deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService,
                LoggerService, ResourceProvider, ConfigurationService, FieldConverterService]
        },
        {
            provide: CaseResourceService,
            useFactory: caseResourceServiceFactory,
            deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService,
                ResourceProvider, ConfigurationService]
        },
        {
            provide: NAE_BASE_FILTER,
            useFactory: publicBaseFilterFactory,
            deps: [Router, ActivatedRoute, ProcessService, CaseResourceService, SnackBarService, TranslateService, PublicTaskLoadingService]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, ActivatedRoute]
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicView'},
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
        this.hidden = true;
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
        if (!!event && event.event === TaskEvent.FINISH) {
            const aCase = event.outcome.aCase;
            const formCaseIdentifier = aCase.immediateData.find((field) => field.stringId === 'new_case_id').value
            this._router.navigate(['process', 'data', formCaseIdentifier, 't1']);
        }
    }

}