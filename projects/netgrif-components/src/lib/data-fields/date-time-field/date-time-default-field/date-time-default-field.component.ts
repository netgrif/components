import {Component, Inject, OnDestroy, OnInit, Optional, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    AbstractDateTimeDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateTimeField,
    DATE_TIME_FORMAT,
    LanguageService
} from '@netgrif/components-core'
import {TranslateService} from "@ngx-translate/core";
import {MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import moment, {Moment} from 'moment';
import {merge, Subscription} from 'rxjs';

@Component({
  selector: 'nc-date-time-default-field',
  templateUrl: './date-time-default-field.component.html',
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DateTimeDefaultFieldComponent extends AbstractDateTimeDefaultFieldComponent implements OnInit, OnDestroy {

    /**
     * Control of the date input. The date and the time input share the value of the field, a date typed or picked in the
     * date input has no time: the value of the field gets the new date with its time (set by the time input), in one
     * change (not midnight first).
     */
    public readonly dateControl = new FormControl<Moment | null>(null);
    private _dateSyncSub: Subscription;
    private _dateErrorsSub: Subscription;

    /** errors of the date input (its own control) that make the value of the field invalid */
    protected static readonly DATE_ERRORS = ['matDatepickerParse', 'matDatepickerMin', 'matDatepickerMax'];

  constructor(_translate: TranslateService,
              _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) protected _locale: string,
              _languageService: LanguageService,
              @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
      super(_translate, _adapter, _locale, _languageService, dataFieldPortalData);
  }

    ngOnInit(): void {
        this.syncDateControl();
        this._dateSyncSub = merge(this.formControlRef.valueChanges, this.formControlRef.statusChanges)
            .subscribe(() => {
                this.syncDateControl();
                this.applyDateErrors();
            });
        this._dateErrorsSub = this.dateControl.statusChanges.subscribe(() => this.applyDateErrors());
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._dateSyncSub?.unsubscribe();
        this._dateErrorsSub?.unsubscribe();
    }

    getErrorMessage(): string {
        if (this.formControlRef.hasError('matDatepickerParse')) {
            return this._translate.instant('dataField.validations.dateInvalid');
        }
        if (this.formControlRef.hasError('matDatepickerMin') || this.formControlRef.hasError('matDatepickerMax')) {
            const format = (date: any) => !!date ? moment(date).format('DD.MM.YYYY') : undefined;
            const left = format(this.dataField.min);
            const right = format(this.dataField.max);
            if (left && right) {
                return this._translate.instant('dataField.validations.dateRange', {left, right});
            }
            return left
                ? this._translate.instant('dataField.validations.dateFuture', {left})
                : this._translate.instant('dataField.validations.datePast', {right});
        }
        return super.getErrorMessage();
    }

    /**
     * A date typed or picked in the date input: the value of the field with the new date and the time it had.
     */
    public dateChanged(date: Moment | null): void {
        if (!date) {
            if (!this.dateControl.hasError('matDatepickerParse')) {
                this.formControlRef.setValue(null);
            }
            return;
        }
        const value = moment(date);
        const current = this.formControlRef.value;
        if (current) {
            const time = moment(current);
            value.set({hour: time.hour(), minute: time.minute(), second: time.second(), millisecond: 0});
        }
        this.formControlRef.setValue(value);
        this.formControlRef.markAsDirty();
    }

    /**
     * Copies the errors of the date input into the control of the field (its validators are set by the data field, an
     * added validator would be replaced): the field is invalid (and its task can't be finished) while the date input is.
     */
    protected applyDateErrors(): void {
        const dateErrors = Object.fromEntries(Object.entries(this.dateControl.errors ?? {})
            .filter(([key]) => DateTimeDefaultFieldComponent.DATE_ERRORS.includes(key)));
        const ownErrors = Object.fromEntries(Object.entries(this.formControlRef.errors ?? {})
            .filter(([key]) => !DateTimeDefaultFieldComponent.DATE_ERRORS.includes(key)));
        const errors = {...ownErrors, ...dateErrors};
        const hadDateErrors = Object.keys(this.formControlRef.errors ?? {}).some(key => DateTimeDefaultFieldComponent.DATE_ERRORS.includes(key));
        if (Object.keys(dateErrors).length === 0 && !hadDateErrors) {
            return;
        }
        this.formControlRef.setErrors(Object.keys(errors).length > 0 ? errors : null, {emitEvent: false});
        this.dataField.valid = !this.formControlRef.invalid;
    }

    protected syncDateControl(): void {
        const value = this.formControlRef.value;
        if (!moment.isMoment(this.dateControl.value) || !value || !moment(value).isSame(this.dateControl.value, 'day')) {
            this.dateControl.setValue(value ?? null, {emitEvent: false});
        }
        if (this.formControlRef.disabled !== this.dateControl.disabled) {
            this.formControlRef.disabled ? this.dateControl.disable({emitEvent: false}) : this.dateControl.enable({emitEvent: false});
        }
    }
}
