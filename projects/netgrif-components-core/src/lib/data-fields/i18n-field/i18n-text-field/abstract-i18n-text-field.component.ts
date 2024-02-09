import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {DEFAULT_LANGUAGE_CODE, I18nField} from '../models/i18n-field';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguageIconsService} from '../language-icons.service';
import {Subscription} from 'rxjs';
import {AbstractI18nErrorsComponent} from '../abstract-i18n-errors.component';
import {LanguageIcons} from '../models/language-icons';
import {I18nFieldTranslations} from '../models/i18n-field-value';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-i18n-text-field',
    template: ''
})
export abstract class AbstractI18nTextFieldComponent extends AbstractI18nErrorsComponent implements OnInit, OnDestroy {

    private fieldValueChangesSubscription: Subscription;
    private fieldUpdateSubscription: Subscription;

    public languageKeys: Array<string>;

    protected initializedLanguage = false;

    public selectedLanguage: string;
    public filledShown = false;

    private labelWidth: number;
    public cutProperty: string;

    public currentValue: I18nFieldTranslations = {};
    public filledKeys: Array<string>;

    protected constructor(protected languageIconsService: LanguageIconsService,
                          protected _translateService: TranslateService,
                          protected _domSanitizer: DomSanitizer,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>,
                          _validationRegistry: ValidationRegistryService) {
        super(languageIconsService, _translateService, dataFieldPortalData, _validationRegistry);
        this.selectedLanguage = this._translateService.currentLang.split('-')[0];
        this.languageKeys = Object.keys(this.languageIconsService.languageIcons);
    }

    ngOnInit(): void {
        this.currentValue = I18nField.toObject(this.dataField.value);
        this.fieldUpdateSubscription = this.dataField.updated.subscribe(() => {
            this.refreshCurrentValue();
        });
        this.fieldValueChangesSubscription = this.dataField.valueChanges().subscribe(newValue => {
            this.refreshCurrentValue(newValue);
        });
    }

    ngOnDestroy(): void {
        this.fieldUpdateSubscription.unsubscribe();
        this.fieldValueChangesSubscription.unsubscribe();
    }

    protected refreshCurrentValue(newValue = this.dataField.value): void {
        if (this.dataField.disabled) {
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

    public isDefaultValue(chosenLanguage: string): boolean {
        return chosenLanguage === DEFAULT_LANGUAGE_CODE;
    }

    public selectLanguage(newLanguage: string): void {
        this.selectedLanguage = newLanguage;
        this.refreshFilledMap();
    }

    public setSelectedValue(): void {
        if (!this.isDefaultValue(this.selectedLanguage) && this.currentValue[this.selectedLanguage] === '') {
            delete this.currentValue[this.selectedLanguage];
        }
        this.dataField.value = I18nField.fromObject(this.currentValue, this.dataField.value.key);
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
        this.dataField.value = I18nField.fromObject(this.currentValue, this.dataField.value.key);
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
            this.cutProperty = `polygon(0 0, 0 100%, 100% 100%, 100% 0%, ${calculatedWidth} 0, ${calculatedWidth} 6%, 0.5em 6%, 0.5em 0)`;
        }
        return this.cutProperty;
    }

    public hasHint(): boolean {
        return this.dataField.description !== undefined && this.dataField.description !== '';
    }


    public getTranslation(): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in this.dataField.value.translations
            ? this.dataField.value.translations[locale]
            : this.dataField.value.defaultValue;
    }

    public isPlainText(): boolean {
        if (this.checkPropertyInComponent('plainText')) {
            return this.dataField.component.properties.plainText === 'true';
        }
    }

    public getTextColor(): string {
        if (this.checkPropertyInComponent('textColor')) {
            return this.dataField.component.properties.textColor;
        }
    }

    public getTextFontSize(): string {
        if (this.checkPropertyInComponent('fontSize')) {
            return this.dataField.component.properties.fontSize + 'px';
        }
    }

    public textPropertyEnabled(property: string): boolean {
        return !!this.dataField?.component?.properties
            && property in this.dataField.component.properties;
    }
}
