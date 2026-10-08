import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    MaterialModule,
    NAE_PANEL_ITEM_DATA,
    PanelItemPortalData
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {EnumerationIconPanelItemComponent} from './enumeration-icon-panel-item.component';

describe('EnumerationIconPanelItemComponent', () => {
    let fixture: ComponentFixture<EnumerationIconPanelItemComponent>;
    let portalData: PanelItemPortalData;

    beforeEach(async () => {
        portalData = {
            featuredValue: {
                type: 'enumeration',
                icon: undefined,
                value: 'Approved',
                rawValue: {defaultValue: 'approved', translations: {}},
                component: {
                    name: 'icon',
                    optionIcons: [
                        {key: 'approved', type: 'material', value: 'check_circle'},
                        {key: 'rejected', type: 'material', value: 'cancel'}
                    ]
                }
            },
            textEllipsis: true
        } as PanelItemPortalData;

        await TestBed.configureTestingModule({
            imports: [MaterialModule, NoopAnimationsModule],
            declarations: [EnumerationIconPanelItemComponent],
            providers: [{
                provide: NAE_PANEL_ITEM_DATA,
                useFactory: () => portalData
            }]
        }).compileComponents();
    });

    function createComponent(): void {
        fixture = TestBed.createComponent(EnumerationIconPanelItemComponent);
        fixture.detectChanges();
    }

    it('should render the icon matching the raw enumeration key', () => {
        createComponent();

        const icon: HTMLElement = fixture.nativeElement.querySelector('mat-icon');

        expect(icon.textContent.trim()).toBe('check_circle');
        expect(fixture.nativeElement.textContent).toContain('Approved');
    });

    it('should render the matching SVG icon', () => {
        const iconRegistry = TestBed.inject(MatIconRegistry);
        const sanitizer = TestBed.inject(DomSanitizer);
        iconRegistry.addSvgIconLiteral('approved-status', sanitizer.bypassSecurityTrustHtml('<svg></svg>'));
        portalData.featuredValue.component.optionIcons = [
            {key: 'approved', type: 'svg', value: 'approved-status'}
        ];

        createComponent();

        const icon: HTMLElement = fixture.nativeElement.querySelector('mat-icon');
        expect(icon.getAttribute('data-mat-icon-name')).toBe('approved-status');
        expect(fixture.nativeElement.textContent).toContain('Approved');
    });

    it('should match an enumeration map icon by its string key', () => {
        portalData.featuredValue.type = 'enumeration_map';
        portalData.featuredValue.rawValue = 'approved';

        createComponent();

        const icon: HTMLElement = fixture.nativeElement.querySelector('mat-icon');
        expect(icon.textContent.trim()).toBe('check_circle');
        expect(fixture.nativeElement.textContent).toContain('Approved');
    });

    it('should render only the value when no icon matches the raw enumeration key', () => {
        portalData.featuredValue.rawValue = {defaultValue: 'unknown', translations: {}};

        createComponent();

        expect(fixture.nativeElement.querySelector('mat-icon')).toBeNull();
        expect(fixture.nativeElement.textContent.trim()).toBe('Approved');
    });

    it('should prevent the value from overflowing its cell', () => {
        createComponent();

        const value: HTMLElement = fixture.nativeElement.querySelector('.enumeration-icon-panel-item > span');
        const styles = getComputedStyle(value);

        expect(styles.minWidth).toBe('0px');
        expect(styles.overflow).toBe('hidden');
        expect(styles.textOverflow).toBe('ellipsis');
    });
});
