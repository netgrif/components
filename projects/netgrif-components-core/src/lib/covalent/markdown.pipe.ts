import {Pipe, PipeTransform} from '@angular/core';
import {marked} from 'marked';

/**
 * Renders markdown to HTML, use with `[innerHTML]`. Replaces `<td-markdown>` from `@covalent/markdown`.
 *
 * The result is not trusted, Angular's `[innerHTML]` sanitization still applies (scripts, event handlers are stripped).
 *
 * ```html
 * <div [innerHTML]="text | ncMarkdown"></div>
 * ```
 */
@Pipe({
    name: 'ncMarkdown',
    standalone: false
})
export class MarkdownPipe implements PipeTransform {
    /**
     * @param value markdown source, `null` / `undefined` render as an empty string
     * @returns HTML string
     */
    transform(value: string | undefined | null): string {
        return value ? marked.parse(value) as string : '';
    }
}
