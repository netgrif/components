import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelItemComponent } from './panel-item.component';
import {Component, Injector, NO_ERRORS_SCHEMA} from '@angular/core';
import {
    FeaturedValue,
    MaterialModule,
    PanelItemComponentRegistryService
} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {ComponentPortal, PortalModule} from '@angular/cdk/portal';
import {By} from '@angular/platform-browser';
import {FlexModule} from '@ngbracket/ngx-layout';
import {HtmlPanelItemComponent} from './html-panel-item/html-panel-item.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PanelItemComponent', () => {
    let component: PanelItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, MaterialModule, PortalModule, FlexModule, NoopAnimationsModule],
            declarations: [
                PanelItemComponent,
                TestWrapperComponent,
                TestPanelItemRendererComponent,
                HtmlPanelItemComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        fixture.detectChanges();
        component = fixture.debugElement.query(By.directive(PanelItemComponent)).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have featuredValue', () => {
        expect(component.featuredValue.value).toEqual('text');
    });

    it('should have label icon as leading', () => {
        expect(component.leadingIcon).toEqual('label');
    });

    it('should use the registered component renderer', () => {
        const registry = TestBed.inject(PanelItemComponentRegistryService);
        registry.register('text', 'custom', (injector: Injector) =>
            new ComponentPortal(TestPanelItemRendererComponent, null, injector));
        fixture.componentInstance.featuredValue = {
            type: 'text',
            icon: undefined,
            value: 'custom value',
            component: {name: 'custom'}
        };

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(TestPanelItemRendererComponent))).toBeTruthy();
    });

    it('should use the default renderer for an unknown component', () => {
        fixture.componentInstance.featuredValue = {
            type: 'text',
            icon: undefined,
            value: 'fallback value',
            component: {name: 'unknown'}
        };

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(TestPanelItemRendererComponent))).toBeFalsy();
        expect(fixture.nativeElement.textContent).toContain('fallback value');
    });

    it('should keep the HTML renderer visible inside a panel row', () => {
        const registry = TestBed.inject(PanelItemComponentRegistryService);
        registry.register('text', 'htmltextarea', (injector: Injector) =>
            new ComponentPortal(HtmlPanelItemComponent, null, injector));
        fixture.componentInstance.leadingIconEnabled = false;
        fixture.componentInstance.featuredValue = {
            type: 'text',
            icon: undefined,
            value: '<a href="https://duckduckgo.com">Duck Duck Go</a> · <mark>Approved</mark> · <span>✅</span>',
            component: {name: 'htmltextarea'}
        };

        fixture.detectChanges();

        const row: HTMLElement = fixture.nativeElement.querySelector('.test-panel-row');
        const content: HTMLElement = fixture.nativeElement.querySelector('.panel-html');
        const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('.panel-html a');
        const rowBounds = row.getBoundingClientRect();
        const contentBounds = content.getBoundingClientRect();

        expect(content.textContent.trim()).toBe('Duck Duck Go · Approved · ✅');
        expect(contentBounds.height).toBe(20);
        expect(contentBounds.top).toBeGreaterThanOrEqual(rowBounds.top);
        expect(contentBounds.bottom).toBeLessThanOrEqual(rowBounds.bottom);
        expect(anchor.getBoundingClientRect().height).toBeGreaterThan(0);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<div class="test-panel-row" style="display: flex; align-items: center; height: 53px">' +
        '<div style="flex: 1 1 0%; min-width: 0; width: 0">' +
        '<nc-panel-item [leadingIcon]="leadingIcon" [leadingIconEnabled]="leadingIconEnabled" ' +
        '[textEllipsis]="textEllipsis" [featuredValue]="featuredValue"></nc-panel-item>' +
        '</div></div>'
})
class TestWrapperComponent {
    leadingIcon = 'label';
    leadingIconEnabled = true;
    textEllipsis = true;
    featuredValue = {
        type: 'text',
        icon: 'label',
        value: 'text'
    } as FeaturedValue;
}

@Component({
    selector: 'nc-test-panel-item-renderer',
    template: 'custom renderer'
})
class TestPanelItemRendererComponent {
}
