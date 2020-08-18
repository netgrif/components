import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TextFieldComponent} from './text-field/text-field.component';
import {TextareaFieldComponent} from './text-field/textarea-field/textarea-field.component';
import {SimpleTextFieldComponent} from './text-field/simple-text-field/simple-text-field.component';
import {NumberFieldComponent} from './number-field/number-field.component';
import {MultichoiceFieldComponent} from './multichoice-field/multichoice-field.component';
import {MultichoiceSelectFieldComponent} from './multichoice-field/multichoice-select-field/multichoice-select-field.component';
import {MultichoiceListFieldComponent} from './multichoice-field/multichoice-list-field/multichoice-list-field.component';
import {MaterialModule} from '../material/material.module';
import {SideMenuModule} from '../side-menu/side-menu.module';
import {HttpClientModule} from '@angular/common/http';
import {AngularResizedEventModule} from 'angular-resize-event';
import {UserFieldComponent} from './user-field/user-field.component';
import {RequiredLabelComponent} from './required-label/required-label.component';
import {CovalentModule} from '../covalent/covalent.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomDateAdapter} from './date-field/models/custom-date-adapter';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {RichTextareaFieldComponent} from './text-field/rich-textarea-field/rich-textarea-field.component';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {DateAdapter} from '@angular/material/core';

@NgModule({
    declarations: [
        TextFieldComponent,
        TextareaFieldComponent,
        SimpleTextFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        MultichoiceSelectFieldComponent,
        MultichoiceListFieldComponent,
        UserFieldComponent,
        RequiredLabelComponent,
        RichTextareaFieldComponent,
    ],
    exports: [
        TextFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        UserFieldComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AngularResizedEventModule,
        HttpClientModule,
        SideMenuModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        TranslateLibModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsModule {
}
