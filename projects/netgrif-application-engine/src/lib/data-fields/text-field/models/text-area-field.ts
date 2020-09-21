import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {TextField, TextFieldView} from './text-field';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export class TextAreaField extends TextField {
    private SEARCH_DEBOUNCE_TIME = 350;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, public validations?: Validation[], protected _view = TextFieldView.DEFAULT) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    public valueChanges(): Observable<string> {
        return this._value.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME));
    }
}
