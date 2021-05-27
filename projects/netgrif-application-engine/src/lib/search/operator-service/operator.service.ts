import {Injectable, Type} from '@angular/core';
import {Operator} from '../models/operator/operator';
import {Operators} from '../models/operator/operators';
import {OperatorResolverService} from './operator-resolver.service';

/**
 * Stores, provides and creates {@link Operator} implementations to be used in the project as singleton objects.
 * Passes reference to itself to all Operators it creates, so they can use it if they want to.
 */
@Injectable({
    providedIn: 'root'
})
export class OperatorService {

    private _operators: Map<Type<Operator<any>>, Operator<any>>;

    constructor(protected _operatorResolver: OperatorResolverService) {
        this._operators = new Map<Type<Operator<any>>, Operator<any>>();
    }

    public getOperator(operatorClass: Type<Operator<any>>): Operator<any> {
        this.createOperatorIfNotInMap(operatorClass);
        return this._operators.get(operatorClass);
    }

    public getFromMetadata(metadata: Operators | string): Operator<any> {
        return this.getOperator(this._operatorResolver.toClass(metadata));
    }

    private createOperatorIfNotInMap(operatorClass: Type<Operator<any>>): void {
        if (!this._operators.has(operatorClass)) {
            this._operators.set(operatorClass, new operatorClass(this));
        }
    }
}
