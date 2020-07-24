import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from './login-form.component';
import {TranslateLibModule} from '../../translate/translate-lib.module';


@NgModule({
    declarations: [LoginFormComponent],
    exports: [LoginFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateLibModule
    ]
})
export class LoginFormModule {
}
