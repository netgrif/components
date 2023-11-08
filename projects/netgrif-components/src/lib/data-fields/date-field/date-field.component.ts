import {Component, Inject, Optional} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {AbstractDateFieldComponent, DATE_FORMAT, NAE_INFORM_ABOUT_INVALID_DATA, LanguageService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'nc-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class DateFieldComponent extends AbstractDateFieldComponent {
    constructor(translate: TranslateService,
                protected _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                protected _languageService: LanguageService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, _adapter, _locale, _languageService, informAboutInvalidData);
    }
}
