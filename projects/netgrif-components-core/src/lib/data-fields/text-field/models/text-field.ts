import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea',
    RICHTEXTAREA = 'richtextarea',
    HTMLTEXTAREA = 'htmltextarea'
}

/**
 * A collection of Text field component names supported by the application engine.
 */
export enum TextFieldComponent {
    PASSWORD = 'password',
    TEXT_AREA = 'text_area',
    RICH_TEXT_AREA = 'richtextarea',
    HTML_TEXT_AREA = 'htmltextarea',
    DASHBOARD_LINE_CHART = 'dashboard_line_chart',
}

export enum TextAreaHeight {
    OUTLINE = 27,
    FILL_STANDARD = 34
}

export enum TextFieldValidation {
    REQUIRED = 'required',
    MIN_LENGTH = 'minLength',
    MAX_LENGTH = 'maxLength',
    VALID_MIN_LENGTH = 'minlength',
    VALID_MAX_LENGTH = 'maxlength',
    PATTERN = 'pattern',
    REGEX = 'regex',
    VALID_TEL_NUMBER = 'validTelNumber',
    TEL_NUMBER = 'telNumber',
    EMAIL = 'email'
}

export class TextField extends DataField<string> {
    public static FIELD_HEIGHT = 105;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, protected _view = TextFieldView.DEFAULT,
                _component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component, parentTaskId);
    }

    /*@deprecated in 4.3.0*/
    get view(): TextFieldView {
        return this._view;
    }

    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes(TextFieldValidation.MIN_LENGTH)) {
                const tmp = item.validationRule.split(' ');
                if (tmp[1] !== undefined) {
                    const length = parseInt(tmp[1], 10);
                    if (!isNaN(length)) {
                        result.push(Validators.minLength(length));
                    }
                }
            } else if (item.validationRule.includes(TextFieldValidation.MAX_LENGTH)) {
                const tmp = item.validationRule.split(' ');
                if (tmp[1] !== undefined) {
                    const length = parseInt(tmp[1], 10);
                    if (!isNaN(length)) {
                        result.push(Validators.maxLength(length));
                    }
                }
            } else if (item.validationRule.includes(TextFieldValidation.REGEX)) {
                if (item.validationRule.startsWith('regex ')) {
                    result.push(Validators.pattern(new RegExp(item.validationRule.substring(6, item.validationRule.length ))));
                } else if (item.validationRule.startsWith('regex("')) {
                    result.push(Validators.pattern(new RegExp(item.validationRule.substring(7, item.validationRule.length - 2))));
                }
            } else if (item.validationRule.includes(TextFieldValidation.EMAIL)) {
                result.push(Validators.email);
            } else if (item.validationRule.includes(TextFieldValidation.TEL_NUMBER)) {
                result.push(this.validTelNumber);
            }
        });

        return result;
    }

    private validTelNumber(fc: FormControl) {
        if (!(new RegExp(/^(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)$/).test(fc.value))) {
            return ({validTelNumber: true});
        } else {
            return (null);
        }
    }
}
