import {DataField} from "../abstract-data-field/abstract-data-field";

export class TextField extends DataField{

    constructor(public title: string, public placeholder: string, public label: string) {
        super();
    }

}
