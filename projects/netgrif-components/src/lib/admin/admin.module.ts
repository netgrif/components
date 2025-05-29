import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {UserInviteComponent} from './user-invite/user-invite.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    declarations: [UserInviteComponent],
    exports: [UserInviteComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        MatFormFieldModule
    ]
})
export class AdminComponentModule {
}
