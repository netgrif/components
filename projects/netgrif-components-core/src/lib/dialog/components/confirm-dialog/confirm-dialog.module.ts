import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MaterialModule} from '../../../material/material.module';
import {ConfirmDialogComponent} from './confirm-dialog.component';


@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    exports: [
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ]
})
export class ConfirmDialogModule {
}
