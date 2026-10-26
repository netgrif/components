import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import EasyMDE from 'easymde';
import * as marked from 'marked';
import {BuilderModeService} from '../../../services/builder-mode.service';

/**
 * Collapsible Markdown editor of design-time comments of process resources
 * (process, transition, place, arc, data field, data ref and role).
 */
@Component({
    selector: 'nc-builder-comment-editor',
    templateUrl: './comment-editor.component.html',
    standalone: true,
    styleUrls: ['./comment-editor.component.scss'],
    imports: [NgIf, MatIcon, TranslateModule]
})
export class CommentEditorComponent implements OnDestroy {

    @Output() commentChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() title = 'builder.comment.title';
    protected _comment = '';
    protected _readOnly: boolean;
    protected _expanded = false;
    protected _rendered = false;
    protected _easyMDE: EasyMDE;
    protected _settingValue = false;

    constructor(protected _builderModeService: BuilderModeService, protected _sanitizer: DomSanitizer) {
        this._readOnly = this._builderModeService.readOnly;
    }

    @Input()
    set comment(value: string | undefined) {
        this._comment = value ?? '';
        if (this._easyMDE && this._easyMDE.value() !== this._comment) {
            this._settingValue = true;
            this._easyMDE.value(this._comment);
            this._settingValue = false;
        }
    }

    get comment(): string {
        return this._comment;
    }

    @Input()
    set readOnly(value: boolean) {
        this._readOnly = value || this._builderModeService.readOnly;
    }

    get readOnly(): boolean {
        return this._readOnly;
    }

    @Input()
    set expanded(value: boolean) {
        this._expanded = value;
        this._rendered = this._rendered || value;
    }

    get expanded(): boolean {
        return this._expanded;
    }

    /**
     * Content is rendered on the first expansion and then only hidden,
     * so the editor keeps its state when the section is collapsed.
     */
    get rendered(): boolean {
        return this._rendered;
    }

    @ViewChild('editor')
    set editor(element: ElementRef | undefined) {
        if (element && !this._easyMDE) {
            this.createEditor(element.nativeElement);
        }
    }

    get hasComment(): boolean {
        return this._comment.trim().length > 0;
    }

    get renderedComment(): string {
        return this.render(this._comment);
    }

    toggle(): void {
        this.expanded = !this._expanded;
        if (this._expanded && this._easyMDE) {
            // CodeMirror has to recalculate its size after it was hidden
            setTimeout(() => this._easyMDE?.codemirror.refresh());
        }
    }

    ngOnDestroy(): void {
        if (this._easyMDE) {
            this._easyMDE.codemirror.off('change', this.onEditorChange);
            this._easyMDE.cleanup();
            this._easyMDE = undefined;
        }
    }

    protected createEditor(textarea: HTMLTextAreaElement): void {
        this._easyMDE = new EasyMDE({
            element: textarea,
            initialValue: this._comment,
            autoDownloadFontAwesome: true,
            minHeight: '120px',
            spellChecker: false,
            status: false,
            toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|', 'code', 'quote', 'unordered-list', 'ordered-list', '|',
                'link', 'table', '|', 'horizontal-rule', 'preview', '|', 'guide'],
            shortcuts: {
                toggleSideBySide: null,
                toggleFullScreen: null
            },
            previewRender: (text: string) => this.render(text)
        });
        this._easyMDE.codemirror.on('change', this.onEditorChange);
    }

    protected onEditorChange = (): void => {
        if (this._settingValue) {
            return;
        }
        this._comment = this._easyMDE.value();
        this.commentChange.emit(this._comment);
    };

    /**
     * Comments are Markdown only, raw HTML is escaped. Comments can come from imported models,
     * so the result is sanitized as well.
     */
    protected render(text: string): string {
        const html = marked.marked.parse(text ?? '', {sanitize: true}) as string;
        return this._sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
    }
}
