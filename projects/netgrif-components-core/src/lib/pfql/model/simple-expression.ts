import {Category} from "../../search/models/category/category";
import {Operator} from "../../search/models/operator/operator";
import {QueryItemInterface} from "./query-item-interface";
import { QueryItemType } from "./query-item-type";

/**
 * Represents a simple PFQL expression consisting of a category, operator, operand value, and negation flag.
 * A simple expression is a basic building block of PFQL queries that combines a search category with an operator
 * and a value to create a single query condition. The expression can also be negated to invert its meaning.
 */
export class SimpleExpression implements QueryItemInterface {
    protected _category: Category<any>
    protected _operator: Operator<any>
    protected _operandValue: any;
    protected _negated: boolean;

    public constructor(operator: Operator<any>, operandValue: any, negated: boolean, category?: Category<any>) {
        this._operator = operator;
        this._operandValue = operandValue;
        this._negated = negated;
        this._category = category;
    }

    public type(): QueryItemType {
        return QueryItemType.SIMPLE_EXPRESSION;
    }

    public get category(): Category<any> {
        return this._category;
    }

    public set category(cat: Category<any>) {
        this._category = cat;
    }

    public get operator(): Operator<any> {
        return this._operator;
    }

    public get operandValue(): any {
        return this._operandValue;
    }

    public get negated(): boolean {
        return this._negated;
    }

    // todo 2466
    public negate(): void {
        if (!!this._negated) {
            this._negated = false;
            return;
        }
        // todo 2466
        // possible only if operator is: EQ, NEQ, GT, GTE, LT, LTE
        // throw if operator is: Substring, IN RANGE
        // throw if calculated operator is: NEQ null
    }
}
