import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StyleModule, OverlayModule, PortalModule, A11yModule} from '../core';
import {Md2Datepicker, Md2DatepickerContent} from './datepicker/datepicker';
import {Md2DatepickerToggle} from './datepicker-toggle/datepicker-toggle';
import {Md2Calendar} from './calendar/calendar';
import {Md2MonthView} from './month-view/month-view';
import {Md2YearView} from './year-view/year-view';
import {Md2CalendarBody} from './calendar-body/calendar-body';
import {Md2Clock} from './clock/clock';
import {DateLocale} from './date-locale';
import {DateUtil} from './date-util';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';


export * from './datepicker/datepicker';
export * from './month-view/month-view';
export * from './year-view/year-view';
export * from './calendar-body/calendar-body';
export * from './clock/clock';
export * from './date-locale';
export * from './date-util';


@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        StyleModule,
        A11yModule,
        MatFormFieldModule,
        MatInputModule,
        FlexModule,
    ],
    exports: [
        Md2Datepicker,
        Md2DatepickerToggle,
        Md2Calendar,
        Md2CalendarBody,
        Md2Calendar,
        Md2MonthView,
        Md2YearView,
        Md2CalendarBody,
        Md2Clock,
    ],
    declarations: [
        Md2Datepicker,
        Md2DatepickerContent,
        Md2DatepickerToggle,
        Md2Calendar,
        Md2MonthView,
        Md2YearView,
        Md2CalendarBody,
        Md2Clock,
    ],
    providers: [DateLocale, DateUtil],
    entryComponents: [
        Md2DatepickerContent
    ]
})
export class Md2DatepickerModule {
}
