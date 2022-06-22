import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionSelectorComponent} from './option-selector.component';
import {MaterialModule, NAE_OPTION_SELECTOR_COMPONENT, TranslateLibModule} from '@netgrif/components-core';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        MatFormFieldModule
    ],
    declarations: [
        OptionSelectorComponent
    ],
    exports: [
        OptionSelectorComponent
    ],
    providers: [
        { provide: NAE_OPTION_SELECTOR_COMPONENT, useValue: OptionSelectorComponent }
    ]
})
export class SideMenuOptionSelectorComponentModule {
}
