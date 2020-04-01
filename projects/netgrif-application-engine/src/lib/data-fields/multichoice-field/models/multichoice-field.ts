import {DataField, Layout, MaterialAppearance} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export interface MultichoiceFieldValue {
    key: string;
    value: string;
}

export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField  extends DataField<Array<string>> {

    constructor(stringId: string, title: string, values: Array<string>, private _choices: Array<MultichoiceFieldValue>,
                behavior: Behavior, placeholder?: string, description?: string, layout?: Layout,
                public materialAppearance = MaterialAppearance.STANDARD, private _view = MultichoiceFieldView.DEFAULT) {
        super(stringId, title, values, behavior, placeholder, description, layout);
    }

    get choices(): Array<MultichoiceFieldValue> {
        return this._choices;
    }

    get view(): MultichoiceFieldView {
        return this._view;
    }

    protected valueEquality(a: Array<string>, b: Array<string>): boolean {
        // we assume that multichoice options are always given in the same order
        return (!a && !b) || (
            !!a
            && !!b
            && a.length === b.length
            && a.every( (element, index) => element === b[index])
        );
    }
}
