import { Injectable, Injector, Type } from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class DashboardPortalComponentRegistryService {

    private registry: Map<string, (injector: Injector) => ComponentPortal<any>>;
    private typeRegistry: Map<string, Type<any>>;

    constructor() {
        this.registry = new Map<string, (injector: Injector) => ComponentPortal<any>>();
        this.typeRegistry = new Map<string, Type<any>>();
    }

    public register(component: string, factory: (injector: Injector) => ComponentPortal<any>): void {
        this.registry.set(component, factory);
    }

    public registerType(key: string, type: Type<any>): void {
        this.typeRegistry.set(key, type);
    }

    public get(component: string, injector?: Injector): ComponentPortal<any> {
        if (!this.registry.has(component)) {
            return undefined
        }
        return this.registry.get(component)(injector);
    }

    public getType(key: string): Type<any> {
        if (!this.typeRegistry.has(key)) {
            return undefined
        }
        return this.typeRegistry.get(key);
    }
}
