import {SimpleExpression} from "./simple-expression";
import {ComplexExpression} from "./complex-expression";
import { LogicalOperator } from "./logical-operator";

export enum QueryItemType {
    SIMPLE_EXPRESSION,
    COMPLEX_EXPRESSION,
    LOGICAL_OPERATOR
}

export type QueryItem = SimpleExpression | ComplexExpression | LogicalOperator;

