import {Injector} from '@angular/core';
import {TutorialStep} from '../../../tutorial/tutorial-step';
import {Identifiable} from '../../edit-mode/domain/identifiable';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {ToolRegistry} from '../tools/tool-registry';

export class Mode extends Identifiable {

    private _button: ControlPanelButton;
    private _routerLink: string;
    private _url: string
    private _tutorialStep: TutorialStep;
    private readonly _tools: ToolRegistry;

    constructor(id: string, button: ControlPanelButton, routerLink: string, url: string, tutorialStep: TutorialStep, injector: Injector) {
        super(id);
        this._button = button;
        this._routerLink = routerLink;
        this._url = url;
        this._tutorialStep = tutorialStep;
        this._tools = new ToolRegistry(injector);
    }

    public activate(): void {
    }

    public deactivate(): void {
    }

    get tools(): ToolRegistry {
        return this._tools;
    }

    get icon(): ControlPanelIcon {
        return this._button.icon;
    }

    set icon(value: ControlPanelIcon) {
        this._button.icon = value;
    }

    get tooltip(): string {
        return this._button.tooltip;
    }

    set tooltip(value: string) {
        this._button.tooltip = value;
    }

    get routerLink(): string {
        return this._routerLink;
    }

    set routerLink(value: string) {
        this._routerLink = value;
    }

    get tutorialStep(): TutorialStep {
        return this._tutorialStep;
    }

    set tutorialStep(value: TutorialStep) {
        this._tutorialStep = value;
    }

    get onClick(): () => void {
        return this._button.onClick;
    }

    set onClick(value: () => void) {
        this._button.onClick = value;
    }

    get url(): string {
        return this._url;
    }
}
