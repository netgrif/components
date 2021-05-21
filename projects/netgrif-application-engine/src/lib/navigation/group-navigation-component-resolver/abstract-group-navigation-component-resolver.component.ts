import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {Injector} from '@angular/core';

export abstract class AbstractGroupNavigationComponentResolverComponent {

    protected constructor(protected _componentResolverService: GroupNavigationComponentResolverService,
                          protected _parentInjector: Injector) {
    }
}
