import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateLibModule} from '../../../translate/translate-lib.module';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        TranslateLibModule
    ]
})
export class SideMenuFilesUploadModule {
}
