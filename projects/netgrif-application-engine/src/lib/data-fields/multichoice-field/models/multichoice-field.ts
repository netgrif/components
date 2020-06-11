import {AbstractDataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';

export interface MultichoiceFieldValue {
    key: string;
    value: string;
}

export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField  extends AbstractDataField<Array<string>> {
    public materialAppearance: string;

    constructor(stringId: string, title: string, values: Array<string>, private _choices: Array<MultichoiceFieldValue>,
                behavior: Behavior, placeholder?: string, description?: string, layout?: Layout,
                private _view = MultichoiceFieldView.DEFAULT) {
        super(stringId, title, values, behavior, placeholder, description, layout);
        if (layout) {
            this.materialAppearance = this.layout.appearance;
        } else {
            this.materialAppearance = 'legacy';
        }
    }

    set choices(choices: Array<MultichoiceFieldValue>) {
        this._choices = choices;
    }

    get choices(): Array<MultichoiceFieldValue> {
        return this._choices;
    }

    set view(view: MultichoiceFieldView) {
        this._view = view;
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
