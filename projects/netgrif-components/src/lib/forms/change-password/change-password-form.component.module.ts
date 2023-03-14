import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProfileModule, MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {ChangePasswordFormComponent} from "./change-password-form.component";

@NgModule({
    declarations: [ChangePasswordFormComponent],
    exports: [ChangePasswordFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ProfileModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        TranslateLibModule
    ]
})
export class ChangePasswordFormComponentModule {
}
