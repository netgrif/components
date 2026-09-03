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
import {Injectable, Inject, Optional} from "@angular/core";
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
import {UserService} from "../user/services/user.service";
import {CasePlainQuery} from "../search/models/category/case/case-plain-query";
import {RawExpression} from "./model/raw-expression";
import {TaskPlainQuery} from "../search/models/category/task/task-plain-query";
import {NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY} from "../search/category-factory/search-categories-injection-token";


/**
 * Visitor implementation for traversing and processing PFQL (Process Filter Query Language) parse trees.
 * This visitor converts parsed PFQL queries into executable query items that can be used to filter cases and tasks.
 *
 * The visitor supports:
 * - Case queries with various search criteria (title, author, creation date, process, data fields)
 * - Task queries with assignee and transition filters
 * - Complex boolean expressions with AND, OR operations and parenthesized groups
 * - Multiple comparison operators (equality, ranges, null checks, like patterns)
 * - Data field queries with type-specific comparisons
 */
@Injectable()
export class PfqlVisitor extends QueryLangVisitor<Array<QueryItem>> {

    protected _categoryOptionalDependencies: OptionalDependencies;

    public constructor(protected _logger: LoggerService,
                       protected _operatorService: OperatorService,
                       protected _userResourceService: UserResourceService,
                       protected _userService: UserService,
                       protected _categoryFactory: CategoryFactory,
                       protected _allowedNetsService: AllowedNetsService,
                       @Optional() @Inject(NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY) ignoreNetsOnAutocompleteCategory: boolean) {
        super();
        this._categoryOptionalDependencies = {
            categoryFactory: this._categoryFactory,
            searchIndexResolver: undefined,
            allowedNetsService: this._allowedNetsService,
            userResourceService: this._userResourceService,
            ignoreNetsOnAutocompleteCategories: ignoreNetsOnAutocompleteCategory,
        };
    }

    /**
     * Visits the root case query context and extracts query items from case conditions.
     *
     * @param ctx - The case query parse tree context
     * @returns An array of query items representing the case search criteria, or an empty array if no conditions are present
     */
    override visitCaseQuery = (ctx: CaseQueryContext): Array<QueryItem> => {
        const conditionsAndPaging = ctx.caseConditionsAndPaging();
        if (!conditionsAndPaging) {
            return [];
        }
        return this.visit(conditionsAndPaging);
    };

    /**
     * Visits the case conditions and paging context and extracts the case conditions.
     *
     * @param ctx - The case conditions and paging parse tree context
     * @returns An array of query items representing the case conditions, or an empty array if no conditions are present
     */
    override visitCaseConditionsAndPaging = (ctx: CaseConditionsAndPagingContext): Array<QueryItem> => {
        const conditions = ctx.caseConditions();
        if (!conditions) {
            return [];
        }
        return this.visit(conditions);
    };

    /**
     * Visits the root task query context and extracts query items from task conditions.
     *
     * @param ctx - The task query parse tree context
     * @returns An array of query items representing the task search criteria, or an empty array if no conditions are present
     */
    override visitTaskQuery = (ctx: TaskQueryContext): Array<QueryItem> => {
        const conditionsAndPaging = ctx.taskConditionsAndPaging();
        if (!conditionsAndPaging) {
            return [];
        }
        return this.visit(conditionsAndPaging);
    };

    /**
     * Visits the task conditions and paging context and extracts the task conditions.
     *
     * @param ctx - The task conditions and paging parse tree context
     * @returns An array of query items representing the task conditions, or an empty array if no conditions are present
     */
    override visitTaskConditionsAndPaging = (ctx: TaskConditionsAndPagingContext): Array<QueryItem> => {
        const conditions = ctx.taskConditions();
        if (!conditions) {
            return [];
        }
        return this.visit(conditions);
    };

    /**
     /**
     * Visits a case OR expression and processes multiple AND expressions joined by OR operators.
     *
     * When multiple AND expressions are connected with OR operators, the entire expression is treated
     * as a raw query string and wrapped in a case plain query, since complex OR logic requires
     * special handling beyond simple query composition.
     *
     * @param ctx - The case OR expression parse tree context
     * @returns An array containing either the visited AND expression items if there's only one,
     *          or a single raw expression wrapping the entire query text if multiple OR-connected expressions exist
     */
    override visitCaseOrExpression = (ctx: CaseOrExpressionContext): Array<QueryItem> => {
        const andExpressionContexts = ctx.caseAndExpression();
        return andExpressionContexts.length === 1 ? [...this.visit(andExpressionContexts[0])] : [this.handleCaseRawQuery(ctx.getText())]
    };

