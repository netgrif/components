# Public view

Public view is breaking change in NAE v5.0.0. It provides anonymous access to view, that are marked as public with no
authorization needed, users can access tasks and cases without any login or registration needed. Public view can be
implemented in case of workflow-view and task-view.

## Frontend

In this manual we will define a public task view. This public task view can be accessed with
`<url>/process/:petriNetId/:caseId`. This route is set to navigate to our task view, that will send a request to
backend, search for case with defined route parameters petriNetId and caseId. Backend then returns tasks of this case
and our task view will list them. Follow these steps to implement such a public task or case view:

- Create a component with any name you want. We will now use PublicTaskViewComponent.
- In the config JSON (where you define views parameters) you can define a new view as follows:
    - the access attribute should be public
    - under component, you have to define the class and path of your component.

```json
{
  "demo-public-view": {
    "layout": {
      "name": "publicTaskView",
      "params": {
        "allowedNets": []
      }
    },
    "component": {
      "class": "PublicTaskViewComponent",
      "from": "./doc/public-task-view/public-task-view.component"
    },
    "access": "public",
    "navigation": false,
    "routing": {
      "path": "process/:petriNetId/:caseId"
    }
  }
}
```

- In our component class, we have to define public services, resolvers and abstract components to be used instead of
  default ones, and then we have to provide them to this component:

```ts
const localTaskViewServiceFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('demo-public-view');
};

const searchServiceFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                              caseResourceService: CaseResourceService, snackBarService: SnackBarService) => {
    return publicSearchServiceFactory(router, route, process, caseResourceService, snackBarService);
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
            deps: [Router, ActivatedRoute, ProcessService, CaseResourceService, SnackBarService]
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
```

That's all for frontend.

## Direct redirect to task

If you want to generate an URL, that redirects to task that has no header 
(only has task data and task event buttons), you can use direct redirect functionality
of public view.

It is quiet simple, you just have to construct the right URL, which must have the following form:
``https://<app_address>/process/<process_identifier>/<case_id>/<transition_id>``

For example:
``https://demo.netgrif.com/process/all_data/6290bb764f280603dd861d25/1``
where:
- <app_address> - demo.netgrif.com
- <process_identifier> - all_data
- <case_id> - 6290bb764f280603dd861d25
- <transition_id> - 1
