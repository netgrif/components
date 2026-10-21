import {Injectable, Injector} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';

export type PanelItemComponentFactory = (injector: Injector) => ComponentPortal<any>;

@Injectable({
    providedIn: 'root'
})
export class PanelItemComponentRegistryService {

    private readonly registry = new Map<string, Map<string, PanelItemComponentFactory>>();
    private readonly defaultRegistry = new Map<string, PanelItemComponentFactory>();

    public register(fieldType: string, componentName: string, factory: PanelItemComponentFactory): void {
        this.getOrCreateFieldTypeRegistry(fieldType).set(componentName, factory);
    }

    public registerIfAbsent(fieldType: string, componentName: string, factory: PanelItemComponentFactory): boolean {
        if (this.contains(fieldType, componentName)) {
            return false;
        }
        this.register(fieldType, componentName, factory);
        return true;
    }

    public registerDefault(fieldType: string, factory: PanelItemComponentFactory): void {
        this.defaultRegistry.set(fieldType, factory);
    }

    public registerDefaultIfAbsent(fieldType: string, factory: PanelItemComponentFactory): boolean {
        if (this.defaultRegistry.has(fieldType)) {
            return false;
        }
        this.registerDefault(fieldType, factory);
        return true;
    }

    public contains(fieldType: string, componentName: string): boolean {
        return this.registry.get(fieldType)?.has(componentName) ?? false;
    }

    public get(fieldType: string, componentName: string, injector: Injector): ComponentPortal<any> | undefined {
        return this.registry.get(fieldType)?.get(componentName)?.(injector);
    }

    public getDefault(fieldType: string, injector: Injector): ComponentPortal<any> | undefined {
        return this.defaultRegistry.get(fieldType)?.(injector);
    }

    private getOrCreateFieldTypeRegistry(fieldType: string): Map<string, PanelItemComponentFactory> {
        let fieldTypeRegistry = this.registry.get(fieldType);
        if (!fieldTypeRegistry) {
            fieldTypeRegistry = new Map<string, PanelItemComponentFactory>();
            this.registry.set(fieldType, fieldTypeRegistry);
        }
        return fieldTypeRegistry;
    }
}
