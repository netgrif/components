import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export interface CodeSnippet {
    /** tab label, e.g. `Petriflow`, `TypeScript`, `HTML` */
    label: string;
    code: string;
}

/**
 * Code snippets in tabs with a copy button.
 */
@Component({
    selector: 'ne-code-block',
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class CodeBlockComponent {
    @Input() snippets: Array<CodeSnippet> = [];
    copiedIndex: number | undefined;

    onCopied(index: number): void {
        this.copiedIndex = index;
        setTimeout(() => this.copiedIndex = undefined, 1500);
    }
}
