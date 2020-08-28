import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationFormComponent} from './registration-form.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';

@NgModule({
    declarations: [RegistrationFormComponent],
    exports: [RegistrationFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateLibModule
    ]
})
export class RegistrationFormComponentModule {
}
