import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {TextField, TextFieldView} from './text-field';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Component} from '../../models/component';

export class TextAreaField extends TextField {
    private SEARCH_DEBOUNCE_TIME = 600;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, null, component, parentTaskId);
    }

    public valueChanges(): Observable<string> {
        return this._value.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME));
    }
}
