import {Component, Injector} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {PanelItemComponentRegistryService} from '@netgrif/components-core';
import {PanelComponentModule} from './panel.module';
import {MarkdownPanelItemComponent} from './panel-item/markdown-panel-item/markdown-panel-item.component';
import {HtmlPanelItemComponent} from './panel-item/html-panel-item/html-panel-item.component';
import {
    EnumerationIconPanelItemComponent
} from './panel-item/enumeration-icon-panel-item/enumeration-icon-panel-item.component';

describe('PanelComponentModule', () => {
    let registry: PanelItemComponentRegistryService;
    let injector: Injector;

    beforeEach(() => {
        registry = new PanelItemComponentRegistryService();
        injector = Injector.create({providers: []});
    });

    it('should register the built-in panel item renderers', () => {
        new PanelComponentModule(registry);

        expect(registry.get('text', 'richtextarea', injector).component).toBe(MarkdownPanelItemComponent);
        expect(registry.get('text', 'htmltextarea', injector).component).toBe(HtmlPanelItemComponent);
        expect(registry.get('enumeration', 'icon', injector).component).toBe(EnumerationIconPanelItemComponent);
        expect(registry.get('enumeration_map', 'icon', injector).component).toBe(EnumerationIconPanelItemComponent);
    });

    it('should preserve a custom renderer during repeated module initialization', () => {
        registry.register('text', 'richtextarea', portalInjector =>
            new ComponentPortal(CustomPanelItemComponent, null, portalInjector));

        new PanelComponentModule(registry);
        new PanelComponentModule(registry);

        expect(registry.get('text', 'richtextarea', injector).component).toBe(CustomPanelItemComponent);
        expect(registry.get('text', 'htmltextarea', injector).component).toBe(HtmlPanelItemComponent);
        expect(registry.get('enumeration', 'icon', injector).component).toBe(EnumerationIconPanelItemComponent);
        expect(registry.get('enumeration_map', 'icon', injector).component).toBe(EnumerationIconPanelItemComponent);
    });

    it('should keep ambiguous field type and component name combinations separated', () => {
        registry.register('date-time', 'custom', portalInjector =>
            new ComponentPortal(CustomPanelItemComponent, null, portalInjector));
        registry.register('date', 'time-custom', portalInjector =>
            new ComponentPortal(AlternativePanelItemComponent, null, portalInjector));

        expect(registry.get('date-time', 'custom', injector).component).toBe(CustomPanelItemComponent);
        expect(registry.get('date', 'time-custom', injector).component).toBe(AlternativePanelItemComponent);
    });
});

@Component({
    selector: 'nc-custom-panel-item',
    template: ''
})
class CustomPanelItemComponent {
}

@Component({
    selector: 'nc-alternative-panel-item',
    template: ''
})
class AlternativePanelItemComponent {
}
