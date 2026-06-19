import {ControlPanelIcon} from './control-panel-icon';

export class ControlPanelButton {

    private _icon: ControlPanelIcon;
    private _tooltip: string;
    private _onClick: () => void;

    constructor(icon: ControlPanelIcon, tooltip: string, onClick = () => {}) {
        this._icon = icon;
        this._tooltip = tooltip;
        this._onClick = onClick;
    }

    get icon(): ControlPanelIcon {
        return this._icon;
    }

    set icon(value: ControlPanelIcon) {
        this._icon = value;
    }

    get tooltip(): string {
        return this._tooltip;
    }

    set tooltip(value: string) {
        this._tooltip = value;
    }

    get onClick(): () => void {
        return this._onClick;
    }

    set onClick(value: () => void) {
        this._onClick = value;
    }
}
