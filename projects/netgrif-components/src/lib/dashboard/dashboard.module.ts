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
import {BarChartModule, GaugeModule, LineChartModule, NgxChartsModule, PieChartModule} from "@swimlane/ngx-charts";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [CountCardComponent, IframeCardComponent, DashboardContentComponent, PiechartCardComponent, LinechartCardComponent, BarchartCardComponent, LineargaugeCardComponent],
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
