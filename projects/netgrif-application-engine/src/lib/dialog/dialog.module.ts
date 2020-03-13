import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import {FormsModule} from "@angular/forms";
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { QuestionDialogWithAnswerComponent } from './question-dialog-with-answer/question-dialog-with-answer.component';

@NgModule({
    declarations: [QuestionDialogComponent, SimpleDialogComponent, QuestionDialogWithAnswerComponent],
    exports: [
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ]
})
export class DialogModule { }
