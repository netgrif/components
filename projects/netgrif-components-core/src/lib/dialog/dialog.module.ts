import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {AlertDialogModule} from './components/alert-dialog/alert-dialog.module';
import {ConfirmDialogModule} from './components/confirm-dialog/confirm-dialog.module';
import {PromptDialogModule} from './components/prompt-dialog/prompt-dialog.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        AlertDialogModule,
        ConfirmDialogModule,
        PromptDialogModule
    ],
    exports: [
        AlertDialogModule,
        ConfirmDialogModule,
        PromptDialogModule
    ]
})
export class DialogModule {
}
