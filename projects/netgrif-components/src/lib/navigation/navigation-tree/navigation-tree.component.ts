import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {
    AbstractNavigationTreeComponent, AccessService,
    ActiveGroupService,
    ConfigurationService,
    DynamicNavigationRouteProviderService,
    LanguageService,
    LoggerService,
    TaskResourceService,
    UserService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent extends AbstractNavigationTreeComponent {

    constructor(config: ConfigurationService,
                router: Router,
                log: LoggerService,
                userService: UserService,
                accessService: AccessService,
                activeGroupService: ActiveGroupService,
                taskResourceService: TaskResourceService,
                languageService: LanguageService,
                navigationRouteProvider: DynamicNavigationRouteProviderService) {
        super(
            config,
            router,
            log,
            userService,
            accessService,
            activeGroupService,
            taskResourceService,
            languageService,
            navigationRouteProvider
        );
    }
}
