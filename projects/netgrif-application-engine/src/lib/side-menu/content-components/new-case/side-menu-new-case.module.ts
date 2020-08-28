import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HotkeyModule} from 'angular2-hotkeys';


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
        SnackBarModule,
        TranslateLibModule,
        HotkeyModule.forRoot()
    ]
})
export class SideMenuNewCaseModule {
}
