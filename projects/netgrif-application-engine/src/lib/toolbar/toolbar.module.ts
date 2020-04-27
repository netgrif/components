import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        TranslateLibModule
    ],
    exports: [
        ToolbarComponent,
        FlexLayoutModule
    ]
})
export class ToolbarModule {
}
