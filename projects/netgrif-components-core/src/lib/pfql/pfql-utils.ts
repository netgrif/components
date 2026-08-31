import {CharStream, CommonTokenStream, Token} from "antlr4ng";
import { QueryLangLexer } from "./generated/QueryLangLexer";
import {QueryLangParser} from "./generated/QueryLangParser";
import {PfqlVisitor} from "./pfql-visitor";
import {Injector} from "@angular/core";
import {QueryItem, QueryItemType} from "./model/query-item-type";
import {Operator} from "../search/models/operator/operator";
import {Equals} from "../search/models/operator/equals";
import {Substring} from "../search/models/operator/substring";
import {LessThan} from "../search/models/operator/less-than";
import {LessThanEqual} from "../search/models/operator/less-than-equal";
import {MoreThan} from "../search/models/operator/more-than";
import {MoreThanEqual} from "../search/models/operator/more-than-equal";
import {NotEquals} from "../search/models/operator/not-equals";
import {ComplexExpression} from "./model/complex-expression";
import {EqualsDate} from "../search/models/operator/equals-date";
import {NotEqualsDate} from "../search/models/operator/not-equals-date";
import {LessThanDate} from "../search/models/operator/less-than-date";
import {LessThanEqualDate} from "../search/models/operator/less-than-equal-date";
import {MoreThanEqualDate} from "../search/models/operator/more-than-equal-date";
import {MoreThanDate} from "../search/models/operator/more-than-date";
import {OperatorService} from "../search/operator-service/operator.service";
import {EqualsDateTime} from "../search/models/operator/equals-date-time";
import {NotEqualsDateTime} from "../search/models/operator/not-equals-date-time";
import {MoreThanDateTime} from "../search/models/operator/more-than-date-time";
import {MoreThanEqualDateTime} from "../search/models/operator/more-than-equal-date-time";
import {LessThanDateTime} from "../search/models/operator/less-than-date-time";
import {LessThanEqualDateTime} from "../search/models/operator/less-than-equal-date-time";
import {LoggerService} from "../logger/services/logger.service";

/**
 * Parses a PFQL query string into an array of query items.
 *
 * @param query - The PFQL query string to parse
 * @param injector - Angular injector used for dependency injection during parsing
 * @returns An array of QueryItem objects representing the parsed query structure
 */
export function parseQuery(query: string, injector: Injector): Array<QueryItem> {
    const logger = injector.get(LoggerService);
    try {
        const inputStream = CharStream.fromString(query);
        const lexer = new QueryLangLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new QueryLangParser(tokenStream);
        const tree = parser.query();
        const visitor = new PfqlVisitor(injector);

        let items: Array<QueryItem> = visitor.visit(tree);
        return reduceComplexToSimpleExpressions(items);
    } catch (error) {
        logger.error(`Could not parse PFQL query: ${error}`);
    }
}

/**
 * Converts a lexer token into the corresponding operator instance for basic comparisons.
 * Supports equality, inequality, substring, and relational operators.
 *
 * @param operatorToken - The token representing the operator, or null
 * @returns The corresponding Operator instance, or undefined if the token is null or unrecognized
 */
export function getOperatorFromToken(operatorToken: Token | null): Operator<any> | undefined {
    if (operatorToken === null) {
        return undefined;
    }
    switch (operatorToken.type) {
        case QueryLangParser.EQ:
            return new Equals();
        case QueryLangParser.NEQ:
            return new NotEquals();
        case QueryLangParser.CONTAINS:
            return new Substring();
        case QueryLangParser.LT:
            return new LessThan();
        case QueryLangParser.LTE:
            return new LessThanEqual();
        case QueryLangParser.GT:
            return new MoreThan();
        case QueryLangParser.GTE:
            return new MoreThanEqual();
        default:
            return undefined;
    }
}

/**
 * Converts a lexer token into the corresponding date-specific operator instance.
 * Supports date equality, inequality, and relational operators.
 *
 * @param operatorToken - The token representing the operator, or null
 * @param operatorService - Service providing operator-related functionality
 * @returns The corresponding date Operator instance, or undefined if the token is null or unrecognized
 */
export function getDateOperatorFromToken(operatorToken: Token | null, operatorService: OperatorService): Operator<any> | undefined {
    if (operatorToken === null) {
        return undefined;
    }
    switch (operatorToken.type) {
        case QueryLangParser.EQ:
            return new EqualsDate(operatorService);
        case QueryLangParser.NEQ:
            return new NotEqualsDate(operatorService);
        case QueryLangParser.LT:
            return new LessThanDate(operatorService);
        case QueryLangParser.LTE:
            return new LessThanEqualDate(operatorService);
        case QueryLangParser.GT:
            return new MoreThanDate(operatorService);
        case QueryLangParser.GTE:
            return new MoreThanEqualDate(operatorService);
        default:
            return undefined;
    }
}

/**
 * Converts a lexer token into the corresponding datetime-specific operator instance.
 * Supports datetime equality, inequality, and relational operators.
 *
 * @param operatorToken - The token representing the operator, or null
 * @param operatorService - Service providing operator-related functionality
 * @returns The corresponding datetime Operator instance, or undefined if the token is null or unrecognized
 */
export function getDateTimeOperatorFromToken(operatorToken: Token | null, operatorService: OperatorService): Operator<any> | undefined {
    if (operatorToken === null) {
        return undefined;
    }
    switch (operatorToken.type) {
        case QueryLangParser.EQ:
            return new EqualsDateTime(operatorService);
        case QueryLangParser.NEQ:
            return new NotEqualsDateTime(operatorService);
        case QueryLangParser.LT:
            return new LessThanDateTime(operatorService);
        case QueryLangParser.LTE:
            return new LessThanEqualDateTime(operatorService);
        case QueryLangParser.GT:
            return new MoreThanDateTime(operatorService);
        case QueryLangParser.GTE:
            return new MoreThanEqualDateTime(operatorService);
        default:
            return undefined;
    }
}

function reduceComplexToSimpleExpressions(items: Array<QueryItem>): Array<QueryItem> {
    if (isSingleComplexExpr(items)) {
        items = (items[0] as ComplexExpression).items;
    }
    return items?.map(queryItem => {
        if (queryItem.type() === QueryItemType.COMPLEX_EXPRESSION) {
            const complexExpr: ComplexExpression = queryItem as ComplexExpression;
            if (canBeReducedToSimpleExpr(complexExpr)) {
                return complexExpr.items[0];
            }
            complexExpr.items = reduceComplexToSimpleExpressions(complexExpr.items);
        }
        return queryItem;
    });
}

function canBeReducedToSimpleExpr(complexExpr: ComplexExpression): boolean {
    return !!complexExpr.items && complexExpr.items.length === 1 && complexExpr.items[0]?.type() === QueryItemType.SIMPLE_EXPRESSION;
}

function isSingleComplexExpr(items: Array<QueryItem>): boolean {
    return !!items && items.length === 1 && items[0].type() === QueryItemType.COMPLEX_EXPRESSION;
}
