import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {TextField} from './text-field';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Component} from '../../models/component';
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";
import {Injector} from "@angular/core";

export class TextAreaField extends TextField {
    private SEARCH_DEBOUNCE_TIME = 600;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string, description?: string,
                layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string,
                validationRegistry?: ValidationRegistryService, injector?: Injector) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, validationRegistry, injector);
    }

    public valueChanges(): Observable<string> {
        return this._value.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME));
    }
}
