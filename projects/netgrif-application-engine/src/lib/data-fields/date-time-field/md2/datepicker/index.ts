import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StyleModule, OverlayModule, PortalModule, A11yModule} from '../core';
import {Md2DatepickerComponent, Md2DatepickerContentComponent} from './datepicker/datepicker';
import {Md2DatepickerToggle} from './datepicker-toggle/datepicker-toggle';
import {Md2CalendarComponent} from './calendar/calendar';
import {Md2MonthViewComponent} from './month-view/month-view';
import {Md2YearViewComponent} from './year-view/year-view';
import {Md2CalendarBodyComponent} from './calendar-body/calendar-body';
import {Md2ClockComponent} from './clock/clock';
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
        Md2DatepickerComponent,
        Md2DatepickerToggle,
        Md2CalendarComponent,
        Md2CalendarBodyComponent,
        Md2CalendarComponent,
        Md2MonthViewComponent,
        Md2YearViewComponent,
        Md2CalendarBodyComponent,
        Md2ClockComponent,
    ],
    declarations: [
        Md2DatepickerComponent,
        Md2DatepickerContentComponent,
        Md2DatepickerToggle,
        Md2CalendarComponent,
        Md2MonthViewComponent,
        Md2YearViewComponent,
        Md2CalendarBodyComponent,
        Md2ClockComponent,
    ],
    providers: [DateLocale, DateUtil],
    entryComponents: [
        Md2DatepickerContentComponent
    ]
})
export class Md2DatepickerModule {
}
