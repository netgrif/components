import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DialogService} from '@netgrif/components-core';
import {CodeSnippet} from '../../playground/code-block/code-block.component';

type DialogType = 'Alert' | 'Confirm' | 'Prompt';

@Component({
    selector: 'ne-dialog-demo',
    templateUrl: './dialog-demo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class DialogDemoComponent {
    readonly types: Array<DialogType> = ['Alert', 'Confirm', 'Prompt'];

    type: DialogType = 'Confirm';
    title = 'Delete case';
    content = 'Do you really want to delete the case?';
    negativeLabel = 'Cancel';
    positiveLabel = 'Delete';
    placeholder = 'Reason';
    panelClass = '';
    /** Material 3 density of the dialog (`ne-density-*` class on the overlay pane) */
    density = 0;
    readonly densities = [0, -1, -2, -3, -4, -5];
    result: string | undefined;

    constructor(private _dialog: DialogService) {
    }

    open(): void {
        const config = {panelClass: [this.panelClass, 'ne-density-' + -this.density].filter(c => !!c)};
        let ref;
        switch (this.type) {
            case 'Alert':
                ref = this._dialog.openAlertDialog(this.title, this.content, config);
                break;
            case 'Confirm':
                ref = this._dialog.openConfirmDialog(this.title, this.content, this.negativeLabel, this.positiveLabel, config);
                break;
            default:
                ref = this._dialog.openPromptDialog(this.title, this.content, this.placeholder, config);
        }
        this.result = undefined;
        ref.afterClosed().subscribe(result => this.result = JSON.stringify(result));
    }

    get snippets(): Array<CodeSnippet> {
        const config = this.panelClass ? `, {panelClass: '${this.panelClass}'}` : '';
        const args = this.type === 'Alert'
            ? `'${this.title}', '${this.content}'`
            : this.type === 'Confirm'
                ? `'${this.title}', '${this.content}', '${this.negativeLabel}', '${this.positiveLabel}'`
                : `'${this.title}', '${this.content}', '${this.placeholder}'`;
        return [{
            label: 'TypeScript',
            code: `import {DialogService} from '@netgrif/components-core';\n\n`
                + `constructor(private _dialog: DialogService) {}\n\n`
                + `this._dialog.open${this.type}Dialog(${args}${config})\n`
                + `    .afterClosed().subscribe(result => console.log(result));`,
        }];
    }
}
