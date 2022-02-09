import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../../models/abstract-dialog';
import {DialogResult} from '../../models/DialogResult';
import {DialogData} from '../../models/DialogData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * Question modal dialog with its own layout (which asks the user a question with two answers - yes or no)
 * based on a material design that injected data and inherits from an [AbstractDialog]{@link AbstractDialog}.
 */
@Component({
    selector: 'nae-question-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends AbstractDialog<ConfirmDialogComponent> {

    public choice: boolean;
    public parsedContent: SafeHtml;

    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     * @param sanitizer sanitize HTML
     */
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent, DialogResult>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData, private sanitizer: DomSanitizer) {
        super(dialogRef, data);
        this.choice = false;
        if (data && data.content) {
            this.parsedContent = sanitizer.bypassSecurityTrustHtml(data.content.replace('\\n', '<br>'));
        } else {
            this.parsedContent = sanitizer.bypassSecurityTrustHtml('');
        }
    }

    public onClose(isSubmitted: boolean) {
        this.dialogRef.close({
            confirmed: isSubmitted
        });
    }

}
