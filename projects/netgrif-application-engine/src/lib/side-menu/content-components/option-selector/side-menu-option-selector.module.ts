import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionSelectorComponent} from './option-selector.component';
import {MaterialModule} from '../../../material/material.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule
    ],
    declarations: [
        OptionSelectorComponent
    ],
    exports: [
        OptionSelectorComponent
    ],
    entryComponents: [
        OptionSelectorComponent
    ]
})
export class SideMenuOptionSelectorModule {
}
