import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {TranslateLibModule} from '../translate/translate-lib.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class UserModule {
}
