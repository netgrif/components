import {Injectable, Injector} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class DashboardPortalComponentRegistryService {

    private registry: Map<string, (injector: Injector) => ComponentPortal<any>>;

    constructor() {
        this.registry = new Map<string, (injector: Injector) => ComponentPortal<any>>();
    }

    public register(component: string, factory: (injector: Injector) => ComponentPortal<any>): void {
        this.registry.set(component, factory);
    }

    public get(component: string, injector?: Injector): ComponentPortal<any> {
        if (!this.registry.has(component)) {
            return undefined
        }
        return this.registry.get(component)(injector);
    }
}
