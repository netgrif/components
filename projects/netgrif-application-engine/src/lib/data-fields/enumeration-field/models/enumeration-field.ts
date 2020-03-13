import {DataField} from '../../models/abstract-data-field';
import {Behaviour} from '../../models/behaviour';

export interface EnumerationFieldValue {
    key: string,
    value: string
}

export enum EnumerationFieldView {
    DEFAULT = 'default',
    LIST = 'list',
    AUTOCOMPLETE = 'autocomplete'
}

export class EnumerationField extends DataField<EnumerationFieldValue> {

    constructor(title: string, placeholder: string, value: EnumerationFieldValue, behaviour: Behaviour, private _label: string, private _choices: Array<EnumerationFieldValue>, private _view = EnumerationFieldView.DEFAULT) {
        super(title, placeholder, value, behaviour);
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    get view(): EnumerationFieldView {
        return this._view;
    }

    get label(): string {
        return this._label;
    }
}
