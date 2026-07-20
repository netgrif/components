import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommandAction} from '../../classes/command-action';

@Component({
    selector: 'nc-builder-action-editor-menu-description',
    templateUrl: './action-editor-menu-description.component.html',
    styleUrls: ['./action-editor-menu-description.component.scss']
})
export class ActionEditorMenuDescriptionComponent {

    descriptionVisible: boolean;

    action: CommandAction;
    @ViewChild('descriptionCard') description: ElementRef;

    constructor() {
    }

    setAction(action: CommandAction): void {
        this.action = action;
    }

    closeDescription(): void {
        this.descriptionVisible = false;
    }

    openDescriptionWithText(action: CommandAction): void {
        this.action = action;
        this.descriptionVisible = true;
    }

}
