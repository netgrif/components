import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminImpersonateComponent} from './admin-impersonate.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {
    CovalentModule,
    MaterialModule,
    NAE_ADMIN_IMPERSONATE_COMPONENT,
    TranslateLibModule
} from '@netgrif/components-core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AdminImpersonateListComponent} from './admin-impersonate-list/admin-impersonate-list.component';
import {
    AdminImpersonateItemComponent
} from './admin-impersonate-list/admin-impersonate-item/admin-impersonate-item.component';


@NgModule({
    declarations: [
        AdminImpersonateComponent,
        AdminImpersonateListComponent,
        AdminImpersonateItemComponent,
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
    exports: [AdminImpersonateComponent, AdminImpersonateListComponent],
    providers: [
        { provide: NAE_ADMIN_IMPERSONATE_COMPONENT, useValue: AdminImpersonateComponent },
    ]
})
export class SideMenuAdminImpersonateComponentModule {
}
