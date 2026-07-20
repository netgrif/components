import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportNetComponent} from './import-net.component';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {FormsModule} from '@angular/forms';
import {CovalentModule, MaterialModule, NAE_IMPORT_NET_COMPONENT, TranslateLibModule} from '@netgrif/components-core';

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
    providers: [
        { provide: NAE_IMPORT_NET_COMPONENT, useValue: ImportNetComponent }
    ]
})
export class SideMenuImportNetComponentModule {
}
