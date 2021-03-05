import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    TaskEventNotification,
    TaskViewService,
    CaseResourceService,
    PublicCaseResourceService,
    PublicTaskResourceService,
    ConfigTaskViewServiceFactory,
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
    publicSearchServiceFactory,
    publicFactoryResolver
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

const localTaskViewServiceFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('demo-public-view');
};

const searchServiceFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                              caseResourceService: CaseResourceService, snackBarService: SnackBarService,
                              translate: TranslateService) => {
    return publicSearchServiceFactory(router, route, process, caseResourceService, snackBarService, translate);
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
    selector: 'nae-app-public-task-view',
    templateUrl: './public-task-view.component.html',
    styleUrls: ['./public-task-view.component.scss'],
    providers: [
        ConfigTaskViewServiceFactory,
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
            provide: SearchService,
            useFactory: searchServiceFactory,
            deps: [Router, ActivatedRoute, ProcessService, CaseResourceService, SnackBarService, TranslateService]
        },
        {
            provide: TaskViewService,
            useFactory: localTaskViewServiceFactory,
            deps: [ConfigTaskViewServiceFactory]
        },
    ]
})
export class PublicTaskViewComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }
}
