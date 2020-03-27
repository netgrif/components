import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationDrawerComponent} from './navigation-drawer/navigation-drawer.component';
import {NavigationRailComponent} from './navigation-rail/navigation-rail.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NavigationTreeComponent} from './navigation-tree/navigation-tree.component';
import {RouterModule} from '@angular/router';
import {QuickPanelModule} from './quick-panel/quick-panel.module';
import {UserModule} from '../user/user.module';


@NgModule({
    declarations: [
        NavigationDrawerComponent,
        NavigationRailComponent,
        NavigationTreeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        QuickPanelModule,
        UserModule
    ],
    exports: [
        NavigationDrawerComponent,
        NavigationRailComponent,
        NavigationTreeComponent
    ]
})
export class NavigationModule {
}
