import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {Component, ComponentPrefixes} from '../../models/component';
import {Validation} from '../../models/validation';
import {UpdateOnStrategy, UpdateStrategy} from "../../models/update-strategy";
import {Observable, Subject} from 'rxjs';
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";
import {Injector} from "@angular/core";

export interface MultichoiceFieldValue {
    key: string;
    value: string;
}

export class MultichoiceField  extends DataField<Array<string>> {

    protected _updatedChoices: Subject<void>;

    constructor(stringId: string, title: string, values: Array<string>, private _choices: Array<MultichoiceFieldValue>,
                behavior: Behavior, placeholder?: string, description?: string, layout?: Layout,
                private readonly _fieldType = FieldTypeResource.MULTICHOICE, validations?: Array<Validation>,
                component?: Component, parentTaskId?: string, validationRegistry?: ValidationRegistryService, injector?: Injector,) {
        super(stringId, title, values, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, validationRegistry, injector);
        this._updatedChoices = new Subject<void>();
    }

    set choices(choices: Array<MultichoiceFieldValue>) {
        this._choices = choices;
    }

    get choices(): Array<MultichoiceFieldValue> {
        return this._choices;
    }

    get fieldType(): FieldTypeResource {
        return this._fieldType;
    }

    get updatedChoices(): Observable<void> {
        return this._updatedChoices.asObservable();
    }

    public updateChoice(): void {
        this._updatedChoices.next();
    }

    public getUpdateOnStrategy(): UpdateOnStrategy {
        return UpdateStrategy.CHANGE;
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.MULTICHOICE + this.getComponentType();
    }

    protected valueEquality(a: Array<string>, b: Array<string>): boolean {
        // we assume that multichoice options are always given in the same order
        return (!a && !b) || (
            !!a
            && !!b
            && a.length === b.length
            && a.every( (element, index) => element === b[index])
        );
    }
}
