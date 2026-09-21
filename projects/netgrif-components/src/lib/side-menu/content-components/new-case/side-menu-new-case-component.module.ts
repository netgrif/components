import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewCaseComponent} from './new-case.component';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {FormsModule} from '@angular/forms';
import {HotkeyModule} from 'angular2-hotkeys';
import {CovalentModule, MaterialModule, NAE_NEW_CASE_COMPONENT, SnackBarModule, TranslateLibModule} from '@netgrif/components-core';

@NgModule({
    declarations: [
        NewCaseComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        SnackBarModule,
        TranslateLibModule,
        HotkeyModule.forRoot()
    ],
    exports: [NewCaseComponent],
    providers: [
        { provide: NAE_NEW_CASE_COMPONENT, useValue: NewCaseComponent }
    ]
})
export class SideMenuNewCaseComponentModule {
}
