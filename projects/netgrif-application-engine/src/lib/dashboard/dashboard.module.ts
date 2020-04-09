import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
    declarations: [
        DashboardContentComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class DashboardModule {
}
