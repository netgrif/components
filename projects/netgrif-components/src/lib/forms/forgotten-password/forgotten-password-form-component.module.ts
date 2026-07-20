import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgottenPasswordFormComponent} from './forgotten-password-form.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {ReactiveFormsModule} from '@angular/forms';


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
export class ForgottenPasswordFormComponentModule {
}
