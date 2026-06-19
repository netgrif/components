import {Type} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TutorialStep} from '../../../tutorial/tutorial-step';
import {Identifiable} from '../../edit-mode/domain/identifiable';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';

export abstract class Tool extends Identifiable {

    private _button: ControlPanelButton;
    private _component: Type<any>;
    private _tutorialStep: TutorialStep;
    private readonly _disabled: BehaviorSubject<boolean>;

    protected constructor(id: string, button: ControlPanelButton, component: Type<any>, tutorialStep?: TutorialStep) {
        super(id);
        this._button = button;
        this._component = component;
        this._button.onClick = this.onClick.bind(this);
        this._disabled = new BehaviorSubject<boolean>(false);
        this._tutorialStep = tutorialStep;
    }

    public onClick(): void {
    }

    get button(): ControlPanelButton {
        return this._button;
    }

    set button(value: ControlPanelButton) {
        this._button = value;
    }

    get component(): Type<any> {
        return this._component;
    }

    set component(value: Type<any>) {
        this._component = value;
    }

    get tutorialStep(): TutorialStep {
        return this._tutorialStep;
    }

    set tutorialStep(value: TutorialStep) {
        this._tutorialStep = value;
    }

    get tooltip(): string {
        return this._button.tooltip;
    }

    set tooltip(value: string) {
        this._button.tooltip = value;
    }

    get icon(): ControlPanelIcon {
        return this._button.icon;
    }

    set icon(value: ControlPanelIcon) {
        this._button.icon = value;
    }

    get disabled(): BehaviorSubject<boolean> {
        return this._disabled;
    }
}
