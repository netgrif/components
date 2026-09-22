import {SimpleExpression} from "./simple-expression";
import {ComplexExpression} from "./complex-expression";
import { LogicalOperator } from "./logical-operator";
import {RawExpression} from "./raw-expression";

export enum QueryItemType {
    SIMPLE_EXPRESSION,
    COMPLEX_EXPRESSION,
    LOGICAL_OPERATOR,
    RAW_EXPRESSION,
}

export type QueryItem = SimpleExpression | ComplexExpression | RawExpression | LogicalOperator;

