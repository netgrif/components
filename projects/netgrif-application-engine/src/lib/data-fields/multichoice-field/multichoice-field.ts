import {DataField} from "../abstract-data-field";

export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField  extends DataField<Array<string>>{

    constructor(title: string, placeholder: string, values: Array<string>, private _choices: Array<string>, private _view = MultichoiceFieldView.DEFAULT) {
        super(title, placeholder, values);
    }

    get choices(): Array<string> {
        return this._choices;
    }

    get view(): MultichoiceFieldView {
        return this._view;
    }
}
