import {Injectable} from '@angular/core';
import {ValidationActionDefinition} from './model/validation-action-definition';

@Injectable({
    providedIn: 'root'
})
export class ValidationRegistryService {

    protected _registry: Map<string, ValidationActionDefinition>;

    constructor() {
        this._registry = new Map<string, ValidationActionDefinition>();
    }

    get registry(): Map<string, ValidationActionDefinition> {
        return this._registry;
    }

    set registry(value: Map<string, ValidationActionDefinition>) {
        this._registry = value;
    }

    public register(key: string, fn: ValidationActionDefinition): void {
        this._registry.set(key, fn);
    }

    public contains(key: string): boolean {
        return this._registry.has(key);
    }

    public get(key: string): ValidationActionDefinition {
        if (this._registry.has(key)) {
            return this._registry.get(key);
        }
        return undefined;
    }
}
