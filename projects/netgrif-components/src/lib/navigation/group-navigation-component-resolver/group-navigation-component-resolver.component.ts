import {Component, Injector} from '@angular/core';
import {AbstractGroupNavigationComponentResolverComponent, GroupNavigationComponentResolverService} from '@netgrif/application-engine';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nc-group-navigation-component-resolver',
    templateUrl: './group-navigation-component-resolver.component.html',
    styleUrls: ['./group-navigation-component-resolver.component.scss']
})
export class GroupNavigationComponentResolverComponent extends AbstractGroupNavigationComponentResolverComponent {

    constructor(componentResolverService: GroupNavigationComponentResolverService,
                parentInjector: Injector,
                activatedRoute: ActivatedRoute) {
        super(componentResolverService, parentInjector, activatedRoute);
    }

}
