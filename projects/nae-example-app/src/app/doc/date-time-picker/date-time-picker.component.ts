import { Component } from '@angular/core';

@Component({
    selector: 'nae-app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent {
    readonly TITLE = 'Date Time picker DEMO';
    readonly DESCRIPTION = 'Date Time picker DEMO';

    set type(val: string) {
        this._type = val;
        this.dateFormat = null;
    }
    get type() {
        return this._type;
    }
    isRequired = false;
    isDisabled = false;
    isOpenOnFocus = false;
    today: Date = new Date();

    private _type = 'date';

    types: Array<any> = [
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Month', value: 'month' },
        { text: 'Date Time', value: 'datetime' }];

    mode = 'auto';
    modes: Array<any> = [
        { text: 'Auto', value: 'auto' },
        { text: 'Portrait', value: 'portrait' },
        { text: 'Landscape', value: 'landscape' }];

    startView = 'month';
    startViews: Array<any> = [
        { text: 'Clock', value: 'clock' },
        { text: 'Month', value: 'month' },
        { text: 'Year', value: 'year' }];

    date: Date;
    minDate: Date;
    maxDate: Date;
    startAt: Date;
    customID = 'datepicker-id';

    dateFormat: string = null;
    dateFormatsDateTime: Array<any> = [
        { name: 'US:', value: 'M/d/y H:mm A' },
        { name: 'England:', value: 'dd/MM/y H:mm A' },
        { name: 'Poland:', value: 'd.MM.y HH:mm' },
        { name: 'Germany:', value: 'd.M.y HH:mm' },
        { name: 'France:', value: 'd/MM/y HH:mm' },
        { name: 'ISO 8601', value: 'y-MM-dd HH:mm' }
    ];
    dateFormatsDate: Array<any> = [
        { name: 'US:', value: 'M/d/y' },
        { name: 'England:', value: 'dd/MM/y' },
        { name: 'Poland:', value: 'd.MM.y' },
        { name: 'Germany:', value: 'd.M.y' },
        { name: 'France:', value: 'd/MM/y' },
        { name: 'ISO 8601', value: 'y-MM-dd' }
    ];
    dateFormatsTime: Array<any> = [
        { name: 'US:', value: 'H:mm A' },
        { name: 'England:', value: 'H:mm A' },
        { name: 'Poland:', value: 'HH:mm' },
        { name: 'Germany:', value: 'HH:mm' },
        { name: 'France:', value: 'HH:mm' },
        { name: 'ISO 8601', value: 'HH:mm' }
    ];
    dateFormatsMonth: Array<any> = [
        { name: 'US:', value: 'M/y' },
        { name: 'England:', value: 'MM/y' },
        { name: 'Poland:', value: 'MM.y' },
        { name: 'Germany:', value: 'M.y' },
        { name: 'France:', value: 'MM/y' },
        { name: 'ISO 8601', value: 'y-MM' }
    ];
    dateFormats: { [index: string]: Array<any>; } =
        {
            datetime: this.dateFormatsDateTime,
            date: this.dateFormatsDate,
            time: this.dateFormatsTime,
            month: this.dateFormatsMonth
        };

    touch: boolean;
    filterOdd: boolean;
    yearView: boolean;

    setDate() {
        this.date = new Date(this.today);
    }
    dateFilter = (date: Date) => date.getMonth() % 2 === 1 && date.getDate() % 2 === 0;

}
