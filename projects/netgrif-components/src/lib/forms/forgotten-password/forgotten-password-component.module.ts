import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgottenPasswordComponent} from './forgotten-password.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ForgottenPasswordComponent],
    exports: [ForgottenPasswordComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateLibModule
    ]
})
export class ForgottenPasswordComponentModule {
}
