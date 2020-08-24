import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportNetComponent} from './import-net.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MaterialModule, CovalentModule, TranslateLibModule} from '@netgrif/application-engine';

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
    exports: [ImportNetComponent],
    entryComponents: [ImportNetComponent]
})
export class SideMenuImportNetModule {
}
