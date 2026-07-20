import {ChangeDetectorRef, Component} from '@angular/core';
import {EditModeService} from '../edit-mode.service';
import {MenuItem} from './menu-items/menu-item';

@Component({
    selector: 'nc-builder-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {

    private _menuItems: Array<MenuItem>;

    constructor(private _editModeService: EditModeService,
                private _cdr: ChangeDetectorRef) {
    }

    get menuItems(): Array<MenuItem> {
        return this._menuItems;
    }

    set menuItems(value: Array<MenuItem>) {
        this._menuItems = value;
        this._cdr.detectChanges();
    }

    itemClick(item: MenuItem) {
        item.onClick();
        this._editModeService.contextMenuItems.next(undefined);
    }
}
