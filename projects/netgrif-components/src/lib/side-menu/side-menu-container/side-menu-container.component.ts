import {Component} from '@angular/core';
import {AbstractSideMenuContainerComponent, SideMenuService} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-side-menu-container',
    templateUrl: './side-menu-container.component.html',
    styleUrls: ['./side-menu-container.component.scss']
})
export class SideMenuContainerComponent extends AbstractSideMenuContainerComponent {

    public constructor(protected _sideMenuService: SideMenuService) {
        super(_sideMenuService);
    }
}
