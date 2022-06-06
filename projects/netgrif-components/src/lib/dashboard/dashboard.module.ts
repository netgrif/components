import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountCardComponent} from './cards/count-card/count-card.component';
import {IframeCardComponent} from './cards/iframe-card/iframe-card.component';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {PieChartCardComponent} from './cards/piechart-card/pie-chart-card.component';
import {LineChartCardComponent} from './cards/linechart-card/line-chart-card.component';
import {BarchartCardComponent} from './cards/barchart-card/barchart-card.component';
import {LinearGaugeCardComponent} from './cards/lineargauge-card/linear-gauge-card.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PortalCardComponent} from './cards/portal-card/portal-card.component';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
    declarations: [
        CountCardComponent,
        IframeCardComponent,
        DashboardContentComponent,
        PieChartCardComponent,
        LineChartCardComponent,
        BarchartCardComponent,
        LinearGaugeCardComponent,
        PortalCardComponent
    ],
    exports: [
        CountCardComponent,
        IframeCardComponent,
        DashboardContentComponent,
        PieChartCardComponent,
        LineChartCardComponent,
        BarchartCardComponent,
        LinearGaugeCardComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        NgxChartsModule,
        MaterialModule,
        MatGridListModule
    ]
})
export class DashboardComponentModule {
}
