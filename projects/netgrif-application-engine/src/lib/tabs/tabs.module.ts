import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabGroupComponent} from './tab-group/tab-group.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MaterialModule} from '../material/material.module';
import {TabCreationDetectorComponent} from './tab-creation-detector/tab-creation-detector.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    declarations: [TabGroupComponent, TabCreationDetectorComponent],
    exports: [
        TabGroupComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule,
        FlexLayoutModule
    ]
})
export class TabsModule { }
