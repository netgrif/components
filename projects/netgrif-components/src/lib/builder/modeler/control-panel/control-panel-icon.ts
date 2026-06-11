export class ControlPanelIcon {
    private _name: string;
    private _isSvg: boolean;
    private _isOutlined: boolean;

    constructor(name: string, svgIcon = false, isOutlined = false) {
        this._name = name;
        this._isSvg = svgIcon;
        this._isOutlined = isOutlined;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get isSvg(): boolean {
        return this._isSvg;
    }

    set isSvg(value: boolean) {
        this._isSvg = value;
    }

    get isOutlined(): boolean {
        return this._isOutlined;
    }

    set isOutlined(value: boolean) {
        this._isOutlined = value;
    }
}
