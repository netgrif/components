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

// todo 2466
export function parseQuery(query: string, injector: Injector): Array<QueryItem> {
    // todo 2466 injector as parameter?
    // todo 2466 logging (also catch error)
    const inputStream = CharStream.fromString(query);
    const lexer = new QueryLangLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new QueryLangParser(tokenStream);
    const tree = parser.query();
    const visitor = new PfqlVisitor(injector);
    let items: Array<QueryItem> = visitor.visit(tree);
    // todo 2466 push down negations (also in sub-expressions)
    return reduceComplexToSimpleExpressions(items);
}

// todo 2466
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

function reduceComplexToSimpleExpressions(items: Array<QueryItem>): Array<QueryItem> {
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

// todo 2466 date operators

// todo 2466 date-time operators
