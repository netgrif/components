import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule,
        FlexLayoutModule,
    ]
})
export class TabsModule { }
