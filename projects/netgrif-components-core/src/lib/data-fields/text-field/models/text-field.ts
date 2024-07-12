import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {ValidationRegistryService} from '../../../registry/validation/validation-registry.service';

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
                parentTaskId?: string, protected validationRegistry?: ValidationRegistryService) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component, parentTaskId);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.TEXT + this.getComponentType();
    }
    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes(TextFieldValidation.MIN_LENGTH)) {
                result.push(this.validationRegistry.get('minLength').call(null, {id: 'minLength', args: [item.validationRule]}));
            } else if (item.validationRule.includes(TextFieldValidation.MAX_LENGTH)) {
                result.push(this.validationRegistry.get('maxLength').call(null, {id: 'maxLength', args: [item.validationRule]}));
            } else if (item.validationRule.includes(TextFieldValidation.REGEX)) {
                result.push(this.validationRegistry.get('regex').call(null, {id: 'regex', args: [item.validationRule]}));
            } else if (item.validationRule.includes(TextFieldValidation.EMAIL)) {
                result.push(this.validationRegistry.get('email').call(null, {id: 'email', args: [item.validationRule]}));
            } else if (item.validationRule.includes(TextFieldValidation.TEL_NUMBER)) {
                result.push(this.validationRegistry.get('telNumber').call(null, {id: 'telNumber', args: [item.validationRule]}));
            }
        });

        return result;
    }
}
