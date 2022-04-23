import {Component, Input} from '@angular/core';
import {I18nField} from '../models/i18n-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ncc-abstract-i18n-text-field',
    template: ''
})
export abstract class AbstractI18nTextFieldComponent {

    @Input() textI18nField: I18nField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    protected constructor(protected _translateService: TranslateService) {
    }

    public getTranslation(): string {
        const locale = this._translateService.currentLang.split('-')[0];
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
