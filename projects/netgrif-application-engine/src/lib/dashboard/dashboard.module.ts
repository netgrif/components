import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {MaterialModule} from '../material/material.module';
import { CountCardComponent } from './cards/count-card/count-card.component';


@NgModule({
    declarations: [
        DashboardContentComponent,
        CountCardComponent,
    ],
    exports: [
        DashboardContentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class DashboardModule {
}
