import {Component, Injector} from '@angular/core';
import {AbstractGroupNavigationComponentResolverComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-group-navigation-component-resolver',
    templateUrl: './group-navigation-component-resolver.component.html',
    styleUrls: ['./group-navigation-component-resolver.component.scss']
})
export class GroupNavigationComponentResolverComponent extends AbstractGroupNavigationComponentResolverComponent {

    constructor(parentInjector: Injector) {
        super(null, parentInjector);
    }

}
