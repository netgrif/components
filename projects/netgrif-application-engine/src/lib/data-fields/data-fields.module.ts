import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {TextFieldComponent} from './text-field/text-field.component';
import { TextareaFieldComponent } from './text-field/textarea-field/textarea-field.component';
import { SimpleTextFieldComponent } from './text-field/simple-text-field/simple-text-field.component';
import {EnumerationFieldComponent} from "./enumeration-field/enumeration-field.component";
import {EnumerationListFieldComponent} from "./enumeration-field/enumeration-list-field/enumeration-list-field.component";
import {EnumerationSelectFieldComponent} from "./enumeration-field/enumeration-select-field/enumeration-select-field.component";
import {EnumerationAutocompleteSelectFieldComponent} from "./enumeration-field/enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component";
import {NumberFieldComponent} from "./number-field/number-field.component";
import {MultichoiceFieldComponent} from "./multichoice-field/multichoice-field.component";
import {MultichoiceSelectFieldComponent} from "./multichoice-field/multichoice-select-field/multichoice-select-field.component";
import {MultichoiceListFieldComponent} from "./multichoice-field/multichoice-list-field/multichoice-list-field.component";
import {BooleanFieldComponent} from "./boolean-field/boolean-field.component";
import {DateFieldComponent} from './date-field/date-field.component';
import {FileFieldComponent} from "./file-field/file-field.component";
import {MaterialModule} from "../material/material.module";
import {FileUploadService} from "./file-field/file-upload.service";
import {FileDownloadService} from "./file-field/file-download.service";
import {SideMenuModule} from "../side-menu/side-menu.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        TextFieldComponent,
        TextareaFieldComponent,
        SimpleTextFieldComponent,
        EnumerationFieldComponent,
        EnumerationListFieldComponent,
        EnumerationSelectFieldComponent,
        EnumerationAutocompleteSelectFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        MultichoiceSelectFieldComponent,
        MultichoiceListFieldComponent,
        DateFieldComponent,
        BooleanFieldComponent,
        FileFieldComponent,
        DataFieldTemplateComponent,
    ],
    exports: [
        TextFieldComponent,
        EnumerationFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        BooleanFieldComponent,
        DateFieldComponent,
        FileFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        AngularResizedEventModule,
        HttpClientModule,
        SideMenuModule,
    ],
    providers: [
        FileUploadService,
        FileDownloadService
    ]
})
export class DataFieldsModule { }
