import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
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
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class ConfirmDialogModule {
}
