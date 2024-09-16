import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {Injector} from "@angular/core";
import {Validator} from "../../../registry/model/validator";

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
    OUTLINE = 20,
    FILL_STANDARD = 22
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
    public static FIELD_HEIGHT = 67;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, _component?: Component,
                parentTaskId?: string, validatorRegister?: Map<string, Validator>) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component, parentTaskId,
            undefined, validatorRegister);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.TEXT + this.getComponentType();
    }
}
