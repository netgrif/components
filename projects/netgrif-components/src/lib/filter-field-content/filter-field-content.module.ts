import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFieldTabViewComponent } from './filter-field-tab-view/filter-field-tab-view.component';
import { FilterFieldTabbedCaseViewComponent } from './filter-field-tabbed-case-view/filter-field-tabbed-case-view.component';
import { TabsComponentModule } from '../tabs/tabs.module';
import { FlexModule } from '@angular/flex-layout';
import { MaterialModule } from '@netgrif/components-core';
import { SearchComponentModule } from '../search/search.module';
import { CaseViewComponentModule } from '../view/case-view/case-view.module';
import { HeaderComponentModule } from '../header/header.module';
import { FilterFieldTabbedTaskViewComponent } from './filter-field-tabbed-task-view/filter-field-tabbed-task-view.component';
import {PanelComponentModule} from "../panel/panel.module";

@NgModule({
    declarations: [
        FilterFieldTabViewComponent,
        FilterFieldTabbedCaseViewComponent,
        FilterFieldTabbedTaskViewComponent
    ],
    exports: [
        FilterFieldTabViewComponent,
        FilterFieldTabbedCaseViewComponent
    ],
    imports: [
        CommonModule,
        TabsComponentModule,
        MaterialModule,
        FlexModule,
        SearchComponentModule,
        CaseViewComponentModule,
        HeaderComponentModule,
        PanelComponentModule
    ]
})
export class FilterFieldContentModule { }
