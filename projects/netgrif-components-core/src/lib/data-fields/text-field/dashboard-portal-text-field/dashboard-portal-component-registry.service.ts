import {Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class DashboardPortalComponentRegistryService {

    private registry: Map<string, () => ComponentPortal<any>>;

    constructor() {
        this.registry = new Map<string, () => ComponentPortal<any>>();
    }

    public register(component: string, factory: () => ComponentPortal<any>): void {
        this.registry.set(component, factory);
    }

    public get(component: string): ComponentPortal<any> {
        if (!this.registry.has(component)) {
            return undefined
        }
        return this.registry.get(component)();
    }
}
