import {Input, OnDestroy, OnInit} from '@angular/core';
import {DEFAULT_LANGUAGE_CODE, I18nField} from '../models/i18n-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguageIconsService} from '../language-icons.service';
import {Subscription} from 'rxjs';
import {AbstractI18nErrorsComponent} from '../abstract-i18n-errors.component';
import {LanguageIcons} from '../models/language-icons';

export abstract class AbstractI18nTextFieldComponent extends AbstractI18nErrorsComponent implements OnInit, OnDestroy {

    @Input() textI18nField: I18nField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    private fieldValueChangesSubscription: Subscription;
    private fieldUpdateSubscription: Subscription;

    public languageKeys: Array<string>;

    protected initializedLanguage = false;

    public selectedLanguage: string;
    public filledShown = false;

    private labelWidth: number;
    public cutProperty: string;

    public currentValue = {};
    public filledKeys: Array<string>;

    protected constructor(protected languageIconsService: LanguageIconsService,
                          protected _translateService: TranslateService,
                          protected _domSanitizer: DomSanitizer) {
        super(languageIconsService, _translateService);
        this.selectedLanguage = this._translateService.currentLang.split('-')[0];
        this.languageKeys = Object.keys(this.languageIconsService.languageIcons);
    }

    ngOnInit(): void {
        this.currentValue = I18nField.toObject(this.textI18nField.value);
        this.fieldUpdateSubscription = this.textI18nField.updated.subscribe(() => {
            this.refreshCurrentValue();
        });
        this.fieldValueChangesSubscription = this.textI18nField.valueChanges().subscribe(newValue => {
            this.refreshCurrentValue(newValue);
        });
    }

    ngOnDestroy(): void {
        this.fieldUpdateSubscription.unsubscribe();
        this.fieldValueChangesSubscription.unsubscribe();
    }

    protected refreshCurrentValue(newValue = this.textI18nField.value): void {
        if (this.textI18nField.disabled) {
            this.selectedLanguage = this._translateService.currentLang.split('-')[0];
            this.filledShown = false;
            this.initializedLanguage = false;
            return;
        }
        if (!this.initializedLanguage) {
            if (!(this.selectedLanguage in newValue.translations)) {
                this.selectedLanguage = DEFAULT_LANGUAGE_CODE;
            }
            this.initializedLanguage = true;
        }
        this.currentValue = I18nField.toObject(newValue);
        this.refreshFilledMap();
    }

    public getLanguageIcons(): LanguageIcons {
        return this.languageIconsService.languageIcons;
    }

    public isDefaultValue(choosenLanguage: string): boolean {
        return choosenLanguage === DEFAULT_LANGUAGE_CODE;
    }

    public selectLanguage(newLanguage: string): void {
        this.selectedLanguage = newLanguage;
        this.refreshFilledMap();
    }

    public setSelectedValue(): void {
        if (!this.isDefaultValue(this.selectedLanguage) && this.currentValue[this.selectedLanguage] === '') {
            delete this.currentValue[this.selectedLanguage];
        }
        this.textI18nField.value = I18nField.fromObject(this.currentValue, this.textI18nField.value.key);
        this.formControlRef.markAsTouched();
    }

    public refreshFilledMap(): void {
        this.filledKeys = [];
        for (const k in this.currentValue) {
            if (this.selectedLanguage === k) {
                continue;
            }
            this.filledKeys.push(k);
        }
        this.filledKeys.sort((a, b) => {
            return this.languageKeys.indexOf(a) - this.languageKeys.indexOf(b);
        });
    }

    public removeTranslation(key: string): void {
        delete this.currentValue[key];
        this.textI18nField.value = I18nField.fromObject(this.currentValue, this.textI18nField.value.key);
        this.formControlRef.markAsTouched();
        this.refreshFilledMap();
    }

    public toggleFilled(): void {
        this.filledShown = !this.filledShown;
    }

    public getCutProperty(i18nLabel): string {
        if (this.labelWidth !== i18nLabel.offsetWidth) {
            this.labelWidth = i18nLabel.offsetWidth;
            const calculatedWidth = 'calc(0.5em + ' + i18nLabel.offsetWidth / 4 * 3 + 'px)';
            this.cutProperty = 'polygon(0 0, 0 100%, 100% 100%, 100% 0%, '
                                + calculatedWidth
                                + ' 0, '
                                + calculatedWidth
                                + ' 5%, 0.5em 5%, 0.5em 0)';
        }
        return this.cutProperty;
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