    /**
     * Visits a case AND expression and combines multiple condition groups with AND logical operators.
     *
     * @param ctx - The case AND expression parse tree context
     * @returns An array of query items with condition groups joined by AND operators
     */
    override visitCaseAndExpression = (ctx: CaseAndExpressionContext): Array<QueryItem> => {
        const conditionGroupContexts = ctx.caseConditionGroup();
        const items: Array<QueryItem> = [...this.visit(conditionGroupContexts[0])];
        for (let i = 1; i < conditionGroupContexts.length; i++) {
            items.push(new LogicalOperator(BooleanOperator.AND));
            items.push(...this.visit(conditionGroupContexts[i]));
        }
        return items;
    };

    /**
     * Visits a parenthesized case condition group and wraps the inner conditions in a complex expression.
     *
     * @param ctx - The case condition group parenthesis parse tree context
     * @returns An array containing a single complex expression with the inner conditions
     */
    override visitCaseConditionGroupParenthesis = (ctx: CaseConditionGroupParenthesisContext): Array<QueryItem> => {
        const innerItems: Array<QueryItem> = [...this.visit(ctx.caseConditions())];
        if (!!ctx.NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        return [new ComplexExpression(innerItems)];
    };

    /**
     * Visits a task OR expression and processes multiple AND expressions joined by OR operators.
     *
     * When multiple AND expressions are connected with OR operators, the entire expression is treated
     * as a raw query string and wrapped in a task plain query, since complex OR logic requires
     * special handling beyond simple query composition.
     *
     * @param ctx - The task OR expression parse tree context
     * @returns An array containing either the visited AND expression items if there's only one,
     *          or a single raw expression wrapping the entire query text if multiple OR-connected expressions exist
     */
    override visitTaskOrExpression = (ctx: TaskOrExpressionContext): Array<QueryItem> => {
        const andExpressionContexts = ctx.taskAndExpression();
        return andExpressionContexts.length === 1 ? [...this.visit(andExpressionContexts[0])] : [this.handleTaskRawQuery(ctx.getText())]
    };

    /**
     * Visits a task AND expression and combines multiple condition groups with AND logical operators.
     *
     * @param ctx - The task AND expression parse tree context
     * @returns An array of query items with condition groups joined by AND operators
     */
    override visitTaskAndExpression = (ctx: TaskAndExpressionContext): Array<QueryItem> => {
        const conditionGroupContexts = ctx.taskConditionGroup();
        const items: Array<QueryItem> = [...this.visit(conditionGroupContexts[0])];
        for (let i = 1; i < conditionGroupContexts.length; i++) {
            items.push(new LogicalOperator(BooleanOperator.AND));
            items.push(...this.visit(conditionGroupContexts[i]));
        }
        return items;
    };

    /**
     * Visits a parenthesized task condition group and wraps the inner conditions in a complex expression.
     * Supports negation with the NOT keyword.
     *
     * @param ctx - The task condition group parenthesis parse tree context
     * @returns An array containing a single complex expression with the inner conditions and negation flag
     */
    override visitTaskConditionGroupParenthesis = (ctx: TaskConditionGroupParenthesisContext): Array<QueryItem> => {
        const innerItems: Array<QueryItem> = [...this.visit(ctx.taskConditions())];
        if (!!ctx.NOT()) {
            return [this.handleTaskRawQuery(ctx.getText())];
        }
        return [new ComplexExpression(innerItems)];
    };

    /**
     * Visits a basic title comparison and creates a case title search expression.
     *
     * @param ctx - The title basic parse tree context
     * @returns An array containing a single simple expression with case title category, or an empty array if no case comparison context exists
     */
    override visitTitleBasic = (ctx: TitleBasicContext): Array<QueryItem> => {
        if (ctx.parent instanceof CaseComparisonsContext) {
            if (!!ctx.stringComparison().NOT()) {
                return [this.handleCaseRawQuery(ctx.getText())];
            }
            const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
            expr.category = new CaseTitle(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.warn("There is no dedicated category when visiting title while parsing PFQL query");
            return []
        }
    };

    /**
     * Visits a LIKE title comparison and creates a case title search expression with pattern matching.
     *
     * @param ctx - The title LIKE parse tree context
     * @returns An array containing a single simple expression with case title category and LIKE operator, or an empty array if no case comparison context exists
     */
    override visitTitleLike = (ctx: TitleLikeContext): Array<QueryItem> => {
        if (ctx.parent instanceof CaseComparisonsContext) {
            if (!!ctx.stringLikeComparison().stringComparison().NOT()) {
                return [this.handleCaseRawQuery(ctx.getText())];
            }
            const expr: SimpleExpression = this.handleStringLikeComparisonContext(ctx.stringLikeComparison());
            expr.category = new CaseTitle(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.warn("There is no dedicated category when visiting title while parsing PFQL query");
            return [];
        }
    };

    /**
     * Visits a basic ID comparison and creates a case string ID search expression.
     *
     * @param ctx - The ID basic parse tree context
     * @returns An array containing a single simple expression with case string ID category, or an empty array if no case comparison context exists
     */
    override visitIdBasic = (ctx: IdBasicContext): Array<QueryItem> => {
        if (ctx.parent instanceof CaseComparisonsContext) {
            if (!!ctx.objectIdComparison().NOT()) {
                return [this.handleCaseRawQuery(ctx.getText())];
            }
            const expr: SimpleExpression = this.handleObjectIdComparisonContext(ctx.objectIdComparison());
            expr.category = new CaseStringId(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.warn("There is no dedicated category when visiting title while parsing PFQL query");
            return [];
        }
    };

    /**
     * Visits a basic author comparison and creates a case author search expression.
     *
     * @param ctx - The author basic parse tree context
     * @returns An array containing a single simple expression with case author category
     */
    override visitAuthorBasic = (ctx: AuthorBasicContext): Array<QueryItem> => {
        if (!!ctx.stringComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new CaseAuthor(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    /**
     * Visits a basic creation date comparison and creates a case creation date search expression.
     *
     * @param ctx - The creation date basic parse tree context
     * @returns An array containing a single simple expression with case creation date category
     */
    override visitCdDateBasic = (ctx: CdDateBasicContext): Array<QueryItem> => {
        if (!!ctx.dateComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleDateComparisonContext(ctx.dateComparison());
        expr.category = new CaseCreationDate(this._operatorService, this._logger);
        return [expr];
    };

    /**
     * Visits a basic creation datetime comparison and creates a case creation datetime search expression.
     *
     * @param ctx - The creation datetime basic parse tree context
     * @returns An array containing a single simple expression with case creation datetime category
     */
    override visitCdDateTimeBasic = (ctx: CdDateTimeBasicContext): Array<QueryItem> => {
        if (!!ctx.dateTimeComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleDateTimeComparisonContext(ctx.dateTimeComparison());
        expr.category = new CaseCreationDateTime(this._operatorService, this._logger);
        return [expr];
    };

    /**
     * Visits a creation date range comparison and creates either a date or datetime range search expression.
     *
     * @param ctx - The creation date range parse tree context
     * @returns An array containing a single simple expression with either case creation date or datetime category, or an empty array if no range values are provided
     */
    override visitCdDateRange = (ctx: CdDateRangeContext): Array<QueryItem> => {
        const inRangeCtx = ctx.inRangeDateComparison();
        if (!!inRangeCtx.NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        if (!!inRangeCtx.dateRange()) {
            const expr: SimpleExpression = this.handleDateRangeContext(inRangeCtx.dateRange());
            expr.category = new CaseCreationDate(this._operatorService, this._logger);
            return [expr];
        } else if (!!inRangeCtx.dateTimeRange()) {
            const expr: SimpleExpression = this.handleDateTimeRangeContext(inRangeCtx.dateTimeRange());
            expr.category = new CaseCreationDateTime(this._operatorService, this._logger);
            return [expr];
        } else {
            this._logger.error("No range values provided for creationDate range comparison");
            return [];
        }
    };

    /**
     * Visits a data string comparison and creates a data field search expression for string values.
     *
     * @param ctx - The data string parse tree context
     * @returns An array containing a single data simple expression with case dataset category
     */
    override visitDataString = (ctx: DataStringContext): Array<QueryItem> => {
        if (!!ctx.stringComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data string LIKE comparison and creates a data field search expression with pattern matching for string values.
     *
     * @param ctx - The data string LIKE parse tree context
     * @returns An array containing a single data simple expression with case dataset category and LIKE operator
     */
    override visitDataStringLike = (ctx: DataStringLikeContext): Array<QueryItem> => {
        if (!!ctx.stringLikeComparison().stringComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleStringLikeComparisonContext(ctx.stringLikeComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data number comparison and creates a data field search expression for numeric values.
     *
     * @param ctx - The data number parse tree context
     * @returns An array containing a single data simple expression with case dataset category
     */
    override visitDataNumber = (ctx: DataNumberContext): Array<QueryItem> => {
        if (!!ctx.numberComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleNumberComparisonContext(ctx.numberComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data number range comparison and creates a data field search expression for numeric range values.
     *
     * @param ctx - The data number range parse tree context
     * @returns An array containing a single data simple expression with case dataset category and range operator
     */
    override visitDataNumberRange = (ctx: DataNumberRangeContext): Array<QueryItem> => {
        if (!!ctx.inRangeNumberComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleInRangeNumberComparisonContext(ctx.inRangeNumberComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data date comparison and creates a data field search expression for date values.
     *
     * @param ctx - The data date parse tree context
     * @returns An array containing a single data simple expression with case dataset category
     */
    override visitDataDate = (ctx: DataDateContext): Array<QueryItem> => {
        if (!!ctx.dateComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleDateComparisonContext(ctx.dateComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data date range comparison and creates a data field search expression for date or datetime range values.
     *
     * @param ctx - The data date range parse tree context
     * @returns An array containing a single data simple expression with case dataset category and range operator, or an empty array if no range values are provided
     */
    override visitDataDateRange = (ctx: DataDateRangeContext): Array<QueryItem> => {
        const inRangeCtx = ctx.inRangeDateComparison();
        if (!!inRangeCtx.NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        let simpleExpr: SimpleExpression;
        if (!!inRangeCtx.dateRange()) {
            simpleExpr = this.handleDateRangeContext(inRangeCtx.dateRange());
        } else if (!!inRangeCtx.dateTimeRange()) {
            simpleExpr = this.handleDateTimeRangeContext(inRangeCtx.dateTimeRange());
        } else {
            this._logger.error("No range values provided for creationDate range comparison");
            return [];
        }

        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data datetime comparison and creates a data field search expression for datetime values.
     *
     * @param ctx - The data datetime parse tree context
     * @returns An array containing a single data simple expression with case dataset category
     */
    override visitDataDatetime = (ctx: DataDatetimeContext): Array<QueryItem> => {
        if (!!ctx.dateTimeComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleDateTimeComparisonContext(ctx.dateTimeComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data boolean comparison and creates a data field search expression for boolean values.
     *
     * @param ctx - The data boolean parse tree context
     * @returns An array containing a single data simple expression with case dataset category
     */
    override visitDataBoolean = (ctx: DataBooleanContext): Array<QueryItem> => {
        if (!!ctx.booleanComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleBooleanComparisonContext(ctx.booleanComparison());
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a data null comparison and creates a data field search expression for null checks.
     *
     * @param ctx - The data null parse tree context
     * @returns An array containing a single data simple expression with case dataset category and null operator
     */
    override visitDataNull = (ctx: DataNullContext): Array<QueryItem> => {
        if (!!ctx.nullComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const simpleExpr: SimpleExpression = this.handleNullComparisonContext();
        const dataExpr: DataSimpleExpression = new DataSimpleExpression(ctx.dataValue().getText(), simpleExpr.operator,
            simpleExpr.operandValue);
        dataExpr.category = new CaseDataset(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [dataExpr];
    };

    /**
     * Visits a basic process identifier comparison and creates a case process search expression.
     *
     * @param ctx - The process identifier basic parse tree context
     * @returns An array containing a single simple expression with case process category
     */
    override visitProcessIdentifierBasic = (ctx: ProcessIdentifierBasicContext): Array<QueryItem> => {
        if (!!ctx.stringComparison().NOT()) {
            return [this.handleCaseRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new CaseProcess(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    /**
     * Visits a basic transition ID comparison and creates a task task search expression.
     *
     * @param ctx - The transition ID basic parse tree context
     * @returns An array containing a single simple expression with task task category
     */
    override visitTransitionIdBasic = (ctx: TransitionIdBasicContext): Array<QueryItem> => {
        if (!!ctx.stringComparison().NOT()) {
            return [this.handleTaskRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new TaskTask(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    }

    /**
     * Visits a basic user ID comparison and creates a task assignee search expression.
     *
     * @param ctx - The user ID basic parse tree context
     * @returns An array containing a single simple expression with task assignee category
     */
    override visitUserIdBasic = (ctx: UserIdBasicContext): Array<QueryItem> => {
        if (!!ctx.stringComparison().NOT()) {
            return [this.handleTaskRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new TaskAssignee(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    /**
     * Visits a user ID null comparison and creates a task assignee search expression for null checks.
     *
     * @param ctx - The user ID null parse tree context
     * @returns An array containing a single simple expression with task assignee category and null operator
     */
    override visitUserIdNull = (ctx: UserIdNullContext): Array<QueryItem> => {
        if (!!ctx.nullComparison().NOT()) {
            return [this.handleTaskRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleNullComparisonContext();
        expr.category = new TaskAssignee(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    /**
     * Visits a basic process ID comparison for tasks and creates a task process search expression.
     *
     * @param ctx - The process ID basic parse tree context
     * @returns An array containing a single simple expression with task process category
     */
    override visitProcessIdBasic = (ctx: ProcessIdBasicContext): Array<QueryItem> => {
        if (!!ctx.stringComparison().NOT()) {
            return [this.handleTaskRawQuery(ctx.getText())];
        }
        const expr: SimpleExpression = this.handleStringComparisonContext(ctx.stringComparison());
        expr.category = new TaskProcess(this._operatorService, this._logger, this._categoryOptionalDependencies);
        return [expr];
    };

    /**
     * Handles a string comparison context and creates a simple expression with the appropriate operator and value.
     *
     * @param ctx - The string comparison parse tree context
     * @returns A simple expression with the extracted operator, string value, and negation flag
     */
    protected handleStringComparisonContext(ctx: StringComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: string = this.extractStringValueFromStringComparisonContext(ctx);
        return new SimpleExpression(operator, value);
    };

    /**
     * Handles a string LIKE comparison context and creates a simple expression with the LIKE operator.
     *
     * @param ctx - The string LIKE comparison parse tree context
     * @returns A simple expression with the LIKE operator, extracted string value, and negation flag
     */
    protected handleStringLikeComparisonContext(ctx: StringLikeComparisonContext): SimpleExpression {
        const operator: Operator<any> = new Like();
        const value: string = this.extractStringValueFromStringComparisonContext(ctx.stringComparison());
        return new SimpleExpression(operator, value);
    };

    /**
     * Extracts the string value from a string comparison context, handling both logged user attributes and literal strings.
     *
     * @param ctx - The string comparison parse tree context
     * @returns The extracted string value, either from logged user attributes or from a quoted string literal
     */
    protected extractStringValueFromStringComparisonContext(ctx: StringComparisonContext): string {
        let value: string;
        if (!!ctx.loggedUserStringAttribute()) {
            const loggedUserCtx = ctx.loggedUserStringAttribute();
            const user = this._userService.user;
            if (!!loggedUserCtx.LOGGED_USER_ID()) {
                value = user?.id;
            } else if (!!loggedUserCtx.LOGGED_USER_FULLNAME()) {
                value = user?.fullName;
            } else if (!!loggedUserCtx.LOGGED_USER_USERNAME()) {
                value = user?.email;
            }
        }
        if (!value) {
            value = this.removeSingleQuotesFromString(ctx.STRING()?.getText());
        }
        return value;
    }

    /**
     * Removes single quotes from the beginning and end of a string if they are present.
     *
     * @param value - The string value that may be enclosed in single quotes
     * @returns The string with single quotes removed, or the original string if not enclosed in quotes
     */
    protected removeSingleQuotesFromString(value: string): string {
        if (value && value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
            return value.substring(1, value.length - 1);
        }
        return value;
    }

    /**
     * Handles an object ID comparison context and creates a simple expression with the appropriate operator and ID value.
     *
     * @param ctx - The object ID comparison parse tree context
     * @returns A simple expression with the extracted operator, object ID value (either logged user ID or string literal), and negation flag
     */
    protected handleObjectIdComparisonContext(ctx: ObjectIdComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: string = !!ctx.LOGGED_USER_ID() ? this._userService.user?.id
            : this.removeSingleQuotesFromString(ctx.STRING()?.getText());
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a date comparison context and creates a simple expression with the appropriate date operator and date value.
     *
     * @param ctx - The date comparison parse tree context
     * @returns A simple expression with the date operator, extracted date value, and negation flag
     */
    protected handleDateComparisonContext(ctx: DateComparisonContext): SimpleExpression {
        const operator: Operator<any> = getDateOperatorFromToken(ctx._op, this._operatorService);
        const value: string = ctx.DATE()?.getText();
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a datetime comparison context and creates a simple expression with the appropriate datetime operator and datetime value.
     *
     * @param ctx - The datetime comparison parse tree context
     * @returns A simple expression with the datetime operator, extracted datetime value, and negation flag
     */
    protected handleDateTimeComparisonContext(ctx: DateTimeComparisonContext): SimpleExpression {
        const operator: Operator<any> = getDateTimeOperatorFromToken(ctx._op, this._operatorService);
        const value: string = ctx.DATETIME()?.getText();
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a date range context and creates a simple expression with the InRangeDate operator and date range values.
     *
     * @param ctx - The date range parse tree context
     * @returns A simple expression with the InRangeDate operator, and array of date values
     */
    protected handleDateRangeContext(ctx: DateRangeContext): SimpleExpression {
        const operator: Operator<any> = new InRangeDate();
        const value: string[] = ctx.DATE()?.map(terminalNode => terminalNode.getText());
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a datetime range context and creates a simple expression with the InRangeDateTime operator and datetime range values.
     *
     * @param ctx - The datetime range parse tree context
     * @returns A simple expression with the InRangeDateTime operator, and array of datetime values
     */
    protected handleDateTimeRangeContext(ctx: DateTimeRangeContext): SimpleExpression {
        const operator: Operator<any> = new InRangeDateTime();
        const value: string[] = ctx.DATETIME()?.map(terminalNode => terminalNode.getText());
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a number comparison context and creates a simple expression with the appropriate operator and numeric value.
     *
     * @param ctx - The number comparison parse tree context
     * @returns A simple expression with the extracted operator, numeric value (integer or double), and negation flag
     */
    protected handleNumberComparisonContext(ctx: NumberComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        let value: number;
        if (!!ctx.INT()) {
            value = parseInt(ctx.INT().getText(), 10);
        } else if (!!ctx.DOUBLE()) {
            value = parseFloat(ctx.DOUBLE().getText());
        }
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a number range comparison context and creates a simple expression with the InRange operator and numeric range values.
     *
     * @param ctx - The in-range number comparison parse tree context
     * @returns A simple expression with the InRange operator, array of numeric values (integer or double range), and negation flag
     */
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
        return new SimpleExpression(operator, [fromValue, toValue]);
    }

    /**
     * Handles a boolean comparison context and creates a simple expression with the appropriate operator and boolean value.
     *
     * @param ctx - The boolean comparison parse tree context
     * @returns A simple expression with the extracted operator, boolean value, and negation flag
     */
    protected handleBooleanComparisonContext(ctx: BooleanComparisonContext): SimpleExpression {
        const operator: Operator<any> = getOperatorFromToken(ctx._op);
        const value: boolean = ctx.BOOLEAN().getText().toLowerCase() === 'true';
        return new SimpleExpression(operator, value);
    }

    /**
     * Handles a null comparison context and creates a simple expression with the IsNull operator.
     *
     * @returns A simple expression with the IsNull operator
     */
    protected handleNullComparisonContext(): SimpleExpression {
        const operator: Operator<any> = new IsNull();
        return new SimpleExpression(operator, undefined);
    }

    /**
     * Handles a case raw query by wrapping it in a case plain query expression.
     *
     * This method is used when the query contains complex expressions that cannot be parsed
     * into structured query items (e.g., complex OR expressions with multiple branches or negations).
     * The raw query text is preserved and processed as a plain text query.
     *
     * @param query - The raw query string to be wrapped
     * @returns A raw expression containing the case plain query category and the original query text
     */
    protected handleCaseRawQuery(query: string): RawExpression {
        const category: CasePlainQuery = new CasePlainQuery(this._operatorService, this._logger);
        return new RawExpression(category, query);
    }

    /**
     * Handles a task raw query by wrapping it in a task plain query expression.
     *
     * This method is used when the query contains complex expressions that cannot be parsed
     * into structured query items (e.g., complex OR expressions with multiple branches or negations).
     * The raw query text is preserved and processed as a plain text query.
     *
     * @param query - The raw query string to be wrapped
     * @returns A raw expression containing the task plain query category and the original query text
     */
    protected handleTaskRawQuery(query: string): RawExpression {
        const category: TaskPlainQuery = new TaskPlainQuery(this._operatorService, this._logger);
        return new RawExpression(category, query);
    }
}
