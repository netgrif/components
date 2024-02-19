import {Injectable} from '@angular/core';
import {Validator} from "./model/validator";
import {FieldTypeResource} from "../task-content/model/field-type-resource";

@Injectable({
    providedIn: 'root'
})
export class ValidationRegistryService {

    private _registry: Map<FieldTypeResource, Map<string, Validator>>

    constructor() {
        this._registry = new Map<FieldTypeResource, Map<string, Validator>>();
    }

    get registry(): Map<FieldTypeResource, Map<string, Validator>> {
        return this._registry;
    }

    set registry(value: Map<FieldTypeResource, Map<string, Validator>>) {
        this._registry = value;
    }

    public register(type: FieldTypeResource, key: string, fn: Validator): void {
        if (!this._registry.has(type)) {
            this._registry.set(type, new Map<string, Validator>());
        }
        this._registry.get(type).set(key, fn);
    }

    public contains(type: FieldTypeResource, key: string): boolean {
        return this._registry.get(type).has(key);
    }

    public get(type: FieldTypeResource, key: string): Validator {
        if (this._registry.has(type) && this._registry.get(type).has(key)) {
            return this._registry.get(type).get(key);
        }
        return undefined;
    }

    public getAllForType(type: FieldTypeResource): Map<string, Validator> {
        if (this._registry.has(type)) {
            return this._registry.get(type);
        }
        return undefined;
    }
}
