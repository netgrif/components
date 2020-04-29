import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../models/abstract-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * Question modal dialog with its own layout (which asks the user a question and wait for the answer)
 * based on a material design that injected data and inherits from an [AbstractDialog]{@link AbstractDialog}.
 */
@Component({
    selector: 'nae-question-dialog-with-answer',
    templateUrl: './question-dialog-with-answer.component.html',
    styleUrls: ['./question-dialog-with-answer.component.scss']
})
export class QuestionDialogWithAnswerComponent extends AbstractDialog<QuestionDialogWithAnswerComponent> {
    /** Set submit button to disabled or enabled according to the user answer. */
    public disableButton = true;

    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    constructor(public dialogRef: MatDialogRef<QuestionDialogWithAnswerComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef, data);
    }

}
