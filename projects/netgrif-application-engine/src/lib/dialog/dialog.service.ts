import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {QuestionDialogComponent} from './question-dialog/question-dialog.component';
import {SimpleDialogComponent} from './simple-dialog/simple-dialog.component';
import {QuestionDialogWithAnswerComponent} from './question-dialog-with-answer/question-dialog-with-answer.component';

export enum DialogType {
    PRIMARY = 'primary',
    ACCENT = 'accent',
    WARNING = 'warn'
}

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    openSimpleDialog(title: string, content: string, type = DialogType.PRIMARY, configMatDialog?: object) {
        return this.dialog.open(SimpleDialogComponent,
            Object.assign({
                data: {
                    title,
                    content,
                    type
                }
            }, configMatDialog)
        );
    }

    openQuestionDialog(title: string, question: string, negativeAnswer: string, positiveAnswer: string, configMatDialog?: object) {
        return this.dialog.open(QuestionDialogComponent,
            Object.assign({
                data: {
                    title,
                    content: question,
                    negativeAnswer,
                    positiveAnswer
                }
            }, configMatDialog)
        );
    }

    openQuestionWithAnswerDialog(title: string, question: string, placeholder: string, configMatDialog?: object) {
        return this.dialog.open(QuestionDialogWithAnswerComponent,
            Object.assign({
                data: {
                    title,
                    content: question,
                    placeholder
                }
            }, configMatDialog)
        );
    }
}
