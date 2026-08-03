import {Category} from "../../search/models/category/category";
import {Operator} from "../../search/models/operator/operator";
import {QueryItemInterface} from "./query-item-interface";
import { QueryItemType } from "./query-item-type";
import {Negatable} from "./negatable";

/**
 * Represents a simple PFQL expression consisting of a category, operator, operand value, and negation flag.
 * A simple expression is a basic building block of PFQL queries that combines a search category with an operator
 * and a value to create a single query condition. The expression can also be negated to invert its meaning.
 */
export class SimpleExpression implements QueryItemInterface, Negatable {
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

    public isNegatable(): boolean {
        return true;
    }

    /**
     * Pushes down the negation flag by converting it into an operator negation.
     * If the expression is negated, this method clears the negation flag and inverts the operator instead.
     * This normalization ensures that negation is represented consistently at the operator level rather than
     * at the expression level. If the expression is not negated, this method does nothing.
     */
    public pushDownNegation() {
        if (!this.negated) {
            return;
        }
        this._negated = false;
        this.negate();
    }

    /**
     * Toggles the negation of this expression.
     * If the expression is currently negated (flag is true), clears the negation flag.
     * Otherwise, inverts the operator to its negated form if an operator is present.
     * @throws {Error} if the expression has no operator or cannot be negated
     */
    public negate(): void {
        if (!!this._negated) {
            this._negated = false;
            return;
        }
        if (!this.operator) {
            throw new Error("Expression cannot be negated. There is no operator");
        }
        this._operator = this._operator.negated();
    }
}
