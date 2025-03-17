import {Component, Inject} from '@angular/core';
import {AbstractDialogComponent} from '../../models/abstract-dialog.component';
import {DialogResult} from '../../models/DialogResult';
import {DialogData} from '../../models/DialogData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 * Question modal dialog with its own layout (which asks the user a question and wait for the answer)
 * based on a material design that injected data and inherits from an [AbstractDialog]{@link AbstractDialogComponent}.
 */
@Component({
    selector: 'ncc-question-dialog-with-answer',
    templateUrl: './prompt-dialog.component.html',
    styleUrls: ['./prompt-dialog.component.scss'],
    standalone: false
})
export class PromptDialogComponent extends AbstractDialogComponent<PromptDialogComponent> {
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
