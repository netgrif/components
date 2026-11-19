import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CodeSnippet} from '../code-block/code-block.component';

/**
 * Page scaffold of a demo: header, live preview, configuration panel and code snippets.
 *
 * ```html
 * <ne-demo-page title="..." description="..." [api]="['TextField', 'nc-data-field-template']" [snippets]="snippets">
 *     <div demoPreview>...</div>
 *     <div demoState>...</div>      <!-- optional, below the preview -->
 *     <div demoConfig>...</div>
 * </ne-demo-page>
 * ```
 */
@Component({
    selector: 'ne-demo-page',
    templateUrl: './demo-page.component.html',
    styleUrls: ['./demo-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class DemoPageComponent {
    @Input() title: string;
    @Input() description: string;
    /** classes, selectors and services the demo is about */
    @Input() api: Array<string> = [];
    @Input() snippets: Array<CodeSnippet> = [];
    /** full width preview with the configuration below it (views) */
    @Input() stacked = false;
    /** fixed height of the preview content (views that fill their container), e.g. `640px` */
    @Input() previewHeight: string | undefined;
}
