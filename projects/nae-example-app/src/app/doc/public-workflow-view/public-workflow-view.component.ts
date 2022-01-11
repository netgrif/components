import {Component} from '@angular/core';
import {
    AbstractWorkflowViewComponent,
    SideMenuService,
    WorkflowViewService,
    LoggerService,
    ProcessService,
    PublicProcessService,
    PublicPetriNetResourceService,
    PetriNetResourceService,
    Net,
    UserService,
    SessionService,
    AuthenticationService,
    ResourceProvider,
    ConfigurationService,
    PublicUrlResolverService,
    publicFactoryResolver
} from '@netgrif/application-engine';
import {ActivatedRoute, Router} from '@angular/router';

const processServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                               router: Router, publicResolverService: PublicUrlResolverService, petriNetResource: PetriNetResourceService,
                               publicPetriNetResource: PublicPetriNetResourceService, loggerService: LoggerService) => {
    return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
        new ProcessService(petriNetResource, loggerService),
        new PublicProcessService(publicPetriNetResource, loggerService));
};

const petriNetResourceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                 router: Router, publicResolverService: PublicUrlResolverService, provider: ResourceProvider,
                                 config: ConfigurationService) => {
    return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
        new PetriNetResourceService(provider, config),
        new PublicPetriNetResourceService(provider, config));
};

@Component({
    selector: 'nae-app-public-workflow-view',
    templateUrl: './public-workflow-view.component.html',
    styleUrls: ['./public-workflow-view.component.scss'],
    providers: [
        WorkflowViewService,
        {
            provide: ProcessService,
            useFactory: processServiceFactory,
            deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService, PetriNetResourceService,
                PublicPetriNetResourceService, LoggerService]
        },
        {
            provide: PetriNetResourceService,
            useFactory: petriNetResourceFactory,
            deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService,
                ResourceProvider, ConfigurationService]
        },
    ]
})
export class PublicWorkflowViewComponent extends AbstractWorkflowViewComponent {
    constructor(protected _sideMenuService: SideMenuService,
                protected _workflowViewService: WorkflowViewService,
                protected _log: LoggerService,
                protected _processService: ProcessService,
                protected _router: Router,
                protected _route: ActivatedRoute) {
        super(_sideMenuService, _workflowViewService, _log, _processService);
    }

    handleClick(workflow: Net) {
        this._router.navigate([this._route.snapshot.url.join('/') + '/' + workflow.identifier]);
    }
}
