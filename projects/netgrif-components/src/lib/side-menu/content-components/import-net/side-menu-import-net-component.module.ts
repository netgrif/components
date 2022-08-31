import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportNetComponent} from './import-net.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {CovalentModule, MaterialModule, TranslateLibModule} from '@netgrif/components-core';

@NgModule({
    declarations: [
        ImportNetComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        TranslateLibModule
    ],
    exports: [ImportNetComponent]
})
export class SideMenuImportNetComponentModule {
}
