import {NgModule} from '@angular/core';
import {CdkMonitorFocusDirective, FOCUS_ORIGIN_MONITOR_PROVIDER} from './focus-origin-monitor';
import {PlatformModule} from '../platform';


@NgModule({
    imports: [PlatformModule],
    declarations: [CdkMonitorFocusDirective],
    exports: [CdkMonitorFocusDirective],
    providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
})
export class StyleModule {
}

export * from './focus-origin-monitor';
