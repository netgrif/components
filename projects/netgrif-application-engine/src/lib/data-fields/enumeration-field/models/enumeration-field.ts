import {DataField, Layout} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export interface EnumerationFieldValue {
    key: string;
    value: string;
}

export enum EnumerationFieldView {
    DEFAULT = 'default',
    LIST = 'list',
    AUTOCOMPLETE = 'autocomplete'
}

export class EnumerationField extends DataField<string> {
    public materialAppearance: string;
    constructor(stringId: string, title: string, value: string,
                private _choices: Array<EnumerationFieldValue>, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, private _view = EnumerationFieldView.DEFAULT) {
        super(stringId, title, value, behavior, placeholder, description, layout);
        if (layout) {
            this.materialAppearance = this.layout.appearance;
        } else {
            this.materialAppearance = 'legacy';
        }
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    get view(): EnumerationFieldView {
        return this._view;
    }
}
