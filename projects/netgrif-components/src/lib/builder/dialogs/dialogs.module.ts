import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@netgrif/components-core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {DialogArcEditComponent} from './dialog-arc-edit/dialog-arc-edit.component';
import {DialogChangeDataComponent} from './dialog-change-data/dialog-change-data.component';
import {DialogDeadNetComponent} from './dialog-dead-net/dialog-dead-net.component';
import {DialogDeleteComponent} from './dialog-delete/dialog-delete.component';
import {DialogDeleteModelComponent} from './dialog-delete-model/dialog-delete-model.component';
import {DialogErrorsComponent} from './dialog-errors/dialog-errors.component';
import {DialogLocalStorageModelComponent} from './dialog-local-storage-model/dialog-local-storage-model.component';
import {DialogManageRolesComponent} from './dialog-manage-roles/dialog-manage-roles.component';
import {DialogMarkingChangeComponent} from './dialog-marking-change/dialog-marking-change.component';
import {DialogModelEditComponent} from './dialog-model-edit/dialog-model-edit.component';
import {DialogPlaceEditComponent} from './dialog-place-edit/dialog-place-edit.component';
import {DialogPlaceRefDeleteComponent} from './dialog-place-ref-delete/dialog-place-ref-delete.component';
import {DialogRefactorComponent} from './dialog-refactor/dialog-refactor.component';
import {DialogTransitionEditComponent} from './dialog-transition-edit/dialog-transition-edit.component';
import {MaterialIconPickerComponent} from "../modeler/components/material-icon-picker/material-icon-picker.component";
import {TriggerTreeComponent} from "./dialog-transition-edit/trigger-tree/trigger-tree.component";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";

const DIALOG_COMPONENTS = [
    DialogArcEditComponent,
    DialogChangeDataComponent,
    DialogDeadNetComponent,
    DialogDeleteComponent,
    DialogDeleteModelComponent,
    DialogErrorsComponent,
    DialogLocalStorageModelComponent,
    DialogManageRolesComponent,
    DialogMarkingChangeComponent,
    DialogModelEditComponent,
    DialogPlaceEditComponent,
    DialogPlaceRefDeleteComponent,
    DialogRefactorComponent,
    DialogTransitionEditComponent,
    TriggerTreeComponent
];

@NgModule({
    declarations: DIALOG_COMPONENTS,
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        MaterialIconPickerComponent,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
    ],
})
export class BuilderDialogsModule {
}
