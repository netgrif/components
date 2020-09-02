import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class ProfileModule {
}
