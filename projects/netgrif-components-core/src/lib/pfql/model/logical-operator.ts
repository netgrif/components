import {QueryItemType} from "./query-item-type";
import {QueryItemInterface} from "./query-item-interface";

export enum LogicalOperatorEnum {
    AND,
    OR
}

// todo 2466
export class LogicalOperator implements QueryItemInterface {
    protected _value: LogicalOperatorEnum

    public constructor(value: LogicalOperatorEnum) {
        this._value = value;
    }

    public type(): QueryItemType {
        return QueryItemType.LOGICAL_OPERATOR;
    }

    public get value(): LogicalOperatorEnum {
        return this._value;
    }
}
