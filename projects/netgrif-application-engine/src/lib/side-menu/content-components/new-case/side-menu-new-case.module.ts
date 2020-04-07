import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewCaseComponent} from './new-case.component';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        NewCaseComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule
    ],
    exports: [NewCaseComponent]
})
export class SideMenuNewCaseModule {
}
