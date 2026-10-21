import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MarkdownPanelItemComponent} from './markdown-panel-item.component';
import {
    CovalentModule,
    MaterialModule,
    NAE_PANEL_ITEM_DATA,
    PanelItemPortalData
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('MarkdownPanelItemComponent', () => {
    let fixture: ComponentFixture<MarkdownPanelItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CovalentModule, MaterialModule, NoopAnimationsModule],
            declarations: [MarkdownPanelItemComponent],
            providers: [{
                provide: NAE_PANEL_ITEM_DATA,
                useValue: {
                    featuredValue: {
                        type: 'text',
                        icon: undefined,
                        value: '**Open** [Duck Duck Go](https://duckduckgo.com).',
                        component: {name: 'richtextarea'}
                    },
                    textEllipsis: true
                } as PanelItemPortalData
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(MarkdownPanelItemComponent);
        fixture.detectChanges();
    });

    it('should render a markdown link', () => {
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');

        expect(anchor).toBeTruthy();
        expect(anchor.textContent).toBe('Duck Duck Go');
        expect(anchor.href).toBe('https://duckduckgo.com/');
        expect(anchor.target).toBe('_blank');
        expect(anchor.rel).toBe('noopener noreferrer');
        expect(fixture.componentInstance.tooltipText).toBe('Open Duck Duck Go.');
    });

    it('should isolate link clicks from the case panel', () => {
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        const event = new MouseEvent('click', {bubbles: true, cancelable: true});
        const stopPropagation = spyOn(event, 'stopPropagation');
        anchor.addEventListener('click', clickEvent => clickEvent.preventDefault());

        anchor.dispatchEvent(event);

        expect(stopPropagation).toHaveBeenCalled();
    });
});
