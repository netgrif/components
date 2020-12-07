import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../../models/abstract-dialog';
import {DialogResult} from '../../models/DialogResult';
import {DialogData} from '../../models/DialogData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 * Question modal dialog with its own layout (which asks the user a question and wait for the answer)
 * based on a material design that injected data and inherits from an [AbstractDialog]{@link AbstractDialog}.
 */
@Component({
    selector: 'nae-question-dialog-with-answer',
    templateUrl: './prompt-dialog.component.html',
    styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent extends AbstractDialog<PromptDialogComponent> {
    /** Set submit button to disabled or enabled according to the user answer. */
    public disableButton = true;
    public prompt: string;
    public submitClick: boolean;

    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    constructor(public dialogRef: MatDialogRef<PromptDialogComponent, DialogResult>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        super(dialogRef, data);
    }

    onClose(isSubmitted: boolean) {
        this.dialogRef.close(isSubmitted ? {
            prompt: this.prompt
        } : {});
    }

}
