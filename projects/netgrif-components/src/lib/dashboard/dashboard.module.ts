import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountCardComponent} from './cards/count-card/count-card.component';
import {IframeCardComponent} from './cards/iframe-card/iframe-card.component';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {PiechartCardComponent} from "./cards/piechart-card/piechart-card.component";
import { LinechartCardComponent } from './cards/linechart-card/linechart-card.component';
import { BarchartCardComponent } from './cards/barchart-card/barchart-card.component';
import { LineargaugeCardComponent } from './cards/lineargauge-card/lineargauge-card.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { PortalCardCompoment } from './cards/custom-card/portal-card-compoment.component';

@NgModule({
    declarations: [CountCardComponent, IframeCardComponent, DashboardContentComponent, PiechartCardComponent, LinechartCardComponent, BarchartCardComponent, LineargaugeCardComponent, PortalCardCompoment],
    exports: [CountCardComponent, IframeCardComponent, DashboardContentComponent, PiechartCardComponent, LinechartCardComponent, BarchartCardComponent, LineargaugeCardComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        NgxChartsModule
    ]
})
export class DashboardComponentModule {
}
