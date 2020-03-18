import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export enum ButtonFieldView {
    STANDARD = 'standard',
    RAISED = 'raised',
    STROKED = 'stroked',
    FLAT = 'flat',
    ICON = 'icon',
    FAB = 'fab',
    MINIFAB = 'minifab'
 }

export class ButtonField extends DataField<number> {

    constructor(stringId: string, title: string, behavior: Behavior, value?: number,
                placeholder?: string, description?: string, private _view = ButtonFieldView.STANDARD) {
        super(stringId, title, behavior, placeholder, description, (value === undefined) ? 0 : value);
    }

    get view(): ButtonFieldView {
        return this._view;
    }
}
