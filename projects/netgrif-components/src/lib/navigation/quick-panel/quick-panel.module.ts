import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuickPanelComponent} from './components/quick-panel.component';
import {LogoutShortcutComponent} from './components/logout-shortcut/logout-shortcut.component';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {InternalLinkComponent} from './components/internal-link/internal-link.component';
import {RouterModule} from '@angular/router';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import { ImpersonateQuickPanelComponent } from './components/impersonate-quick-panel/impersonate-quick-panel.component';


@NgModule({
    declarations: [
        QuickPanelComponent,
        LogoutShortcutComponent,
        LanguageSelectorComponent,
        InternalLinkComponent,
        ImpersonateQuickPanelComponent
    ],
    exports: [
        QuickPanelComponent,
        LogoutShortcutComponent,
        LanguageSelectorComponent,
        InternalLinkComponent,
        ImpersonateQuickPanelComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class QuickPanelComponentModule {
}
