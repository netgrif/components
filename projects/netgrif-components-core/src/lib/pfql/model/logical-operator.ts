import {QueryItemType} from "./query-item-type";
import {QueryItemInterface} from "./query-item-interface";
import {BooleanOperator} from "../../search/models/boolean-operator";

// todo 2466
export class LogicalOperator implements QueryItemInterface {
    protected _value: BooleanOperator

    public constructor(value: BooleanOperator) {
        this._value = value;
    }

    public type(): QueryItemType {
        return QueryItemType.LOGICAL_OPERATOR;
    }

    public get value(): BooleanOperator {
        return this._value;
    }
}
