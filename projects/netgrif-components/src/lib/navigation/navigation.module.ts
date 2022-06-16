import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigationDrawerComponent} from './navigation-drawer/navigation-drawer.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import 'hammerjs';
import {
    GroupNavigationComponentResolverService,
    MaterialModule,
    TranslateLibModule,
    NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT
} from '@netgrif/components-core';
import {NavigationRailComponent} from './navigation-rail/navigation-rail.component';
import {NavigationTreeComponent} from './navigation-tree/navigation-tree.component';
import {UserComponentModule} from '../user/user.module';
import {QuickPanelComponentModule} from './quick-panel/quick-panel.module';
import {ResizableModule} from 'angular-resizable-element';
import {
    GroupNavigationComponentResolverComponent
} from './group-navigation-component-resolver/group-navigation-component-resolver.component';
import {
    DefaultGroupNavigationComponentResolverService
} from './group-navigation-component-resolver/default-group-navigation-component-resolver.service';
import {
    DefaultSimpleTaskViewComponent
} from './group-navigation-component-resolver/default-components/default-simple-task-view/default-simple-task-view.component';
import {
    DefaultTabbedTaskViewComponent
} from './group-navigation-component-resolver/default-components/default-tabbed-task-view/default-tabbed-task-view.component';
import {
    DefaultTabbedCaseViewComponent
} from './group-navigation-component-resolver/default-components/default-tabbed-case-view/default-tabbed-case-view.component';
import {
    DefaultTabViewComponent
} from './group-navigation-component-resolver/default-components/default-tab-view/default-tab-view.component';
import {SearchComponentModule} from '../search/search.module';
import {HeaderComponentModule} from '../header/header.module';
import {PanelComponentModule} from '../panel/panel.module';
import {TabsComponentModule} from '../tabs/tabs.module';
import {CaseViewComponentModule} from '../view/case-view/case-view.module';
import { NavigationDoubleDrawerComponent } from './navigation-double-drawer/navigation-double-drawer.component';


@NgModule({
    declarations: [
        NavigationDrawerComponent,
        NavigationRailComponent,
        NavigationTreeComponent,
        GroupNavigationComponentResolverComponent,
        DefaultSimpleTaskViewComponent,
        DefaultTabbedTaskViewComponent,
        DefaultTabbedCaseViewComponent,
        DefaultTabViewComponent,
        NavigationDoubleDrawerComponent
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
        ResizableModule,
        MatProgressSpinnerModule,
        SearchComponentModule,
        HeaderComponentModule,
        PanelComponentModule,
        TabsComponentModule,
        CaseViewComponentModule,
    ],
    exports: [
        NavigationDrawerComponent,
        NavigationRailComponent,
        NavigationTreeComponent,
        GroupNavigationComponentResolverComponent,
        DefaultSimpleTaskViewComponent,
        DefaultTabbedTaskViewComponent,
        DefaultTabbedCaseViewComponent,
        DefaultTabViewComponent
    ],
    providers: [
        { provide: NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT, useValue: GroupNavigationComponentResolverComponent },
        { provide: GroupNavigationComponentResolverService, useClass: DefaultGroupNavigationComponentResolverService }
    ]
})
export class NavigationComponentModule {
}
