import {Component} from '@angular/core';
import {EditModeService} from '../edit-mode.service';
import {MenuItem} from './menu-items/menu-item';

@Component({
    selector: 'nc-builder-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {

    public menuItems: Array<MenuItem>;

    constructor(
        private editModeService: EditModeService
    ) {
    }

    itemClick(item: MenuItem) {
        item.onClick();
        this.editModeService.contextMenuItems.next(undefined);
    }
}
