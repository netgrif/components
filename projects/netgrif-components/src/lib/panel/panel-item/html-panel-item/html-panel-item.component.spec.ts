import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HtmlPanelItemComponent} from './html-panel-item.component';
import {
    MaterialModule,
    NAE_PANEL_ITEM_DATA,
    PanelItemPortalData
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {MatTooltip} from '@angular/material/tooltip';

describe('HtmlPanelItemComponent', () => {
    let fixture: ComponentFixture<HtmlPanelItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule, NoopAnimationsModule],
            declarations: [HtmlPanelItemComponent],
            providers: [{
                provide: NAE_PANEL_ITEM_DATA,
                useValue: {
                    featuredValue: {
                        type: 'text',
                        icon: undefined,
                        value: '<p><br></p><p><a href="https://duckduckgo.com" rel="nofollow">Duck Duck Go</a> · ' +
                            '<mark>Approved</mark></p><script>window.alert("unsafe")</script>',
                        component: {name: 'htmltextarea'}
                    },
                    textEllipsis: true
                } as PanelItemPortalData
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(HtmlPanelItemComponent);
        fixture.detectChanges();
    });

    it('should render sanitized HTML elements', () => {
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        const badge: HTMLElement = fixture.nativeElement.querySelector('mark');

        expect(anchor.textContent).toBe('Duck Duck Go');
        expect(badge.textContent).toBe('Approved');
        expect(anchor.target).toBe('_blank');
        expect(anchor.rel).toBe('nofollow noopener noreferrer');
        expect(fixture.nativeElement.querySelector('script')).toBeNull();
        expect(fixture.debugElement.query(By.directive(MatTooltip))).toBeNull();
    });

    it('should isolate link clicks from the case panel', () => {
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        const event = new MouseEvent('click', {bubbles: true, cancelable: true});
        const stopPropagation = spyOn(event, 'stopPropagation');
        anchor.addEventListener('click', clickEvent => clickEvent.preventDefault());

        anchor.dispatchEvent(event);

        expect(stopPropagation).toHaveBeenCalled();
    });

    it('should constrain rendered content to one clipped line in ellipsis mode', () => {
        const content: HTMLElement = fixture.nativeElement.querySelector('.panel-text');
        const paragraph: HTMLElement = fixture.nativeElement.querySelector('p');
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        const host: HTMLElement = fixture.nativeElement;
        const styles = getComputedStyle(content);
        const paragraphStyles = getComputedStyle(paragraph);
        const hostBounds = host.getBoundingClientRect();
        const contentBounds = content.getBoundingClientRect();
        const anchorBounds = anchor.getBoundingClientRect();

        expect(hostBounds.height).toBe(24);
        expect(styles.maxWidth).toBe('100%');
        expect(styles.height).toBe('20px');
        expect(styles.maxHeight).toBe('20px');
        expect(styles.lineHeight).toBe('20px');
        expect(styles.overflow).toBe('hidden');
        expect(paragraphStyles.display).toBe('inline');
        expect(paragraphStyles.marginTop).toBe('0px');
        expect(paragraphStyles.marginBottom).toBe('0px');
        expect(anchorBounds.height).toBeGreaterThan(0);
        expect(anchorBounds.top).toBeGreaterThanOrEqual(contentBounds.top);
        expect(anchorBounds.bottom).toBeLessThanOrEqual(contentBounds.bottom);
    });
});
