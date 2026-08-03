import {QueryLangVisitor} from "./generated/QueryLangVisitor";
import {
    AuthorBasicContext,
    BooleanComparisonContext,
    CaseAndExpressionContext,
    CaseComparisonsContext,
    CaseConditionGroupParenthesisContext,
    CaseConditionsAndPagingContext,
    CaseOrExpressionContext,
    CaseQueryContext,
    CdDateBasicContext,
    CdDateRangeContext,
    CdDateTimeBasicContext,
    DataBooleanContext,
    DataDateContext,
    DataDateRangeContext,
    DataDatetimeContext,
    DataNullContext,
    DataNumberContext,
    DataNumberRangeContext,
    DataStringContext,
    DataStringLikeContext,
    DateComparisonContext,
    DateRangeContext,
    DateTimeComparisonContext,
    DateTimeRangeContext,
    IdBasicContext,
    InRangeNumberComparisonContext,
    NullComparisonContext,
    NumberComparisonContext,
    ObjectIdComparisonContext,
    ProcessIdBasicContext,
    ProcessIdentifierBasicContext,
    StringComparisonContext,
    StringLikeComparisonContext,
    TaskAndExpressionContext,
    TaskConditionGroupParenthesisContext,
    TaskConditionsAndPagingContext,
    TaskOrExpressionContext,
    TaskQueryContext,
    TitleBasicContext,
    TitleLikeContext,
    TransitionIdBasicContext,
    UserIdBasicContext,
    UserIdNullContext,
} from "./generated/QueryLangParser";
import {LoggerService} from "../logger/services/logger.service";
import {CaseTitle} from "../search/models/category/case/case-title";
import {Injector} from "@angular/core";
import {OperatorService} from "../search/operator-service/operator.service";
import {QueryItem} from "./model/query-item-type";
import {LogicalOperator} from "./model/logical-operator";
import {ComplexExpression} from "./model/complex-expression";
import {SimpleExpression} from "./model/simple-expression";
import {getDateOperatorFromToken, getDateTimeOperatorFromToken, getOperatorFromToken} from "./pfql-utils";
import {Like} from "../search/models/operator/like";
import {Operator} from "../search/models/operator/operator";
import {BooleanOperator} from "../search/models/boolean-operator";
import {CaseStringId} from "../search/models/category/case/case-string-id";
import {CaseAuthor} from "../search/models/category/case/case-author";
import {UserResourceService} from "../resources/engine-endpoint/user-resource.service";
import {CaseCreationDate} from "../search/models/category/case/case-creation-date";
import {CaseCreationDateTime} from "../search/models/category/case/case-creation-date-time";
import {InRangeDate} from "../search/models/operator/in-range-date";
import {InRangeDateTime} from "../search/models/operator/in-range-date-time";
import {CaseDataset} from "../search/models/category/case/case-dataset";
import {CategoryFactory} from "../search/category-factory/category-factory";
import {AllowedNetsService} from "../allowed-nets/services/allowed-nets.service";
import {OptionalDependencies} from "../search/category-factory/optional-dependencies";
import {CaseProcess} from "../search/models/category/case/case-process";
import {DataSimpleExpression} from "./model/data-simple-expression";
import {InRange} from "../search/models/operator/in-range";
import {IsNull} from "../search/models/operator/is-null";
import {TaskTask} from "../search/models/category/task/task-task";
import {TaskAssignee} from "../search/models/category/task/task-assignee";
import {TaskProcess} from "../search/models/category/task/task-process";


// todo 2466 doc
export class PfqlVisitor extends QueryLangVisitor<Array<QueryItem>> {
    protected _logger: LoggerService;
    protected _operatorService: OperatorService
    protected _userResourceService: UserResourceService;
    protected _categoryFactory: CategoryFactory;
    protected _allowedNetsService: AllowedNetsService;

    protected _categoryOptionalDependencies: OptionalDependencies;

