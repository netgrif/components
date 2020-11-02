import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {EmailSubmissionFormComponent} from './email-submission-form.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';


@NgModule({
    declarations: [EmailSubmissionFormComponent],
    exports: [EmailSubmissionFormComponent],
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
