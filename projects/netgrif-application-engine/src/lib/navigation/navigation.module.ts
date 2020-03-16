import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationDrawerComponent} from './navigation-drawer/navigation-drawer.component';
import {NavigationRailComponent} from './navigation-rail/navigation-rail.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';


@NgModule({
    declarations: [
        NavigationDrawerComponent,
        NavigationRailComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule
    ],
    exports: [
        NavigationDrawerComponent,
        NavigationRailComponent
    ]
})
export class NavigationModule {
}
