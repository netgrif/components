import {Injectable} from '@angular/core';
import {ValidatorFn} from "@angular/forms";
import {Validator} from "../model/validator";

@Injectable({
    providedIn: 'root'
})
export class ValidationRegistryService {

    private _registry: Map<string, Validator>

    constructor() {
        this._registry = new Map<string, Validator>();
    }

    get registry(): Map<string, Validator> {
        return this._registry;
    }

    set registry(value: Map<string, Validator>) {
        this._registry = value;
    }

    public register(key: string, fn: Validator): void {
        this._registry.set(key, fn);
    }

    public contains(key: string): boolean {
        return this._registry.has(key);
    }

    public get(key: string): Validator {
        if (this._registry.has(key)) {
            return this._registry.get(key);
        }
        return undefined;
    }
}
