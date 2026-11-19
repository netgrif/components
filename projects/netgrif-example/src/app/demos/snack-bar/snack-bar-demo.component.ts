import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '@netgrif/components-core';
import {CodeSnippet} from '../../playground/code-block/code-block.component';

type SnackBarType = 'Success' | 'Warning' | 'Error' | 'Generic';

@Component({
    selector: 'ne-snack-bar-demo',
    templateUrl: './snack-bar-demo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class SnackBarDemoComponent {
    readonly types: Array<SnackBarType> = ['Success', 'Warning', 'Error', 'Generic'];
    readonly vertical: Array<string> = Object.values(SnackBarVerticalPosition);
    readonly horizontal: Array<string> = Object.values(SnackBarHorizontalPosition);

    type: SnackBarType = 'Success';
    message = 'Case was created';
    duration = 3;
    verticalPosition: string = SnackBarVerticalPosition.BOTTOM;
    horizontalPosition: string = SnackBarHorizontalPosition.CENTER;

    constructor(private _snackBar: SnackBarService) {
    }

    get hasDuration(): boolean {
        // error snack bar has to be acknowledged, it has no duration argument
        return this.type !== 'Error';
    }

    open(): void {
        const v = this.verticalPosition as SnackBarVerticalPosition;
        const h = this.horizontalPosition as SnackBarHorizontalPosition;
        switch (this.type) {
            case 'Success':
                this._snackBar.openSuccessSnackBar(this.message, v, h, this.duration);
                break;
            case 'Warning':
                this._snackBar.openWarningSnackBar(this.message, v, h, this.duration);
                break;
            case 'Error':
                this._snackBar.openErrorSnackBar(this.message, v, h);
                break;
            default:
                this._snackBar.openGenericSnackBar(this.message, 'info', v, h, this.duration);
        }
    }

    get snippets(): Array<CodeSnippet> {
        const v = `SnackBarVerticalPosition.${this.verticalPosition.toUpperCase()}`;
        const h = `SnackBarHorizontalPosition.${this.horizontalPosition.toUpperCase()}`;
        const icon = this.type === 'Generic' ? `'info', ` : '';
        const duration = this.type === 'Error' ? '' : `, ${this.duration}`;
        return [{
            label: 'TypeScript',
            code: `import {SnackBarService, SnackBarHorizontalPosition, SnackBarVerticalPosition} from '@netgrif/components-core';\n\n`
                + `constructor(private _snackBar: SnackBarService) {}\n\n`
                + `this._snackBar.open${this.type}SnackBar('${this.message}', ${icon}${v}, ${h}${duration});\n\n`
                + `// default position of all snack bars of the application\n`
                + `providers: [\n`
                + `    {provide: NAE_SNACKBAR_VERTICAL_POSITION, useValue: ${v}},\n`
                + `    {provide: NAE_SNACKBAR_HORIZONTAL_POSITION, useValue: ${h}},\n`
                + `]`,
        }];
    }
}
