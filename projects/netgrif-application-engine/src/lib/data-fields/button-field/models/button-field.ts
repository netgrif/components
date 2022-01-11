import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';

/*@deprecated in 4.3.0*/
export enum ButtonFieldView {
    STANDARD = 'standard',
    RAISED = 'raised',
    STROKED = 'stroked',
    FLAT = 'flat',
    ICON = 'icon',
    FAB = 'fab',
    MINIFAB = 'minifab'
 }

export enum ButtonFieldValidation {
    REQUIRED = 'required'
}

export class ButtonField extends DataField<number> {

    constructor(stringId: string, title: string, behavior: Behavior, value?: number, placeholder?: string,
                description?: string, layout?: Layout, private _view = ButtonFieldView.STANDARD,
                validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, (value === undefined) ? 0 : value, behavior, placeholder, description,
            layout, validations, component, parentTaskId);
    }

    /*@deprecated in 4.3.0*/
    get view(): ButtonFieldView {
        return this._view;
    }
}
