import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {QuestionDialogComponent} from '../question-dialog/question-dialog.component';
import {SimpleDialogComponent} from '../simple-dialog/simple-dialog.component';
import {QuestionDialogWithAnswerComponent} from '../question-dialog-with-answer/question-dialog-with-answer.component';

/** Color type of dialogue that relates only to simple dialogue. */
export enum DialogType {
    PRIMARY = 'primary',
    ACCENT = 'accent',
    WARNING = 'warn'
}

/**  Service to open own modal interacting dialog components based on Material Design via [MatDialog]{@link MatDialog} service. */
@Injectable({
    providedIn: 'root'
})
export class DialogService {
    /**
     * Only inject service.
     * @param dialog Service to open Material Design modal dialogs.
     */
    constructor(private dialog: MatDialog) {
    }

    /**
     * Open the simple modal dialog and show his content.
     * @param title Dialog title.
     * @param content Informs user about message.
     * @param type Dialog color type.
     * @param configMatDialog Extra configuration options.
     * @returns Reference to the newly-opened simple dialog.
     */
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

    /**
     * Open question model dialog with positive and negative answer button.
     * @param title Dialog title.
     * @param question Question forming the idea of the whole dialogue with the user.
     * @param negativeAnswer Negative answer label
     * @param positiveAnswer Positive answer label
     * @param configMatDialog Extra configuration options.
     * @returns Reference to the newly-opened question dialog.
     */
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

    /**
     * Open question model dialog with answer from user as message response.
     * @param title Dialog title.
     * @param question Question forming the idea of the whole dialogue with the user.
     * @param placeholder Label for answer input box.
     * @param configMatDialog Extra configuration options.
     * @returns Reference to the newly-opened question with answer dialog.
     */
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
