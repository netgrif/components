import {DataField} from "../abstract-data-field";

export class FileField extends DataField<File> {

    constructor(title: string, placeholder: string, value: File) {
        super(title, placeholder, value);
    }
}
