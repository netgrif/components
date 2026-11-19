import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CovalentModule} from './covalent.module';
import {MarkdownComponent} from './markdown.component';

@Component({
    selector: 'ncc-test-markdown-wrapper',
    template: `
        <td-markdown id="input" [content]="text"></td-markdown>
        <td-markdown id="projected" ngPreserveWhitespaces>
            # Projected
            some *text*
        </td-markdown>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    text = '**bold**';
}

describe('MarkdownComponent', () => {
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CovalentModule],
            declarations: [TestWrapperComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        fixture.detectChanges();
    });

    it('should render the content input', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('#input .td-markdown');
        expect(el.innerHTML).toContain('<strong>bold</strong>');
    });

    it('should re-render when the content changes', () => {
        fixture.componentInstance.text = '_em_';
        fixture.detectChanges();
        const el: HTMLElement = fixture.nativeElement.querySelector('#input .td-markdown');
        expect(el.innerHTML).toContain('<em>em</em>');
    });

    it('should render dedented projected content', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('#projected .td-markdown');
        expect(el.querySelector('h1')?.textContent).toBe('Projected');
        expect(el.innerHTML).toContain('<em>text</em>');
    });

    it('should dedent text', () => {
        expect(MarkdownComponent.dedent('\n    a\n      b\n')).toBe('a\n  b');
    });
});
