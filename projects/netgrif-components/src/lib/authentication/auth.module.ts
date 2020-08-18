import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationOverlayComponent} from './authentication-overlay/authentication-overlay.component';

@NgModule({
    declarations: [AuthenticationOverlayComponent],
    exports: [AuthenticationOverlayComponent],
    imports: [
        CommonModule
    ]
})
export class AuthenticationComponentModule {
}
