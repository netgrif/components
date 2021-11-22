import {Input, OnInit} from '@angular/core';
import {I18nField} from '../models/i18n-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {UserPreferenceService} from '../../../user/services/user-preference.service';


export abstract class AbstractI18nTextFieldComponent implements OnInit {

    @Input() textI18nField: I18nField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit(): void {
    }

    protected constructor(protected _userPreferenceService: UserPreferenceService) {
    }

    public getTranslation(): string {
        const locale = this._userPreferenceService.getLocale().split('-')[0];
        return locale in this.textI18nField.value.translations
            ? this.textI18nField.value.translations[locale]
            : this.textI18nField.value.defaultValue;
    }

    public isPlainText(): boolean {
        if (this.textPropertyEnabled('plainText')) {
            return this.textI18nField.component.properties.plainText === 'true';
        }
    }

    public getTextColor(): string {
        if (this.textPropertyEnabled('textColor')) {
            return this.textI18nField.component.properties.textColor;
        }
    }

    public getTextFontSize(): string {
        if (this.textPropertyEnabled('fontSize')) {
            return this.textI18nField.component.properties.fontSize + 'px';
        }
    }

    public textPropertyEnabled(property: string): boolean {
        return !!this.textI18nField?.component?.properties
            && property in this.textI18nField.component.properties;
    }
}
