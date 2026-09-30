import {Category} from "../../search/models/category/category";
import {Operator} from "../../search/models/operator/operator";
import {QueryItemInterface} from "./query-item-interface";
import { QueryItemType } from "./query-item-type";

/**
 * Represents a simple PFQL expression consisting of a category, operator, and operand value.
 * A simple expression is a basic building block of PFQL queries that combines a search category with an operator
 * and a value to create a single query condition.
 */
export class SimpleExpression implements QueryItemInterface {
    protected _category: Category<any>
    protected _operator: Operator<any>
    protected _operandValue: any;

    public constructor(operator: Operator<any>, operandValue: any, category?: Category<any>) {
        this._operator = operator;
        this._operandValue = operandValue;
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
}
