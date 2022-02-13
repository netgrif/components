import {Injectable} from '@angular/core';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {AlertDialogComponent} from '../components/alert-dialog/alert-dialog.component';
import {PromptDialogComponent} from '../components/prompt-dialog/prompt-dialog.component';
import {DialogData} from '../models/DialogData';
import {DialogResult} from '../models/DialogResult';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

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
     * Open the alert modal dialog and show his content.
     * Alert dialog should be used to show the user a crucial message.
     * @param title Dialog title.
     * @param content Informs user about message.
     * @param configMatDialog Extra configuration options.
     * @returns Reference to the newly-opened alert dialog. When dialog closes an empty object is returned.
     */
    public openAlertDialog(title: string, content: string,
                           configMatDialog?: MatDialogConfig<DialogData>): MatDialogRef<AlertDialogComponent, DialogResult> {
        return this.dialog.open<AlertDialogComponent, DialogData, DialogResult>(AlertDialogComponent,
            Object.assign({
                data: {
                    title,
                    content
                }
            }, configMatDialog)
        );
    }

    /**
     * Open question model dialog with positive and negative answer button.
     * @param title Dialog title.
     * @param question Question forming the idea of the whole dialogue with the user.
     * @param negativeChoiceLabel Negative answer label
     * @param positiveChoiceLabel Positive answer label
     * @param configMatDialog Extra configuration options.
     * @returns Reference to the newly-opened question dialog. When dialog is closed made choice is returned.
     */
    openConfirmDialog(title: string, question: string, negativeChoiceLabel: string, positiveChoiceLabel: string,
                      configMatDialog?: MatDialogConfig<DialogData>): MatDialogRef<ConfirmDialogComponent, DialogResult> {
        return this.dialog.open<ConfirmDialogComponent, DialogData, DialogResult>(ConfirmDialogComponent,
            Object.assign({
                data: {
                    title,
                    content: question,
                    negativeLabel: negativeChoiceLabel,
                    positiveLabel: positiveChoiceLabel
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
    openPromptDialog(title: string, question: string, placeholder: string, configMatDialog?: MatDialogConfig<DialogData>) {
        return this.dialog.open(PromptDialogComponent,
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
