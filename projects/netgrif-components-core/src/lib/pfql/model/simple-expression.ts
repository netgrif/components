import {Category} from "../../search/models/category/category";
import {Operator} from "../../search/models/operator/operator";
import {QueryItemInterface} from "./query-item-interface";
import { QueryItemType } from "./query-item-type";

// todo 2466
export class SimpleExpression implements QueryItemInterface {
    protected _category: Category<any>
    protected _operator: Operator<any>
    protected _operandValue: any;

    public constructor(category: Category<any>, operator: Operator<any>, operandValue: any) {
        this._category = category;
        this._operator = operator;
        this._operandValue = operandValue;
    }

    public type(): QueryItemType {
        return QueryItemType.SIMPLE_EXPRESSION;
    }

    public get category(): Category<any> {
        return this._category;
    }

    public get operator(): Operator<any> {
        return this._operator;
    }

    public get operandValue(): any {
        return this._operandValue;
    }

    // todo 2466
    public negate(): void {
        // possible only if operator is: EQ, NEQ, GT, GTE, LT, LTE
        // throw if operator is: Substring, IN RANGE
        // throw if calculated operator is: NEQ null
    }
}
