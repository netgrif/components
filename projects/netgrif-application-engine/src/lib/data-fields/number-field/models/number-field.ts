import {DataField} from "../../models/abstract-data-field";
import {Behavior} from '../../models/behavior';

export class NumberField extends DataField<number>{

    constructor(title: string, placeholder: string, value: number, behaviour: Behavior, private _label?: string) {
        super(title, placeholder, value, behaviour);
    }

    get label(): string {
        return this._label;
    }
}
