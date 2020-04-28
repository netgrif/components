import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../models/abstract-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'nae-question-dialog-with-answer',
    templateUrl: './question-dialog-with-answer.component.html',
    styleUrls: ['./question-dialog-with-answer.component.scss']
})
export class QuestionDialogWithAnswerComponent extends AbstractDialog<QuestionDialogWithAnswerComponent> {

    public disableButton = true;

    constructor(public dialogRef: MatDialogRef<QuestionDialogWithAnswerComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef, data);
    }

}
