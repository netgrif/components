import {AbstractTimeInstanceField} from './models/abstract-time-instance-field';
import {TranslateService} from '@ngx-translate/core';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../registry/validation-registry.service";
import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-time-instance-field',
    template: ''
})
export abstract class AbstractTimeInstanceFieldComponent<T extends AbstractTimeInstanceField> extends AbstractBaseDataFieldComponent<T> implements OnDestroy {

    protected _subLang: Subscription;
    protected constructor(_translate: TranslateService,
                          protected _adapter: DateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>,
                          _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
        if (this._locale !== this._languageService.getLanguage()) {
            this.setLangToAdapter(this._languageService.getLanguage());
        }
        this._subLang = this._languageService.getLangChange$().subscribe(lang => {
            if (this._locale !== lang) {
                this.setLangToAdapter(lang);
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._subLang.unsubscribe();
    }

    public setLangToAdapter(lang: string) {
        this._locale = lang
        this._adapter.setLocale(this._locale);
    }
}
