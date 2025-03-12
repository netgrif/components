import {Injectable} from '@angular/core';
import {ValidationActionDefinition} from './model/validation-action-definition';

@Injectable({
    providedIn: 'root'
})
export class ValidationRegistryService {

    protected _registry: Map<string, ValidationActionDefinition>;
    protected _translations: Map<string, string>;

    constructor() {
        this._registry = new Map<string, ValidationActionDefinition>();
        this._translations = new Map<string, string>();
    }

    get registry(): Map<string, ValidationActionDefinition> {
        return this._registry;
    }

    set registry(value: Map<string, ValidationActionDefinition>) {
        this._registry = value;
    }

    get translations(): Map<string, string> {
        return this._translations;
    }

    set translations(value: Map<string, string>) {
        this._translations = value;
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

    public registerTranslation(key: string, translation: string): void {
        this._translations.set(key, translation);
    }

    public containsTranslation(key: string): boolean {
        return this._translations.has(key);
    }

    public getTranslation(key: string): string {
        if (this._translations.has(key)) {
            return this._translations.get(key);
        }
        return undefined;
    }
}
