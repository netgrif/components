import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountCardComponent} from './cards/count-card/count-card.component';
import {IframeCardComponent} from './cards/iframe-card/iframe-card.component';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';

@NgModule({
    declarations: [CountCardComponent, IframeCardComponent, DashboardContentComponent],
    exports: [CountCardComponent, IframeCardComponent, DashboardContentComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
    ]
})
export class DashboardComponentModule {
}
