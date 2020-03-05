import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabGroupComponent} from './tab-group/tab-group.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MaterialModule} from "../material/material.module";
import { TabCreationDetectorComponent } from './tab-creation-detector/tab-creation-detector.component';


@NgModule({
    declarations: [TabGroupComponent, TabCreationDetectorComponent],
    exports: [
        TabGroupComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule
    ]
})
export class TabsModule { }

export const NAE_TAB_DATA = new InjectionToken<object>('NaeTabData');
