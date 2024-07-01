import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationFormComponent} from './registration-form.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {LegalNoticeModule} from '../../legal/legal-notice/legal-notice.module';

@NgModule({
    declarations: [RegistrationFormComponent],
    exports: [RegistrationFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateLibModule,
        LegalNoticeModule
    ]
})
export class RegistrationFormComponentModule {
}
