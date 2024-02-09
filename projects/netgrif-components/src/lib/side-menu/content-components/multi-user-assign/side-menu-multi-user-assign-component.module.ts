import {NgModule} from "@angular/core";
import {MultiUserAssignComponent} from "./multi-user-assign.component";
import {MultiUserAssignListComponent} from "./multi-user-assign-list/multi-user-assign-list.component";
import {
    MultiUserAssignItemComponent
} from "./multi-user-assign-list/multi-user-assign-item/multi-user-assign-item.component";
import {CommonModule} from "@angular/common";
import {
    CovalentModule,
    MaterialModule,
    NAE_USER_ASSIGN_COMPONENT,
    TranslateLibModule,
    UtilityModule
} from "@netgrif/components-core";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
    declarations: [
        MultiUserAssignComponent,
        MultiUserAssignListComponent,
        MultiUserAssignItemComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        TranslateLibModule,
        MatFormFieldModule,
        UtilityModule
    ],
    exports: [MultiUserAssignComponent, MultiUserAssignListComponent],
    providers: [
        { provide: NAE_USER_ASSIGN_COMPONENT, useValue: MultiUserAssignComponent },
    ]
})
export class SideMenuMultiUserAssignComponentModule {
}
