import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {PanelModule} from '../../panel/panel.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        PanelModule,
        TranslateLibModule
    ]
})
export class CaseViewModule {
}
