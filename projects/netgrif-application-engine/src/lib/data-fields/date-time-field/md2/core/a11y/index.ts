import {NgModule} from '@angular/core';
import {FocusTrapDirective, FocusTrapFactory} from './focus-trap';
import {LIVE_ANNOUNCER_PROVIDER} from './live-announcer';
import {InteractivityChecker} from './interactivity-checker';
import {CommonModule} from '@angular/common';
import {PlatformModule} from '../platform';

// TODO A11yModule sa pouziva
@NgModule({
    imports: [CommonModule, PlatformModule],
    declarations: [FocusTrapDirective],
    exports: [FocusTrapDirective],
    providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
})
export class A11yModule {
}
