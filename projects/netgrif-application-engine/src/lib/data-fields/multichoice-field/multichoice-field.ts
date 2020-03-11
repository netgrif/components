import {DataField} from "../models/abstract-data-field";
import {Behaviour} from '../models/behaviour';

export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField  extends DataField<Array<string>>{

    constructor(title: string, placeholder: string, values: Array<string>, behaviour: Behaviour, private _choices: Array<string>, private _view = MultichoiceFieldView.DEFAULT) {
        super(title, placeholder, values, behaviour);
    }

    get choices(): Array<string> {
        return this._choices;
    }

    get view(): MultichoiceFieldView {
        return this._view;
    }
}
