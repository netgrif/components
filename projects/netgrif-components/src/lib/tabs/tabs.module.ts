import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewComponent} from './tab-view/tab-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TabCreationDetectorComponent} from './tab-creation-detector/tab-creation-detector.component';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';


@NgModule({
    declarations: [
        TabViewComponent,
        TabCreationDetectorComponent,
    ],
    exports: [
        TabViewComponent,
        TabCreationDetectorComponent,
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule,
        FlexLayoutModule,
        TranslateLibModule,
    ]
})
export class TabsComponentModule {
}
