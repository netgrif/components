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

    public getDividerColor(): string | undefined {
        if (this.dividerPropertyEnabled('dividerColor')) {
            return this.dividerI18nField.component?.properties?.dividerColor;
        }
        return undefined;
    }

    public getDividerFontSize(): string | undefined {
        if (this.dividerPropertyEnabled('fontSize')) {
            const fontSize = this.dividerI18nField.component?.properties?.fontSize;
            return fontSize !== undefined ? fontSize + 'px' : undefined;
        }
        return undefined;
    }

    public dividerPropertyEnabled(property: string): boolean {
        return !!this.dividerI18nField?.component?.properties
            && property in this.dividerI18nField.component.properties;
    }
}
