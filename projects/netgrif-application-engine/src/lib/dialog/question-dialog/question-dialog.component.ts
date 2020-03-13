import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../abstract-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'nae-question-dialog',
    templateUrl: './question-dialog.component.html',
    styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent extends AbstractDialog<QuestionDialogComponent> {

    constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef, data);
    }

}
