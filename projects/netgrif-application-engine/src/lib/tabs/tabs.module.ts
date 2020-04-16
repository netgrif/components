import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewComponent} from './tab-view/tab-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MaterialModule} from '../material/material.module';
import {TabCreationDetectorComponent} from './tab-creation-detector/tab-creation-detector.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    declarations: [
        TabViewComponent,
        TabCreationDetectorComponent,
    ],
    exports: [
        TabViewComponent,
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule,
        FlexLayoutModule,
    ]
})
export class TabsModule { }
