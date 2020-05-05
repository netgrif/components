import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {ForgottenPasswordFormComponent} from './forgotten-password-form.component';
import {TranslateLibModule} from '../../translate/translate-lib.module';


@NgModule({
    declarations: [ForgottenPasswordFormComponent],
    exports: [ForgottenPasswordFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateLibModule
    ]
})
export class ForgottenPasswordFormModule {
}
