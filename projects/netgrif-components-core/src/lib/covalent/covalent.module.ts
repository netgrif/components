import {NgModule} from '@angular/core';
import {MarkdownPipe} from './markdown.pipe';
import {MarkdownComponent} from './markdown.component';

/**
 * Markdown rendering. `@covalent/markdown` was replaced by {@link MarkdownPipe} (`ncMarkdown`),
 * {@link MarkdownComponent} keeps the former `<td-markdown>` element working.
 */
@NgModule({
    declarations: [
        MarkdownPipe,
        MarkdownComponent
    ],
    exports: [
        MarkdownPipe,
        MarkdownComponent
    ]
})
export class CovalentModule {
}
