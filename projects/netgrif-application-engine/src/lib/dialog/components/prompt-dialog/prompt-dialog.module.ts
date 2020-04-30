import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../material/material.module';
import {PromptDialogComponent} from './prompt-dialog.component';


@NgModule({
    declarations: [
        PromptDialogComponent
    ],
    exports: [
        PromptDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    entryComponents: [
        PromptDialogComponent
    ]
})
export class PromptDialogModule {
}
