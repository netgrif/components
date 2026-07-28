import {QueryLangVisitor} from "./generated/QueryLangVisitor";
import {
    CaseAndExpressionContext,
    CaseComparisonsContext,
    CaseConditionGroupParenthesisContext, CaseConditionsAndPagingContext,
    CaseOrExpressionContext, CaseQueryContext,
    StringComparisonContext,
    StringLikeComparisonContext, TaskConditionsAndPagingContext, TaskQueryContext,
    TitleBasicContext,
    TitleLikeContext,
    TitleListContext,
    TitleNullContext,
    TitleRangeContext
} from "./generated/QueryLangParser";
import {LoggerService} from "../logger/services/logger.service";
import {CaseTitle} from "../search/models/category/case/case-title";
import {Injector} from "@angular/core";
import {OperatorService} from "../search/operator-service/operator.service";
import {QueryItem} from "./model/query-item-type";
import {LogicalOperator} from "./model/logical-operator";
import {ComplexExpression} from "./model/complex-expression";
import {SimpleExpression} from "./model/simple-expression";
import {getOperatorFromToken} from "./pfql-utils";
import {Like} from "../search/models/operator/like";
import {Operator} from "../search/models/operator/operator";
import {BooleanOperator} from "../search/models/boolean-operator";


// todo 2466 doc
export class PfqlVisitor extends QueryLangVisitor<Array<QueryItem>> {
    protected _logger: LoggerService;
    protected _operatorService: OperatorService

    public constructor(injector: Injector) {
        super();
        this._logger = injector.get(LoggerService);
        this._operatorService = injector.get(OperatorService);
    }

    // todo 2466 doc
    override visitCaseQuery = (ctx: CaseQueryContext): Array<QueryItem> => {
        const conditionsAndPaging = ctx.caseConditionsAndPaging();
        if (!conditionsAndPaging) {
            return [];
        }
        return this.visit(conditionsAndPaging);
    };

    // todo 2466 doc
    override visitCaseConditionsAndPaging = (ctx: CaseConditionsAndPagingContext): Array<QueryItem> => {
        const conditions = ctx.caseConditions();
        if (!conditions) {
            return [];
        }
        return this.visit(conditions);
    };

    // todo 2466 doc
    override visitTaskQuery = (ctx: TaskQueryContext): Array<QueryItem> => {
        const conditionsAndPaging = ctx.taskConditionsAndPaging();
        if (!conditionsAndPaging) {
            return [];
        }
        return this.visit(conditionsAndPaging);
    };

    // todo 2466 doc
    override visitTaskConditionsAndPaging = (ctx: TaskConditionsAndPagingContext): Array<QueryItem> => {
        const conditions = ctx.taskConditions();
        if (!conditions) {
            return [];
        }
        return this.visit(conditions);
    };

    // todo 2466 doc
    override visitCaseOrExpression = (ctx: CaseOrExpressionContext): Array<QueryItem> => {
        const andExpressionContexts = ctx.caseAndExpression();
        const items: Array<QueryItem> = [...this.visit(andExpressionContexts[0])];
        for (let i = 1; i < andExpressionContexts.length; i++) {
            items.push(new LogicalOperator(BooleanOperator.OR));
            items.push(...this.visit(andExpressionContexts[i]));
        }
        return items;
    };

    // todo 2466 doc
    override visitCaseAndExpression = (ctx: CaseAndExpressionContext): Array<QueryItem> => {
        const conditionGroupContexts = ctx.caseConditionGroup();
        const items: Array<QueryItem> = [...this.visit(conditionGroupContexts[0])];
        for (let i = 1; i < conditionGroupContexts.length; i++) {
            items.push(new LogicalOperator(BooleanOperator.AND));
            items.push(...this.visit(conditionGroupContexts[i]));
        }
        return items;
    };

    // todo 2466 doc
    override visitCaseConditionGroupParenthesis = (ctx: CaseConditionGroupParenthesisContext): Array<QueryItem> => {
        const innerItems: Array<QueryItem> = [...this.visit(ctx.caseConditions())];
        const isNegated: boolean = !!ctx.NOT();
        return [new ComplexExpression(isNegated, innerItems)];
    };

    /**
     * Visit a parse tree produced by the `titleBasic`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    override visitTitleBasic = (ctx: TitleBasicContext): Array<QueryItem> => {
        if (ctx.parent instanceof CaseComparisonsContext) {
            const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
            expr.category = new CaseTitle(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.warn("There is no dedicated category when visiting title while parsing PFQL query");
            return []
        }
    };

    /**
     * Visit a parse tree produced by the `titleLike`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    override visitTitleLike = (ctx: TitleLikeContext): Array<QueryItem> => {
        if (ctx.parent instanceof CaseComparisonsContext) {
            const expr: SimpleExpression = this.handleStringLikeComparisonContext(ctx.stringLikeComparison());
            expr.category = new CaseTitle(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.warn("There is no dedicated category when visiting title while parsing PFQL query");
            return [];
        }
    };

    /**
     * Visit a parse tree produced by the `titleList`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    override visitTitleList = (ctx: TitleListContext): Array<QueryItem> => {
        this._logger.warn("There is no in list operator for title");
        return [];
    };

    /**
     * Visit a parse tree produced by the `titleRange`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    override visitTitleRange = (ctx: TitleRangeContext): Array<QueryItem> => {
        this._logger.warn("There is no in range operator for title");
        return [];
    };

    /**
     * Visit a parse tree produced by the `titleNull`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    override visitTitleNull = (ctx: TitleNullContext): Array<QueryItem> => {
        this._logger.warn("There is no null/empty operator for title");
        return [];
    };

    // todo 2466 more visit methods

    protected handleStringComparisonContext(ctx: StringComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: string = ctx.STRING()?.getText();
        return new SimpleExpression(operator, value, !!ctx.NOT());
    }

    protected handleStringLikeComparisonContext(ctx: StringLikeComparisonContext): SimpleExpression {
        const operator: Operator<any> = new Like();
        const value: string = ctx.stringComparison().STRING().getText();
        return new SimpleExpression(operator, value, !!ctx.stringComparison().NOT());
    }

    // todo 2466 more handle methods
}
