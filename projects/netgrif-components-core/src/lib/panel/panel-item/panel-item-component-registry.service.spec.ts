import {Component, Injector} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {PanelItemComponentRegistryService} from './panel-item-component-registry.service';

describe('PanelItemComponentRegistryService', () => {
    let service: PanelItemComponentRegistryService;

    beforeEach(() => {
        service = new PanelItemComponentRegistryService();
    });

    it('should register and resolve a panel item component', () => {
        service.register('text', 'custom', injector => new ComponentPortal(TestPanelItemComponent, null, injector));

        expect(service.contains('text', 'custom')).toBeTrue();
        expect(service.get('text', 'custom', Injector.create({providers: []})).component).toBe(TestPanelItemComponent);
    });

    it('should keep renderers with the same component name separated by field type', () => {
        service.register('text', 'custom', injector => new ComponentPortal(TestPanelItemComponent, null, injector));

        expect(service.contains('number', 'custom')).toBeFalse();
        expect(service.get('number', 'custom', Injector.create({providers: []}))).toBeUndefined();
    });

    it('should keep ambiguous field type and component name combinations separated', () => {
        service.register('date-time', 'custom', injector => new ComponentPortal(TestPanelItemComponent, null, injector));
        service.register('date', 'time-custom', injector => new ComponentPortal(AlternativePanelItemComponent, null, injector));

        expect(service.get('date-time', 'custom', Injector.create({providers: []})).component)
            .toBe(TestPanelItemComponent);
        expect(service.get('date', 'time-custom', Injector.create({providers: []})).component)
            .toBe(AlternativePanelItemComponent);
    });

    it('should not replace an existing renderer when registering a default', () => {
        service.register('text', 'custom', injector => new ComponentPortal(TestPanelItemComponent, null, injector));

        const registered = service.registerIfAbsent('text', 'custom', injector =>
            new ComponentPortal(AlternativePanelItemComponent, null, injector));

        expect(registered).toBeFalse();
        expect(service.get('text', 'custom', Injector.create({providers: []})).component)
            .toBe(TestPanelItemComponent);
    });

    it('should register a default renderer when no renderer exists', () => {
        const registered = service.registerIfAbsent('text', 'custom', injector =>
            new ComponentPortal(TestPanelItemComponent, null, injector));

        expect(registered).toBeTrue();
        expect(service.contains('text', 'custom')).toBeTrue();
    });

    it('should register and resolve a field type default renderer', () => {
        service.registerDefault('enumeration', injector => new ComponentPortal(TestPanelItemComponent, null, injector));

        expect(service.getDefault('enumeration', Injector.create({providers: []})).component)
            .toBe(TestPanelItemComponent);
    });

    it('should not replace an existing field type default renderer', () => {
        service.registerDefault('enumeration', injector => new ComponentPortal(TestPanelItemComponent, null, injector));

        const registered = service.registerDefaultIfAbsent('enumeration', injector =>
            new ComponentPortal(AlternativePanelItemComponent, null, injector));

        expect(registered).toBeFalse();
        expect(service.getDefault('enumeration', Injector.create({providers: []})).component)
            .toBe(TestPanelItemComponent);
    });
});

@Component({
    selector: 'ncc-test-panel-item',
    template: ''
})
class TestPanelItemComponent {
}

@Component({
    selector: 'ncc-alternative-panel-item',
    template: ''
})
class AlternativePanelItemComponent {
}
