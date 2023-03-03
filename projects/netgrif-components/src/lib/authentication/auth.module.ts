import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationOverlayComponent} from './authentication-overlay/authentication-overlay.component';
import {SessionIdleComponent} from './session-idle/session-idle.component';
import {PopupSessionIdleComponent} from './session-idle/popup-session-idle/popup-session-idle.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateLibModule} from "netgrif-components-core";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
    declarations: [AuthenticationOverlayComponent, SessionIdleComponent, PopupSessionIdleComponent],
    exports: [AuthenticationOverlayComponent, SessionIdleComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        TranslateLibModule,
        FlexModule
    ]
})
export class AuthenticationComponentModule {
}
