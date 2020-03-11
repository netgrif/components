import {DataField} from "../models/abstract-data-field";
import {Behaviour} from '../models/behaviour';

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea'
}

export class TextField extends DataField<string> {

    constructor(title: string, placeholder: string, value: string, behaviour: Behaviour, public validations: any, public label: string, private _view = TextFieldView.DEFAULT) {
        super(title, placeholder, value, behaviour);
    }

    get view(): TextFieldView {
        return this._view;
    }
}
