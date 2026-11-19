import {Component, Inject, Optional, ChangeDetectionStrategy} from "@angular/core";
import {
    AbstractTimeInstanceFieldComponent
} from "../../time-instance-abstract-field/abstract-time-instance-field.component";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DateTimeField} from "../models/date-time-field";
import {MAT_DATE_LOCALE, DateAdapter} from '@angular/material/core';
import {LanguageService} from '../../../translate/language.service';
import moment, {Moment} from 'moment/moment';

@Component({
    selector: 'ncc-abstract-date-time-default-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractDateTimeDefaultFieldComponent extends AbstractTimeInstanceFieldComponent<DateTimeField> {

    constructor(protected _translate: TranslateService,
                protected _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                protected _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData)
    }

    /**
     * Minimum of the time picker. The time part of {@link DateTimeField.min} applies only on the day of the minimum,
     * on other days every time can be picked (the date part is limited by the date picker).
     */
    public get timeMin(): Moment | null {
        return this.sameDay(this.dataField?.min) ? this.dataField.min : null;
    }

    /**
     * Maximum of the time picker, the time part of {@link DateTimeField.max} on the day of the maximum.
     */
    public get timeMax(): Moment | null {
        return this.sameDay(this.dataField?.max) ? this.dataField.max : null;
    }

    protected sameDay(limit: Moment | undefined): boolean {
        const value = this.formControlRef?.value;
        return !!limit && !!value && moment(value).isSame(limit, 'day');
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
