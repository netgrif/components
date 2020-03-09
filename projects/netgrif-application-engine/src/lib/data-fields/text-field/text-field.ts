import {DataField} from "../abstract-data-field";

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea'
}

export class TextField extends DataField<string> {

    constructor(title: string, placeholder: string, value: string, public validations: any, public label: string, private _view = TextFieldView.DEFAULT) {
        super(title, placeholder, value);
    }

    get view(): TextFieldView {
        return this._view;
    }
}
