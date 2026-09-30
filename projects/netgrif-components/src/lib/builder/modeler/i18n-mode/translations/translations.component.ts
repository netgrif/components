import {Component, OnDestroy, OnInit} from '@angular/core';
import {I18nTranslations} from '@netgrif/petriflow';
import {HistoryService} from '../../services/history/history.service';
import {ModelService} from '../../services/model/model.service';
import {Locale} from '../classes/locale';
import {LanguageSelectService} from '../languages/language-select.service';
import {TranslationGroupConfiguration, Type} from './translation-group/translation-group-configuration';
import {I18nControlService} from "../i18n-control.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-builder-translations',
    templateUrl: './translations.component.html',
    styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit, OnDestroy {

    locale: Locale;
    modelMetadataConfig: TranslationGroupConfiguration;
    taskMetadataConfig: TranslationGroupConfiguration;
    dataMetadataConfig: TranslationGroupConfiguration;
    roleMetadataConfig: TranslationGroupConfiguration;
    private _translation: I18nTranslations;

    constructor(private i18nService: I18nControlService,
                private modelService: ModelService,
                private historyService: HistoryService,
                protected _languageSelect: LanguageSelectService,
                protected _translateService: TranslateService) {
        if (this._languageSelect.locale !== undefined) {
            this.locale = this._languageSelect.locale;
            this._translation = this.modelService.model.getI18n(this.locale?.languageCode);
            this._languageSelect.locale = undefined;
        }
    }

    ngOnInit(): void {
        this.modelMetadataConfig = new TranslationGroupConfiguration(
            Type.MODEL,
            'device_hub',
            this._translateService.instant('builder.modeler.i18n-mode.modelMetadata'),
            this._translateService.instant('builder.modeler.i18n-mode.modelMetadataHint'),
            () => false,
            ''
        );
        this.taskMetadataConfig = new TranslationGroupConfiguration(
            Type.TASK,
            'auto_awesome_motion',
            this._translateService.instant('builder.modeler.i18n-mode.tasks'),
            this._translateService.instant('builder.modeler.i18n-mode.tasksHint'),
            () => this.modelService.model.getTransitions().length === 0,
            this._translateService.instant('builder.modeler.i18n-mode.noTasksInModel')
        );
        this.dataMetadataConfig = new TranslationGroupConfiguration(
            Type.DATA,
            'all_inbox',
            this._translateService.instant('builder.modeler.i18n-mode.dataVariables'),
            this._translateService.instant('builder.modeler.i18n-mode.dataVariablesHint'),
            () => this.modelService.model.getDataSet().length === 0,
            this._translateService.instant('builder.modeler.i18n-mode.noDataVariablesInModel')
        );
        this.roleMetadataConfig = new TranslationGroupConfiguration(
            Type.ROLE,
            'person',
            this._translateService.instant('builder.modeler.i18n-mode.roles'),
            this._translateService.instant('builder.modeler.i18n-mode.rolesHint'),
            () => this.modelService.model.getRoles().length === 0,
            this._translateService.instant('builder.modeler.i18n-mode.noRolesInModel')
        );
    }

    ngOnDestroy() {
        if (this.i18nService.translationsSave) {
            this.i18nService.translationsSave = false;
            this.historyService.save(this._translateService.instant('builder.modeler.i18n-mode.translationsChanged'))
        }
    }

    usedLocales(): Array<Locale> {
        return this.i18nService.locales;
    }

    noLocales(): boolean {
        return this.i18nService.locales.length === 0;
    }

    selectLocale() {
        this._translation = this.modelService.model.getI18n(this.locale?.languageCode);
    }

    get translation(): I18nTranslations {
        return this._translation;
    }

    set translation(value: I18nTranslations) {
        this._translation = value;
    }
}
