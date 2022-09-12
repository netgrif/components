import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserImpersonateComponent} from './user-impersonate.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {CovalentModule, MaterialModule, TranslateLibModule, NAE_USER_IMPERSONATE_COMPONENT} from '@netgrif/components-core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UserImpersonateListComponent} from './user-impersonate-list/user-impersonate-list.component';
import {UserImpersonateItemComponent} from './user-impersonate-list/user-impersonate-item/user-impersonate-item.component';


@NgModule({
    declarations: [
        UserImpersonateComponent,
        UserImpersonateItemComponent,
        UserImpersonateListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        TranslateLibModule,
        MatFormFieldModule
    ],
    exports: [UserImpersonateComponent],
    providers: [
        { provide: NAE_USER_IMPERSONATE_COMPONENT, useValue: UserImpersonateComponent },
    ]
})
export class SideMenuUserImpersonateComponentModule {
}
