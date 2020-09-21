import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractNavigationTreeComponent, ConfigurationService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent extends AbstractNavigationTreeComponent {

    constructor(protected _config: ConfigurationService, protected _router: Router) {
        super(_config, _router);
    }
}
