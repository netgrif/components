import {AfterViewChecked, Component, Input, ViewChild} from '@angular/core';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {ActionItemProviderService} from '../../action-item-provider.service';
import {MenuItem} from './menu-item';
import {MenuItemConfiguration} from './menu-item-configuration';

@Component({
    selector: 'nc-builder-action-editor-menu-item',
    templateUrl: './action-editor-menu-item.component.html',
    styleUrls: ['./action-editor-menu-item.component.scss'],
    exportAs: 'menuInOtherComponent'
})
export class ActionEditorMenuItemComponent implements AfterViewChecked {

    @Input() configuration: MenuItemConfiguration;

    @Input() parentTrigger: MatMenuTrigger;
    @Input() trigger: MatMenuTrigger;

    @ViewChild(MatMenu, {static: true}) menu: MatMenu;

    constructor(private actionItemProviderService: ActionItemProviderService) {
    }

    ngAfterViewChecked(): void {
        this.configuration.editor?.onMouseDown((ignored) => {
            this.actionItemProviderService.actionsKeywordsListen(
                this.configuration.editor,
                this.configuration.actionEditor,
                this.trigger,
                this.configuration.keywords
            );
        });
    }

    get items(): Array<MenuItem> {
        return this.configuration.items;
    }

    addTextToEditor(text: string): void {
        this.actionItemProviderService.insertText(this.configuration.editor, text, this.configuration.itemType);
    }
}
