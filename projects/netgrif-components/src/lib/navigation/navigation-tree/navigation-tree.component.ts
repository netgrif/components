import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {
    AbstractNavigationTreeComponent, AuthorityGuardService,
    ConfigurationService,
    LoggerService,
    RoleGuardService,
    UserService,
    GroupGuardService,
    ActiveGroupService,
    TaskResourceService,
    LanguageService
} from '@netgrif/application-engine';

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
                roleGuard: RoleGuardService,
                authorityGuard: AuthorityGuardService,
                groupGuard: GroupGuardService,
                activeGroupService: ActiveGroupService,
                taskResourceService: TaskResourceService,
                languageService: LanguageService) {
        super(
            config,
            router,
            log,
            userService,
            roleGuard,
            authorityGuard,
            groupGuard,
            activeGroupService,
            taskResourceService,
            languageService
        );
    }
}
