import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {QuickPanelModule} from './quick-panel/quick-panel.module';
import {UserModule} from '../user/user.module';
import {TranslateLibModule} from '../translate/translate-lib.module';
import 'hammerjs';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        QuickPanelModule,
        UserModule,
        TranslateLibModule
    ],
    exports: [
    ]
})
export class NavigationModule {
}
