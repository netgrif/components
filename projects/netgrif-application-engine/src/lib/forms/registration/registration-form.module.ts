import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationFormComponent} from './registration-form.component';


@NgModule({
    declarations: [RegistrationFormComponent],
    exports: [RegistrationFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ]
})
export class RegistrationFormModule {
}
