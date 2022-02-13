import {Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {I18nField} from '../models/i18n-field';

export abstract class AbstractI18nDividerFieldComponent implements OnInit {

    @Input() dividerI18nField: I18nField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit(): void {
    }

    public getDividerColor(): string {
        if (this.dividerPropertyEnabled('dividerColor')) {
            return this.dividerI18nField.component.properties.dividerColor;
        }
    }

    public getDividerFontSize(): string {
        if (this.dividerPropertyEnabled('fontSize')) {
            return this.dividerI18nField.component.properties.fontSize + 'px';
        }
    }

    public dividerPropertyEnabled(property: string): boolean {
        return !!this.dividerI18nField?.component?.properties
            && property in this.dividerI18nField.component.properties;
    }
}
