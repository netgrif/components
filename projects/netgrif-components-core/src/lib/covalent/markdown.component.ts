import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild
} from '@angular/core';
import {marked} from 'marked';

/**
 * Drop-in replacement of `<td-markdown>` from `@covalent/markdown` (removed dependency), so templates of applications
 * keep working. Renders markdown with `marked`, the result goes through Angular's `[innerHTML]` sanitization.
 *
 * The markdown is taken from the `content` input, or from the projected text when `content` is not set:
 *
 * ```html
 * <td-markdown [content]="text"></td-markdown>
 * <td-markdown ngPreserveWhitespaces>
 *     # Title
 *     some *markdown*
 * </td-markdown>
 * ```
 *
 * As with `@covalent/markdown`, projected markdown needs `ngPreserveWhitespaces`, otherwise Angular collapses
 * the line breaks of the template text.
 *
 * New code can use the {@link MarkdownPipe} directly: `<div [innerHTML]="text | ncMarkdown"></div>`.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'td-markdown',
    template: `
        <div class="td-markdown markdown-body" [innerHTML]="html"></div>
        <div #projected hidden><ng-content></ng-content></div>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MarkdownComponent implements OnChanges, AfterViewInit {

    /** Markdown source, takes precedence over the projected content. */
    @Input() content: string;
    /** Single line breaks are rendered as `<br>` (GitHub flavoured line breaks). */
    @Input() simpleLineBreaks = false;
    /** Emitted after every render. */
    @Output() contentReady = new EventEmitter<void>();

    @ViewChild('projected', {static: true}) projected: ElementRef<HTMLElement>;

    /** Rendered HTML. */
    html = '';

    constructor(private readonly _changeDetector: ChangeDetectorRef) {
    }

    ngOnChanges(): void {
        this.render();
    }

    ngAfterViewInit(): void {
        if (this.content === undefined || this.content === null) {
            this.render();
            this._changeDetector.detectChanges();
        }
    }

    /**
     * Re-renders the markdown from `content`, or from the projected text.
     */
    render(): void {
        const source = this.content ?? MarkdownComponent.dedent(this.projected?.nativeElement?.textContent ?? '');
        this.html = source ? marked.parse(source, {breaks: this.simpleLineBreaks}) as string : '';
        this.contentReady.emit();
    }

    /**
     * Removes the indentation that projected template text inherits from the surrounding HTML.
     * @param text projected text
     */
    static dedent(text: string): string {
        const lines = text.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
        const indent = Math.min(...lines.filter(l => l.trim().length > 0).map(l => l.match(/^\s*/)[0].length));
        return lines.map(l => l.slice(Number.isFinite(indent) ? indent : 0)).join('\n');
    }
}
