import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl} from '@angular/forms';

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea'
}

export class TextField extends DataField<string> {

    constructor(stringId: string, title: string, value: string, behavior: Behavior,
                placeholder?: string, description?: string, public validations?: any,
                public materialAppearance = 'standard', private _view = TextFieldView.DEFAULT) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get view(): TextFieldView {
        return this._view;
    }

    public resolve(formControl: FormControl): void {
        formControl.setValue(this.value);
        // this.behavior?.editable ?
    }

    public applyChange(change: {[key: string]: any}): void {

    }
}
