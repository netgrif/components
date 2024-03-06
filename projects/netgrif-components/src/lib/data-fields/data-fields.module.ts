import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    CovalentModule,
    CurrencyModule,
    CustomDateAdapter, FrontActionModule,
    MaterialModule,
    TranslateLibModule,
    ComponentRegistryService
} from '@netgrif/components-core';
import {AngularResizeEventModule} from 'angular-resize-event';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {BooleanFieldComponent} from './boolean-field/boolean-field.component';
import {ButtonFieldComponent} from './button-field/button-field.component';
import {DateAdapter} from '@angular/material/core';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {DateFieldComponent} from './date-field/date-field.component';
import {DateTimeFieldComponent} from './date-time-field/date-time-field.component';
import {EnumerationFieldComponent} from './enumeration-field/enumeration-field.component';
import {
    EnumerationAutocompleteSelectFieldComponent
} from './enumeration-field/enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';
import {
    EnumerationSelectFieldComponent
} from './enumeration-field/enumeration-select-field/enumeration-select-field.component';
import {
    EnumerationListFieldComponent
} from './enumeration-field/enumeration-list-field/enumeration-list-field.component';
import {FileFieldComponent} from './file-field/file-field.component';
import {FileListFieldComponent} from './file-list-field/file-list-field.component';
import {MultichoiceFieldComponent} from './multichoice-field/multichoice-field.component';
import {
    MultichoiceSelectFieldComponent
} from './multichoice-field/multichoice-select-field/multichoice-select-field.component';
import {
    MultichoiceListFieldComponent
} from './multichoice-field/multichoice-list-field/multichoice-list-field.component';
import {NumberFieldComponent} from './number-field/number-field.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {TextareaFieldComponent} from './text-field/textarea-field/textarea-field.component';
import {RichTextareaFieldComponent} from './text-field/rich-textarea-field/rich-textarea-field.component';
import {SimpleTextFieldComponent} from './text-field/simple-text-field/simple-text-field.component';
import {UserFieldComponent} from './user-field/user-field.component';
import {RequiredLabelComponent} from './required-label/required-label.component';
import {HtmlTextareaFieldComponent} from './text-field/html-textarea-field/html-textarea-field.component';
import {QuillModule} from 'ngx-quill';
import {NumberCurrencyFieldComponent} from './number-field/number-currency-field/number-currency-field.component';
import {NumberDefaultFieldComponent} from './number-field/number-default-field/number-default-field.component';
import {PasswordTextFieldComponent} from './text-field/password-text-field/password-text-field.component';
import {PreviewDialogComponent} from './file-field/preview-dialog/preview-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
    EnumerationStepperFieldComponent
} from './enumeration-field/enumeration-stepper-field/enumeration-stepper-field.component';
import {
    EnumerationIconFieldComponent
} from './enumeration-field/enumeration-icon-field/enumeration-icon-field.component';
import {
    EnumerationAutocompleteDynamicFieldComponent
} from './enumeration-field/enumeration-autocomplete-dynamic-field/enumeration-autocomplete-dynamic-field.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {FilterFieldComponent} from './filter-field/filter-field.component';
import {FilterFieldContentComponent} from './filter-field/filter-field-content/filter-field-content.component';
import {AdvancedSearchComponentModule} from '../search/advanced-search/advanced-search.module';
import {
    SideMenuUserAssignComponentModule
} from '../side-menu/content-components/user-assign/side-menu-user-assign-component.module';
import {I18nFieldComponent} from './i18n-field/i18n-field.component';
import {I18nDividerFieldComponent} from './i18n-field/i18n-divider-field/i18n-divider-field.component';
import {I18nTextFieldComponent} from './i18n-field/i18n-text-field/i18n-text-field.component';
import {EasymdeWrapperComponent} from './text-field/rich-textarea-field/easymde-wrapper/easymde-wrapper.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MultichoiceAutocompleteFieldComponent
} from './multichoice-field/multichoice-autocomplete-field/multichoice-autocomplete-field.component';
import { UserListFieldComponent } from './user-list-field/user-list-field.component';
import {
    SideMenuMultiUserAssignComponentModule
} from "../side-menu/content-components/multi-user-assign/side-menu-multi-user-assign-component.module";
import { NumberDecimalFieldComponent } from './number-field/number-decimal-field/number-decimal-field.component';
import {TaskRefFieldComponent} from './task-ref-field/task-ref-field.component';
import {
    TaskRefDashboardTileComponent
} from './task-ref-field/task-ref-dashboard-field/task-ref-dashboard-tile/task-ref-dashboard-tile.component';
import {
    DashboardLineChartTextFieldComponent
} from './text-field/dashboard-line-chart-text-field/dashboard-line-chart-text-field.component';
import {DashboardComponentModule} from '../dashboard/dashboard.module';
import {
    DashboardPieChartTextFieldComponent
} from './text-field/dashboard-pie-chart-text-field/dashboard-pie-chart-text-field.component';
import {
    DashboardPortalTextFieldComponent
} from './text-field/dashboard-portal-text-field/dashboard-portal-text-field.component';
import {
    DashboardBarChartTextFieldComponent
} from './text-field/dashboard-bar-chart-text-field/dashboard-bar-chart-text-field.component';
import {
    DashboardIframeTextFieldComponent
} from './text-field/dashboard-iframe-text-field/dashboard-iframe-text-field.component';
import { RouterModule } from '@angular/router';
import { FilterFieldTabViewContentComponent } from './filter-field/tab-view-filter-field/filter-field-tab-view-content.component';
import { BooleanDefaultFieldComponent } from './boolean-field/boolean-default-field/boolean-default-field.component';
import { ButtonDefaultFieldComponent } from './button-field/button-default-field/button-default-field.component';
import { DateDefaultFieldComponent } from './date-field/date-default-field/date-default-field.component';
import { DateTimeDefaultFieldComponent } from './date-time-field/date-time-default-field/date-time-default-field.component';
import { FileDefaultFieldComponent } from './file-field/file-default-field/file-default-field.component';
import { FileListDefaultFieldComponent } from './file-list-field/file-list-default-field/file-list-default-field.component';
import { FilterDefaultFieldComponent } from './filter-field/filter-default-field/filter-default-field.component';
import { UserDefaultFieldComponent } from './user-field/user-default-field/user-default-field.component';
import { UserListDefaultFieldComponent } from './user-list-field/user-list-default-field/user-list-default-field.component';
import {
    TaskRefDashboardFieldComponent
} from "./task-ref-field/task-ref-dashboard-field/task-ref-dashboard-field.component";
import { TaskRefListFieldComponent } from './task-ref-field/task-ref-list-field/task-ref-list-field.component';
import { CaseRefDefaultComponent } from './case-ref-field/case-ref-default/case-ref-default.component';
import { MultichoiceCaserefFieldComponent } from './multichoice-field/multichoice-caseref-field/multichoice-caseref-field.component';
import {
    EnumerationCaserefFieldComponent
} from './enumeration-field/enumeration-caseref-field/enumeration-caseref-field.component';
import {SignaturePadFieldComponent} from './text-field/signature-pad-field/signature-pad-field.component';
import { StringCollectionDefaultFieldComponent } from './string-collection-field/string-collection-default-field/string-collection-default-field.component';
import {ComponentPortal} from "@angular/cdk/portal";

