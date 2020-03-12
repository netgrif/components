import {DataField} from "../../models/abstract-data-field";
import {Behaviour} from '../../models/behaviour';

export class NumberField extends DataField<number>{

    constructor(title: string, placeholder: string, value: number, behaviour: Behaviour, private _label?: string) {
        super(title, placeholder, value, behaviour);
    }

    get label(): string {
        return this._label;
    }
}
