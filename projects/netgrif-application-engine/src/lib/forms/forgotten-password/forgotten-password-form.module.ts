import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {ForgottenPasswordFormComponent} from './forgotten-password-form.component';


@NgModule({
    declarations: [ForgottenPasswordFormComponent],
    exports: [ForgottenPasswordFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ]
})
export class ForgottenPasswordFormModule {
}
