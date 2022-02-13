import {Component, Injector} from '@angular/core';
import {
    AbstractGroupNavigationComponentResolverComponent,
    GroupNavigationComponentResolverService,
    LoggerService
} from '@netgrif/components-core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'nc-group-navigation-component-resolver',
    templateUrl: './group-navigation-component-resolver.component.html',
    styleUrls: ['./group-navigation-component-resolver.component.scss']
})
export class GroupNavigationComponentResolverComponent extends AbstractGroupNavigationComponentResolverComponent {

    constructor(componentResolverService: GroupNavigationComponentResolverService,
                parentInjector: Injector,
                activatedRoute: ActivatedRoute,
                router: Router,
                log: LoggerService) {
        super(componentResolverService, parentInjector, activatedRoute, router, log);
    }

}
