import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {Injector} from "@angular/core";
import {Validator} from "../../../validation/model/validator";

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
    TEXT_AREA = 'textarea',
    RICH_TEXT_AREA = 'richtextarea',
    HTML_TEXT_AREA = 'htmltextarea',
    DASHBOARD_LINE_CHART = 'dashboard_line_chart',
    DASHBOARD_PIE_CHART = 'dashboard_pie_chart',
    DASHBOARD_BAR_CHART = 'dashboard_bar_chart',
    DASHBOARD_IFRAME = 'dashboard_iframe',
    DASHBOARD_PORTAL = 'dashboard_portal',
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
                description?: string, layout?: Layout, validations?: Array<Validation>, _component?: Component,
                parentTaskId?: string, protected validatorRegister?: Map<string, Validator>) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component, parentTaskId,
            undefined, validatorRegister);
    }

    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (this.validatorRegister?.has(item.name)) {
                const vl: Validator = this.validatorRegister.get(item.name);
                const mustContainString = vl.attributeNames.map(atr => item.arguments[atr].value)
                result.push(vl.fn(...mustContainString));
            } else if (item.name === TextFieldValidation.MIN_LENGTH) {
                if (!!item.arguments?.min?.value) {
                    const length = parseInt(item.arguments.min.value, 10);
                    if (!isNaN(length)) {
                        result.push(Validators.minLength(length));
                    }
                }
            } else if (item.name === TextFieldValidation.MAX_LENGTH) {
                if (!!item.arguments?.max?.value) {
                    const length = parseInt(item.arguments.max.value, 10);
                    if (!isNaN(length)) {
                        result.push(Validators.maxLength(length));
                    }
                }
            } else if (item.name === TextFieldValidation.REGEX) {
                if (!!item.arguments?.expression?.value) {
                    result.push(Validators.pattern(new RegExp(item.arguments.expression.value)));
                }
            } else if (item.name === TextFieldValidation.EMAIL) {
                result.push(Validators.email);
            } else if (item.name === TextFieldValidation.TEL_NUMBER) {
                result.push(this.validTelNumber);
            }
        });

        return result;
    }

    private validTelNumber(fc: FormControl) {
        if (!(new RegExp(/^(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)$/).test(fc.value))) {
            return ({validTelNumber: true});
        } else {
            return null;
        }
    }
}
