import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        TranslateLibModule
    ],
    exports: [
        ToolbarComponent
    ]
})
export class ToolbarModule {
}
