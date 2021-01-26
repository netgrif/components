import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationDrawerComponent} from './navigation-drawer/navigation-drawer.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import 'hammerjs';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {NavigationRailComponent} from './navigation-rail/navigation-rail.component';
import {NavigationTreeComponent} from './navigation-tree/navigation-tree.component';
import {UserComponentModule} from '../user/user.module';
import {QuickPanelComponentModule} from './quick-panel/quick-panel.module';
import {ResizableModule} from 'angular-resizable-element';


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
        QuickPanelComponentModule,
        TranslateLibModule,
        UserComponentModule,
        ResizableModule
    ],
    exports: [
        NavigationDrawerComponent,
        NavigationRailComponent,
        NavigationTreeComponent
    ]
})
export class NavigationComponentModule {
}
