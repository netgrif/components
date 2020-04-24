import {Injectable, Type} from '@angular/core';
import {Operator} from '../models/operator/operator';

@Injectable({
    providedIn: 'root'
})
export class OperatorService {

    private _operators: Map<Type<Operator>, Operator>;

    constructor() {
        this._operators = new Map<Type<Operator>, Operator>();
    }

    public getOperator(operatorClass: Type<Operator>): Operator {
        this.createOperatorIfNotInMap(operatorClass);
        return this._operators.get(operatorClass);
    }

    private createOperatorIfNotInMap(operatorClass: Type<Operator>): void {
        if (!this._operators.has(operatorClass)) {
            this._operators.set(operatorClass, new operatorClass());
        }
    }
}
