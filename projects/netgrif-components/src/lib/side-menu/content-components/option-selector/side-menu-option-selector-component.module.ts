import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionSelectorComponent} from './option-selector.component';
import {TranslateLibModule, MaterialModule, NAE_OPTION_SELECTOR_COMPONENT} from '@netgrif/application-engine';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule
    ],
    declarations: [
        OptionSelectorComponent
    ],
    exports: [
        OptionSelectorComponent
    ],
    entryComponents: [
        OptionSelectorComponent
    ],
    providers: [
        {provide: NAE_OPTION_SELECTOR_COMPONENT, useValue: OptionSelectorComponent}
    ]
})
export class SideMenuOptionSelectorComponentModule {
}