    public constructor(injector: Injector) {
        super();
        this._logger = injector.get(LoggerService);
        this._operatorService = injector.get(OperatorService);
        this._userResourceService = injector.get(UserResourceService);
        this._categoryFactory = injector.get(CategoryFactory);
        this._allowedNetsService = injector.get(AllowedNetsService);
        this._categoryOptionalDependencies = {
            categoryFactory: this._categoryFactory,
            searchIndexResolver: undefined,
            allowedNetsService: this._allowedNetsService,
            userResourceService: this._userResourceService
        };
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

    // todo 2466 doc
    override visitTaskOrExpression = (ctx: TaskOrExpressionContext): Array<QueryItem> => {
        const andExpressionContexts = ctx.taskAndExpression();
        const items: Array<QueryItem> = [...this.visit(andExpressionContexts[0])];
        for (let i = 1; i < andExpressionContexts.length; i++) {
            items.push(new LogicalOperator(BooleanOperator.OR));
            items.push(...this.visit(andExpressionContexts[i]));
        }
        return items;
    };

    // todo 2466 doc
    override visitTaskAndExpression = (ctx: TaskAndExpressionContext): Array<QueryItem> => {
        const conditionGroupContexts = ctx.taskConditionGroup();
        const items: Array<QueryItem> = [...this.visit(conditionGroupContexts[0])];
        for (let i = 1; i < conditionGroupContexts.length; i++) {
            items.push(new LogicalOperator(BooleanOperator.AND));
            items.push(...this.visit(conditionGroupContexts[i]));
        }
        return items;
    };

    // todo 2466 doc
    override visitTaskConditionGroupParenthesis = (ctx: TaskConditionGroupParenthesisContext): Array<QueryItem> => {
        const innerItems: Array<QueryItem> = [...this.visit(ctx.taskConditions())];
        const isNegated: boolean = !!ctx.NOT();
        return [new ComplexExpression(isNegated, innerItems)];
    };

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

    override visitIdBasic = (ctx: IdBasicContext): Array<QueryItem> => {
        if (ctx.parent instanceof CaseComparisonsContext) {
            const expr: SimpleExpression = this.handleObjectIdComparisonContext(ctx.objectIdComparison());
            expr.category = new CaseStringId(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.warn("There is no dedicated category when visiting title while parsing PFQL query");
            return [];
        }
    };

    override visitAuthorBasic = (ctx: AuthorBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new CaseAuthor(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    override visitCdDateBasic = (ctx: CdDateBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleDateComparisonContext(ctx.dateComparison());
        expr.category = new CaseCreationDate(this._operatorService, this._logger);
        return [expr];
    };

    override visitCdDateTimeBasic = (ctx: CdDateTimeBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleDateTimeComparisonContext(ctx.dateTimeComparison());
        expr.category = new CaseCreationDateTime(this._operatorService, this._logger);
        return [expr];
    };

    override visitCdDateRange = (ctx: CdDateRangeContext): Array<QueryItem> => {
        const inRangeCtx = ctx.inRangeDateComparison();
        if (!!inRangeCtx.dateRange()) {
            const expr: SimpleExpression = this.handleDateRangeContext(inRangeCtx.dateRange(), !!inRangeCtx.NOT());
            expr.category = new CaseCreationDate(this._operatorService, this._logger);
            return [expr];
        } else if (!!inRangeCtx.dateTimeRange()) {
            const expr: SimpleExpression = this.handleDateTimeRangeContext(inRangeCtx.dateTimeRange(), !!inRangeCtx.NOT());
            expr.category = new CaseCreationDateTime(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.error("No range values provided for creationDate range comparison");
            return [];
        }
    };

    override visitDataString = (ctx: DataStringContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataStringLike = (ctx: DataStringLikeContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleStringLikeComparisonContext(ctx.stringLikeComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataNumber = (ctx: DataNumberContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleNumberComparisonContext(ctx.numberComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataNumberRange = (ctx: DataNumberRangeContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleInRangeNumberComparisonContext(ctx.inRangeNumberComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataDate = (ctx: DataDateContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleDateComparisonContext(ctx.dateComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataDateRange = (ctx: DataDateRangeContext): Array<QueryItem> => {
        const inRangeCtx = ctx.inRangeDateComparison();
        let simpleExpr: SimpleExpression;
        if (!!inRangeCtx.dateRange()) {
            simpleExpr = this.handleDateRangeContext(inRangeCtx.dateRange(), !!inRangeCtx.NOT());
        } else if (!!inRangeCtx.dateTimeRange()) {
            simpleExpr = this.handleDateTimeRangeContext(inRangeCtx.dateTimeRange(), !!inRangeCtx.NOT());
        } else {
            this._logger.error("No range values provided for creationDate range comparison");
            return [];
        }

        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataDatetime = (ctx: DataDatetimeContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleDateTimeComparisonContext(ctx.dateTimeComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataBoolean = (ctx: DataBooleanContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleBooleanComparisonContext(ctx.booleanComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    override visitDataNull = (ctx: DataNullContext): Array<QueryItem> => {
        const simpleExpr: SimpleExpression = this.handleNullComparisonContext(ctx.nullComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue, simpleExpr.negated);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    // todo 2466 user field comparison ? ... ak je v string comparison mongo id, tak je to mozno user id?

    override visitProcessIdentifierBasic = (ctx: ProcessIdentifierBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new CaseProcess(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    override visitTransitionIdBasic = (ctx: TransitionIdBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new TaskTask(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    }

    override visitUserIdBasic = (ctx: UserIdBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new TaskAssignee(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    override visitUserIdNull = (ctx: UserIdNullContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleNullComparisonContext(ctx.nullComparison());
        expr.category = new TaskAssignee(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    override visitProcessIdBasic = (ctx: ProcessIdBasicContext): Array<QueryItem> => {
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new TaskProcess(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    // todo 2466 implement handler dispatcher?

    protected handleStringComparisonContext(ctx: StringComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: string = this.removeSingleQuotesFromString(ctx.STRING()?.getText());
        // todo 2466 handle logged user placeholder
        return new SimpleExpression(operator, value, !!ctx.NOT());
    };

    protected handleStringLikeComparisonContext(ctx: StringLikeComparisonContext): SimpleExpression {
        const operator: Operator<any> = new Like();
        const value: string = this.removeSingleQuotesFromString(ctx.stringComparison().STRING()?.getText());
        // todo 2466 handle logged user placeholder
        return new SimpleExpression(operator, value, !!ctx.stringComparison().NOT());
    };

    protected removeSingleQuotesFromString(value: string): string {
        if (value && value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
            return value.substring(1, value.length - 1);
        }
        return value;
    }

    protected handleObjectIdComparisonContext(ctx: ObjectIdComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: string = this.removeSingleQuotesFromString(ctx.STRING()?.getText())
        // todo 2466 handle logged user id placeholder
        return new SimpleExpression(operator, value, !!ctx.NOT());
    }

    protected handleDateComparisonContext(ctx: DateComparisonContext): SimpleExpression {
        const operator: Operator<any> = getDateOperatorFromToken(ctx._op, this._operatorService);
        const value: string = ctx.DATE()?.getText();
        return new SimpleExpression(operator, value, !!ctx.NOT());
    }

    protected handleDateTimeComparisonContext(ctx: DateTimeComparisonContext): SimpleExpression {
        const operator: Operator<any> = getDateTimeOperatorFromToken(ctx._op, this._operatorService);
        const value: string = ctx.DATETIME()?.getText();
        return new SimpleExpression(operator, value, !!ctx.NOT());
    }

    protected handleDateRangeContext(ctx: DateRangeContext, isNegated: boolean): SimpleExpression {
        const operator: Operator<any> = new InRangeDate();
        const value: string[] = ctx.DATE()?.map(terminalNode => terminalNode.getText());
        return new SimpleExpression(operator, value, isNegated);
    }

    protected handleDateTimeRangeContext(ctx: DateTimeRangeContext, isNegated: boolean): SimpleExpression {
        const operator: Operator<any> = new InRangeDateTime();
        const value: string[] = ctx.DATETIME()?.map(terminalNode => terminalNode.getText());
        return new SimpleExpression(operator, value, isNegated);
    }

    protected handleNumberComparisonContext(ctx: NumberComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        let value: number;
        if (!!ctx.INT()) {
            value = parseInt(ctx.INT().getText(), 10);
        } else if (!!ctx.DOUBLE()) {
            value = parseFloat(ctx.DOUBLE().getText());
        }
        return new SimpleExpression(operator, value, !!ctx.NOT());
    }

    protected handleInRangeNumberComparisonContext(ctx: InRangeNumberComparisonContext): SimpleExpression {
        const operator: Operator<any> = new InRange();
        let fromValue: number, toValue: number;
        if (!!ctx.intRange()) {
            fromValue = parseInt(ctx.intRange().INT()[0].getText(), 10);
            toValue = parseInt(ctx.intRange().INT()[1].getText(), 10);
        } else if (!!ctx.doubleRange()) {
            fromValue = parseFloat(ctx.doubleRange().DOUBLE()[0].getText());
            toValue = parseFloat(ctx.doubleRange().DOUBLE()[1].getText());
        }
        return new SimpleExpression(operator, [fromValue, toValue], !!ctx.NOT());
    }

    protected handleBooleanComparisonContext(ctx: BooleanComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: boolean = ctx.BOOLEAN().getText().toLowerCase() === 'true';
        return new SimpleExpression(operator, value, !!ctx.NOT());
    }

    protected handleNullComparisonContext(ctx: NullComparisonContext): SimpleExpression {
        const operator: Operator<any> = new IsNull();
        return new SimpleExpression(operator, undefined, !!ctx.NOT());
    }

    // todo 2466 more handle methods
}
