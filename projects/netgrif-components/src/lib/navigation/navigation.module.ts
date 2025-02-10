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
    UtilityModule,
    NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT,
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
} from './group-navigation-component-resolver/default-components/simple-views/default-simple-task-view/default-simple-task-view.component';
import {
    DefaultTabbedTaskViewComponent
} from './group-navigation-component-resolver/default-components/tabbed/default-tabbed-task-view/default-tabbed-task-view.component';
import {
    DefaultTabbedCaseViewComponent
} from './group-navigation-component-resolver/default-components/tabbed/default-tabbed-case-view/default-tabbed-case-view.component';
import {
    DefaultTabViewComponent
} from './group-navigation-component-resolver/default-components/tabbed/default-tab-view/default-tab-view.component';
import {SearchComponentModule} from '../search/search.module';
import {HeaderComponentModule} from '../header/header.module';
import {PanelComponentModule} from '../panel/panel.module';
import {TabsComponentModule} from '../tabs/tabs.module';
import {CaseViewComponentModule} from '../view/case-view/case-view.module';
import { NavigationDoubleDrawerComponent } from './navigation-double-drawer/navigation-double-drawer.component';
import { MatDividerModule } from '@angular/material/divider';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DefaultTaskViewComponent } from './group-navigation-component-resolver/default-components/refs/default-task-view/default-task-view.component';
import { DefaultCaseRefListViewComponent } from './group-navigation-component-resolver/default-components/refs/default-case-ref-list-view/default-case-ref-list-view.component';
import { DefaultNoFilterProvidedComponent } from './group-navigation-component-resolver/default-components/default-no-filter-provided/default-no-filter-provided.component';
import { DefaultPublicResolverComponent } from './group-navigation-component-resolver/default-components/public/default-public-resolver/default-public-resolver.component';
import {TranslateModule} from "@ngx-translate/core";
import { DefaultPublicSingleTaskViewComponent } from './group-navigation-component-resolver/default-components/public/default-public-single-task-view/default-public-single-task-view.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { DefaultPublicTaskViewComponent } from './group-navigation-component-resolver/default-components/public/default-public-task-view/default-public-task-view.component';
import { DefaultPublicWorkflowViewComponent } from './group-navigation-component-resolver/default-components/public/default-public-workflow-view/default-public-workflow-view.component';
import { DefaultTabbedSingleTaskViewComponent } from './group-navigation-component-resolver/default-components/tabbed/default-tabbed-single-task-view/default-tabbed-single-task-view.component';
import { DefaultSingleTaskViewComponent } from './group-navigation-component-resolver/default-components/simple-views/default-single-task-view/default-single-task-view.component';


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
        NavigationDoubleDrawerComponent,
        BreadcrumbsComponent,
        DefaultTaskViewComponent,
        DefaultCaseRefListViewComponent,
        BreadcrumbsComponent,
        DefaultNoFilterProvidedComponent,
        DefaultPublicResolverComponent,
        DefaultPublicSingleTaskViewComponent,
        DefaultPublicTaskViewComponent,
        DefaultPublicWorkflowViewComponent,
        DefaultTabbedSingleTaskViewComponent,
        DefaultSingleTaskViewComponent
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
        MatDividerModule,
        UtilityModule,
        TranslateModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
    ],
    exports: [
        NavigationDrawerComponent,
        NavigationDoubleDrawerComponent,
        NavigationRailComponent,
        NavigationTreeComponent,
        GroupNavigationComponentResolverComponent,
        DefaultSimpleTaskViewComponent,
        DefaultTabbedTaskViewComponent,
        DefaultTabbedCaseViewComponent,
        DefaultTabViewComponent,
        BreadcrumbsComponent,
        DefaultPublicResolverComponent,
        DefaultPublicSingleTaskViewComponent,
        DefaultPublicTaskViewComponent,
        DefaultPublicWorkflowViewComponent,
        DefaultTabbedSingleTaskViewComponent
    ],
    providers: [
        { provide: NAE_GROUP_NAVIGATION_COMPONENT_RESOLVER_COMPONENT, useValue: GroupNavigationComponentResolverComponent },
        { provide: GroupNavigationComponentResolverService, useClass: DefaultGroupNavigationComponentResolverService }
    ]
})
export class NavigationComponentModule {
}
