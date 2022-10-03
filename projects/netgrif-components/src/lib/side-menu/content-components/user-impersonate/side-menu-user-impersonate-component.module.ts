import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserImpersonateComponent} from './user-impersonate.component';
import {
    MaterialModule,
    NAE_USER_IMPERSONATE_COMPONENT,
    TranslateLibModule
} from '@netgrif/components-core';
import {CaseViewComponentModule} from '../../../view/case-view/case-view.module';
import {HeaderComponentModule} from '../../../header/header.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        CaseViewComponentModule,
        HeaderComponentModule,
    ],
    declarations: [UserImpersonateComponent],
    exports: [UserImpersonateComponent],
    providers: [
        { provide: NAE_USER_IMPERSONATE_COMPONENT, useValue: UserImpersonateComponent }
    ]
})
export class SideMenuUserImpersonateComponentModule {
}
