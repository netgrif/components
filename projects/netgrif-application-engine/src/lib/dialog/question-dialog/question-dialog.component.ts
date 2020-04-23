import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../abstract-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * Question modal dialog with its own layout (which asks the user a question with two answers - yes or no)
 * based on a material design that injected data and inherits from an [AbstractDialog]{@link AbstractDialog}.
 */
@Component({
    selector: 'nae-question-dialog',
    templateUrl: './question-dialog.component.html',
    styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent extends AbstractDialog<QuestionDialogComponent> {
    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef, data);
    }

}
