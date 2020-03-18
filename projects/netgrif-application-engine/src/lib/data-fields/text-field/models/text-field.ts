import {DataField, MaterialAppearance} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea'
}

export class TextField extends DataField<string> {

    constructor(stringId: string, title: string, value: string, behavior: Behavior,
                placeholder?: string, description?: string, public validations?: any,
                public materialAppearance = MaterialAppearance.STANDARD, private _view = TextFieldView.DEFAULT) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get view(): TextFieldView {
        return this._view;
    }
}
