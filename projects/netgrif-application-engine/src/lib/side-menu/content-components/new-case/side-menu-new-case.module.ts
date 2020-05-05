import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewCaseComponent} from './new-case.component';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';


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
        FormsModule,
        SnackBarModule,
        TranslateLibModule
    ],
    exports: [NewCaseComponent],
    entryComponents: [NewCaseComponent]
})
export class SideMenuNewCaseModule {
}
