import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import {FormsModule} from '@angular/forms';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { QuestionDialogWithAnswerComponent } from './question-dialog-with-answer/question-dialog-with-answer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';

@NgModule({
    declarations: [
        SimpleDialogComponent,
        QuestionDialogComponent,
        QuestionDialogWithAnswerComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ]
})
export class DialogModule { }
