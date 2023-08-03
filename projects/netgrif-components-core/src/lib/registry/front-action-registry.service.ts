import {Injectable} from '@angular/core';
import {FrontActionDefinition} from "../actions/model/front-action-definition";

@Injectable({
    providedIn: 'root'
})
export class FrontActionRegistryService {

    private _registry: Map<string, FrontActionDefinition>;

    constructor() {
        this._registry = new Map<string, FrontActionDefinition>();
    }

    get registry(): Map<string, FrontActionDefinition> {
        return this._registry;
    }

    set registry(value: Map<string, FrontActionDefinition>) {
        this._registry = value;
    }

    public register(key: string, fn: FrontActionDefinition): void {
        this._registry.set(key, fn);
    }

    public contains(key: string): boolean {
        return this._registry.has(key);
    }

    public get(key: string): FrontActionDefinition {
        if (this._registry.has(key)) {
            return this._registry.get(key);
        }
        return undefined;
    }
}
