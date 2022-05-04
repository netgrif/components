import {Input, OnDestroy, OnInit} from '@angular/core';
import {I18nField, I18nFieldValidation} from '../models/i18n-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguageIconsService} from '../language-icons.service';
import {Subscription} from 'rxjs';
import {AbstractI18nErrorsComponent} from '../abstract-i18n-errors.component';

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

    public currentValue = {};
    public filledKeys: Array<string>;

    protected constructor(public languageIconsService: LanguageIconsService,
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
                this.selectedLanguage = 'xx';
            }
            this.initializedLanguage = true;
        }
        this.currentValue = I18nField.toObject(newValue);
        this.refreshFilledMap();
    }

    public isDefaultValue(choosenLanguage: string) {
        return choosenLanguage === 'xx';
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
        })
    }

    public removeTranslation(key: string) {
        delete this.currentValue[key];
        this.textI18nField.value = I18nField.fromObject(this.currentValue, this.textI18nField.value.key);
        this.formControlRef.markAsTouched();
        this.refreshFilledMap();
    }

    public toggleFilled(): void {
        this.filledShown = !this.filledShown;
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