@NgModule({
    declarations: [
        BooleanFieldComponent,
        ButtonFieldComponent,
        DataFieldTemplateComponent,
        DateFieldComponent,
        DateTimeFieldComponent,
        EnumerationFieldComponent,
        EnumerationAutocompleteSelectFieldComponent,
        EnumerationSelectFieldComponent,
        EnumerationListFieldComponent,
        FileFieldComponent,
        FileListFieldComponent,
        MultichoiceFieldComponent,
        MultichoiceSelectFieldComponent,
        MultichoiceListFieldComponent,
        MultichoiceAutocompleteFieldComponent,
        NumberFieldComponent,
        TextFieldComponent,
        TextareaFieldComponent,
        RichTextareaFieldComponent,
        SimpleTextFieldComponent,
        UserFieldComponent,
        RequiredLabelComponent,
        HtmlTextareaFieldComponent,
        PasswordTextFieldComponent,
        NumberCurrencyFieldComponent,
        NumberDefaultFieldComponent,
        PreviewDialogComponent,
        NumberDefaultFieldComponent,
        EnumerationStepperFieldComponent,
        EnumerationIconFieldComponent,
        EnumerationAutocompleteDynamicFieldComponent,
        FilterFieldComponent,
        FilterFieldContentComponent,
        I18nFieldComponent,
        I18nDividerFieldComponent,
        I18nTextFieldComponent,
        EasymdeWrapperComponent,
        UserListFieldComponent,
        TaskRefFieldComponent,
        TaskRefDashboardTileComponent,
        DashboardLineChartTextFieldComponent,
        DashboardPieChartTextFieldComponent,
        DashboardPortalTextFieldComponent,
        DashboardBarChartTextFieldComponent,
        DashboardIframeTextFieldComponent,
        FilterFieldTabViewContentComponent,
        BooleanDefaultFieldComponent,
        ButtonDefaultFieldComponent,
        DateDefaultFieldComponent,
        DateTimeDefaultFieldComponent,
        FileDefaultFieldComponent,
        FileListDefaultFieldComponent,
        FilterDefaultFieldComponent,
        UserDefaultFieldComponent,
        UserListDefaultFieldComponent,
        TaskRefDashboardFieldComponent,
        TaskRefListFieldComponent,
        CaseRefDefaultComponent,
        MultichoiceCaserefFieldComponent,
        EnumerationCaserefFieldComponent,
        StringCollectionDefaultFieldComponent,
        SignaturePadFieldComponent,
        NumberDecimalFieldComponent
    ],
    exports: [
        DataFieldTemplateComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AngularResizeEventModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        TranslateLibModule,
        SideMenuUserAssignComponentModule,
        SideMenuMultiUserAssignComponentModule,
        QuillModule.forRoot(),
        MatDialogModule,
        AdvancedSearchComponentModule,
        MatProgressSpinnerModule,
        CurrencyModule,
        BrowserModule,
        BrowserAnimationsModule,
        DashboardComponentModule,
        RouterModule,
        FrontActionModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsComponentModule {

    constructor(registry: ComponentRegistryService) {
        registry.register("boolean-default", (injector: Injector) => new ComponentPortal<any>(BooleanDefaultFieldComponent, null, injector));
        registry.register("button-default", (injector: Injector) => new ComponentPortal<any>(ButtonDefaultFieldComponent, null, injector));
        registry.register("date-default", (injector: Injector) => new ComponentPortal<any>(DateDefaultFieldComponent, null, injector));
        registry.register("date-time-default", (injector: Injector) => new ComponentPortal<any>(DateTimeDefaultFieldComponent, null, injector));
        registry.register("enumeration-default", (injector: Injector) => new ComponentPortal<any>(EnumerationSelectFieldComponent, null, injector));
        registry.register("enumeration-autocomplete_dynamic", (injector: Injector) => new ComponentPortal<any>(EnumerationAutocompleteDynamicFieldComponent, null, injector));
        registry.register("enumeration-autocomplete", (injector: Injector) => new ComponentPortal<any>(EnumerationAutocompleteSelectFieldComponent, null, injector));
        registry.register("enumeration-list", (injector: Injector) => new ComponentPortal<any>(EnumerationListFieldComponent, null, injector));
        registry.register("enumeration-stepper", (injector: Injector) => new ComponentPortal<any>(EnumerationStepperFieldComponent, null, injector));
        registry.register("enumeration-icon", (injector: Injector) => new ComponentPortal<any>(EnumerationIconFieldComponent, null, injector));
        registry.register("enumeration-caseref", (injector: Injector) => new ComponentPortal<any>(EnumerationCaserefFieldComponent, null, injector));
        registry.register("file-default", (injector: Injector) => new ComponentPortal<any>(FileDefaultFieldComponent, null, injector));
        registry.register("file-preview", (injector: Injector) => new ComponentPortal<any>(FileDefaultFieldComponent, null, injector));
        registry.register("file-list-default", (injector: Injector) => new ComponentPortal<any>(FileListDefaultFieldComponent, null, injector));
        registry.register("filter-default", (injector: Injector) => new ComponentPortal<any>(FilterDefaultFieldComponent, null, injector));
        registry.register("filter-filter-tab-view", (injector: Injector) => new ComponentPortal<any>(FilterDefaultFieldComponent, null, injector));
        registry.register("i18n-divider", (injector: Injector) => new ComponentPortal<any>(I18nDividerFieldComponent, null, injector));
        registry.register("i18n-text", (injector: Injector) => new ComponentPortal<any>(I18nTextFieldComponent, null, injector));
        registry.register("i18n-default", (injector: Injector) => new ComponentPortal<any>(I18nTextFieldComponent, null, injector));
        registry.register("multichoice-default", (injector: Injector) => new ComponentPortal<any>(MultichoiceSelectFieldComponent, null, injector));
        registry.register("multichoice-list", (injector: Injector) => new ComponentPortal<any>(MultichoiceListFieldComponent, null, injector));
        registry.register("multichoice-caseref", (injector: Injector) => new ComponentPortal<any>(MultichoiceCaserefFieldComponent, null, injector));
        registry.register("multichoice-autocomplete", (injector: Injector) => new ComponentPortal<any>(MultichoiceAutocompleteFieldComponent, null, injector));
        registry.register("number-default", (injector: Injector) => new ComponentPortal<any>(NumberDefaultFieldComponent, null, injector));
        registry.register("number-currency", (injector: Injector) => new ComponentPortal<any>(NumberCurrencyFieldComponent, null, injector));
        registry.register("number-decimal", (injector: Injector) => new ComponentPortal<any>(NumberDecimalFieldComponent, null, injector));
        registry.register("text-default", (injector: Injector) => new ComponentPortal<any>(SimpleTextFieldComponent, null, injector));
        registry.register("text-password", (injector: Injector) => new ComponentPortal<any>(PasswordTextFieldComponent, null, injector));
        registry.register("text-textarea", (injector: Injector) => new ComponentPortal<any>(TextareaFieldComponent, null, injector));
        registry.register("text-richtextarea", (injector: Injector) => new ComponentPortal<any>(RichTextareaFieldComponent, null, injector));
        registry.register("text-htmltextarea", (injector: Injector) => new ComponentPortal<any>(HtmlTextareaFieldComponent, null, injector));
        registry.register("text-signature", (injector: Injector) => new ComponentPortal<any>(SignaturePadFieldComponent, null, injector));
        registry.register("text-dashboard_line_chart", (injector: Injector) => new ComponentPortal<any>(DashboardLineChartTextFieldComponent, null, injector));
        registry.register("text-dashboard_pie_chart", (injector: Injector) => new ComponentPortal<any>(DashboardPieChartTextFieldComponent, null, injector));
        registry.register("text-dashboard_bar_chart", (injector: Injector) => new ComponentPortal<any>(DashboardBarChartTextFieldComponent, null, injector));
        registry.register("text-dashboard_iframe", (injector: Injector) => new ComponentPortal<any>(DashboardIframeTextFieldComponent, null, injector));
        registry.register("text-dashboard_portal", (injector: Injector) => new ComponentPortal<any>(DashboardPortalTextFieldComponent, null, injector));
        registry.register("task-ref-dashboard", (injector: Injector) => new ComponentPortal<any>(TaskRefDashboardFieldComponent, null, injector));
        registry.register("task-ref-task-list", (injector: Injector) => new ComponentPortal<any>(TaskRefListFieldComponent, null, injector));
        registry.register("case-ref-default", (injector: Injector) => new ComponentPortal<any>(CaseRefDefaultComponent, null, injector));
        registry.register("user-default", (injector: Injector) => new ComponentPortal<any>(UserDefaultFieldComponent, null, injector));
        registry.register("user-list-default", (injector: Injector) => new ComponentPortal<any>(UserListDefaultFieldComponent, null, injector));
        registry.register("string-collection-default", (injector: Injector) => new ComponentPortal<any>(StringCollectionDefaultFieldComponent, null, injector));
    }
}
