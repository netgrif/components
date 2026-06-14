import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';

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
export class ToolbarComponentModule {
}
