import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportNetComponent} from './import-net.component';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateLibModule} from '../../../translate/translate-lib.module';


@NgModule({
    declarations: [
        ImportNetComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        TranslateLibModule
    ],
    exports: [ImportNetComponent],
    entryComponents: [ImportNetComponent]
})
export class SideMenuImportNetModule {
}
