
import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProcessQueryContext } from "./QueryLangParser.js";
import { CaseQueryContext } from "./QueryLangParser.js";
import { TaskQueryContext } from "./QueryLangParser.js";
import { UserQueryContext } from "./QueryLangParser.js";
import { ProcessConditionsAndPagingContext } from "./QueryLangParser.js";
import { CaseConditionsAndPagingContext } from "./QueryLangParser.js";
import { TaskConditionsAndPagingContext } from "./QueryLangParser.js";
import { UserConditionsAndPagingContext } from "./QueryLangParser.js";
import { ProcessConditionsContext } from "./QueryLangParser.js";
import { ProcessOrExpressionContext } from "./QueryLangParser.js";
import { ProcessAndExpressionContext } from "./QueryLangParser.js";
import { ProcessConditionGroupBasicContext } from "./QueryLangParser.js";
import { ProcessConditionGroupParenthesisContext } from "./QueryLangParser.js";
import { ProcessConditionContext } from "./QueryLangParser.js";
import { CaseConditionsContext } from "./QueryLangParser.js";
import { CaseOrExpressionContext } from "./QueryLangParser.js";
import { CaseAndExpressionContext } from "./QueryLangParser.js";
import { CaseConditionGroupBasicContext } from "./QueryLangParser.js";
import { CaseConditionGroupParenthesisContext } from "./QueryLangParser.js";
import { CaseConditionContext } from "./QueryLangParser.js";
import { TaskConditionsContext } from "./QueryLangParser.js";
import { TaskOrExpressionContext } from "./QueryLangParser.js";
import { TaskAndExpressionContext } from "./QueryLangParser.js";
import { TaskConditionGroupBasicContext } from "./QueryLangParser.js";
import { TaskConditionGroupParenthesisContext } from "./QueryLangParser.js";
import { TaskConditionContext } from "./QueryLangParser.js";
import { UserConditionsContext } from "./QueryLangParser.js";
import { UserOrExpressionContext } from "./QueryLangParser.js";
import { UserAndExpressionContext } from "./QueryLangParser.js";
import { UserConditionGroupBasicContext } from "./QueryLangParser.js";
import { UserConditionGroupParenthesisContext } from "./QueryLangParser.js";
import { UserConditionContext } from "./QueryLangParser.js";
import { DelimeterContext } from "./QueryLangParser.js";
import { PagingContext } from "./QueryLangParser.js";
import { ProcessSortingContext } from "./QueryLangParser.js";
import { ProcessAttributeOrderingContext } from "./QueryLangParser.js";
import { ProcessAttributeContext } from "./QueryLangParser.js";
import { CaseSortingContext } from "./QueryLangParser.js";
import { CaseAttributeOrderingContext } from "./QueryLangParser.js";
import { CaseAttributeContext } from "./QueryLangParser.js";
import { TaskSortingContext } from "./QueryLangParser.js";
import { TaskAttributeOrderingContext } from "./QueryLangParser.js";
import { TaskAttributeContext } from "./QueryLangParser.js";
import { UserSortingContext } from "./QueryLangParser.js";
import { UserAttributeOrderingContext } from "./QueryLangParser.js";
import { UserAttributeContext } from "./QueryLangParser.js";
import { ProcessComparisonsContext } from "./QueryLangParser.js";
import { CaseComparisonsContext } from "./QueryLangParser.js";
import { TaskComparisonsContext } from "./QueryLangParser.js";
import { UserComparisonsContext } from "./QueryLangParser.js";
import { IdBasicContext } from "./QueryLangParser.js";
import { IdListContext } from "./QueryLangParser.js";
import { IdNullContext } from "./QueryLangParser.js";
import { TitleBasicContext } from "./QueryLangParser.js";
import { TitleLikeContext } from "./QueryLangParser.js";
import { TitleListContext } from "./QueryLangParser.js";
import { TitleRangeContext } from "./QueryLangParser.js";
import { TitleNullContext } from "./QueryLangParser.js";
import { IdentifierBasicContext } from "./QueryLangParser.js";
import { IdentifierListContext } from "./QueryLangParser.js";
import { IdentifierRangeContext } from "./QueryLangParser.js";
import { IdentifierNullContext } from "./QueryLangParser.js";
import { VersionBasicContext } from "./QueryLangParser.js";
import { VersionListCmpContext } from "./QueryLangParser.js";
import { VersionRangeCmpContext } from "./QueryLangParser.js";
import { VersionNullContext } from "./QueryLangParser.js";
import { CdDateBasicContext } from "./QueryLangParser.js";
import { CdDateTimeBasicContext } from "./QueryLangParser.js";
import { CdDateListContext } from "./QueryLangParser.js";
import { CdDateRangeContext } from "./QueryLangParser.js";
import { CdNullContext } from "./QueryLangParser.js";
import { ProcessIdBasicContext } from "./QueryLangParser.js";
import { ProcessIdListContext } from "./QueryLangParser.js";
import { ProcessIdNullContext } from "./QueryLangParser.js";
import { ProcessIdObjIdBasicContext } from "./QueryLangParser.js";
import { ProcessIdObjIdListContext } from "./QueryLangParser.js";
import { ProcessIdObjNullContext } from "./QueryLangParser.js";
import { ProcessIdentifierBasicContext } from "./QueryLangParser.js";
import { ProcessIdentifierListContext } from "./QueryLangParser.js";
import { ProcessIdentifierRangeContext } from "./QueryLangParser.js";
import { ProcessIdentifierNullContext } from "./QueryLangParser.js";
import { AuthorBasicContext } from "./QueryLangParser.js";
import { AuthorListContext } from "./QueryLangParser.js";
import { AuthorNullContext } from "./QueryLangParser.js";
import { TransitionIdBasicContext } from "./QueryLangParser.js";
import { TransitionIdListContext } from "./QueryLangParser.js";
import { TransitionIdRangeContext } from "./QueryLangParser.js";
import { TransitionIdNullContext } from "./QueryLangParser.js";
import { StateComparisonContext } from "./QueryLangParser.js";
import { UserIdBasicContext } from "./QueryLangParser.js";
import { UserIdListContext } from "./QueryLangParser.js";
import { UserIdNullContext } from "./QueryLangParser.js";
import { CaseIdBasicContext } from "./QueryLangParser.js";
import { CaseIdListContext } from "./QueryLangParser.js";
import { CaseIdNullContext } from "./QueryLangParser.js";
import { LaDateBasicContext } from "./QueryLangParser.js";
import { LaDateTimeBasicContext } from "./QueryLangParser.js";
import { LaDateListContext } from "./QueryLangParser.js";
import { LaDateRangeContext } from "./QueryLangParser.js";
import { LaNullContext } from "./QueryLangParser.js";
import { LfDateBasicContext } from "./QueryLangParser.js";
import { LfDateTimeBasicContext } from "./QueryLangParser.js";
import { LfDateListContext } from "./QueryLangParser.js";
import { LfDateRangeContext } from "./QueryLangParser.js";
import { LfNullContext } from "./QueryLangParser.js";
import { NameBasicContext } from "./QueryLangParser.js";
import { NameListContext } from "./QueryLangParser.js";
import { NameRangeContext } from "./QueryLangParser.js";
import { NameNullContext } from "./QueryLangParser.js";
import { SurnameBasicContext } from "./QueryLangParser.js";
import { SurnameListContext } from "./QueryLangParser.js";
import { SurnameRangeContext } from "./QueryLangParser.js";
import { SurnameNullContext } from "./QueryLangParser.js";
import { EmailBasicContext } from "./QueryLangParser.js";
import { EmailListContext } from "./QueryLangParser.js";
import { EmailRangeContext } from "./QueryLangParser.js";
import { EmailNullContext } from "./QueryLangParser.js";
import { DataStringContext } from "./QueryLangParser.js";
import { DataStringLikeContext } from "./QueryLangParser.js";
import { DataNumberContext } from "./QueryLangParser.js";
import { DataDateContext } from "./QueryLangParser.js";
import { DataDatetimeContext } from "./QueryLangParser.js";
import { DataBooleanContext } from "./QueryLangParser.js";
import { DataStringListContext } from "./QueryLangParser.js";
import { DataNumberListContext } from "./QueryLangParser.js";
import { DataDateListContext } from "./QueryLangParser.js";
import { DataStringRangeContext } from "./QueryLangParser.js";
import { DataNumberRangeContext } from "./QueryLangParser.js";
import { DataDateRangeContext } from "./QueryLangParser.js";
import { DataNullContext } from "./QueryLangParser.js";
import { DataOptionsBasicContext } from "./QueryLangParser.js";
import { DataOptionsListContext } from "./QueryLangParser.js";
import { DataOptionsRangeContext } from "./QueryLangParser.js";
import { DataOptionsNullContext } from "./QueryLangParser.js";
import { PlacesBasicContext } from "./QueryLangParser.js";
import { PlacesListContext } from "./QueryLangParser.js";
import { PlacesRangeContext } from "./QueryLangParser.js";
import { PlacesNullContext } from "./QueryLangParser.js";
import { TasksStateComparisonContext } from "./QueryLangParser.js";
import { TasksUserIdBasicContext } from "./QueryLangParser.js";
import { TasksUserIdListContext } from "./QueryLangParser.js";
import { TasksUserIdNullContext } from "./QueryLangParser.js";
import { ObjectIdComparisonContext } from "./QueryLangParser.js";
import { StringComparisonContext } from "./QueryLangParser.js";
import { StringLikeComparisonContext } from "./QueryLangParser.js";
import { NumberComparisonContext } from "./QueryLangParser.js";
import { DateComparisonContext } from "./QueryLangParser.js";
import { DateTimeComparisonContext } from "./QueryLangParser.js";
import { BooleanComparisonContext } from "./QueryLangParser.js";
import { NullComparisonContext } from "./QueryLangParser.js";
import { InListStringComparisonContext } from "./QueryLangParser.js";
import { InListNumberComparisonContext } from "./QueryLangParser.js";
import { InListDateComparisonContext } from "./QueryLangParser.js";
import { InListVersionComparisonContext } from "./QueryLangParser.js";
import { InRangeStringComparisonContext } from "./QueryLangParser.js";
import { InRangeNumberComparisonContext } from "./QueryLangParser.js";
import { InRangeDateComparisonContext } from "./QueryLangParser.js";
import { InRangeVersionComparisonContext } from "./QueryLangParser.js";
import { DataValueContext } from "./QueryLangParser.js";
import { DataOptionsContext } from "./QueryLangParser.js";
import { PlacesContext } from "./QueryLangParser.js";
import { TasksStateContext } from "./QueryLangParser.js";
import { TasksUserIdContext } from "./QueryLangParser.js";
import { JavaIdContext } from "./QueryLangParser.js";
import { StringListContext } from "./QueryLangParser.js";
import { IntListContext } from "./QueryLangParser.js";
import { DoubleListContext } from "./QueryLangParser.js";
import { DateListContext } from "./QueryLangParser.js";
import { DateTimeListContext } from "./QueryLangParser.js";
import { VersionListContext } from "./QueryLangParser.js";
import { StringRangeContext } from "./QueryLangParser.js";
import { IntRangeContext } from "./QueryLangParser.js";
import { DoubleRangeContext } from "./QueryLangParser.js";
import { DateRangeContext } from "./QueryLangParser.js";
import { DateTimeRangeContext } from "./QueryLangParser.js";
import { VersionRangeContext } from "./QueryLangParser.js";
import { LoggedUserStringAttributeContext } from "./QueryLangParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QueryLangParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class QueryLangVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by the `processQuery`
     * labeled alternative in `QueryLangParser.query`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessQuery?: (ctx: ProcessQueryContext) => Result;
    /**
     * Visit a parse tree produced by the `caseQuery`
     * labeled alternative in `QueryLangParser.query`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseQuery?: (ctx: CaseQueryContext) => Result;
    /**
     * Visit a parse tree produced by the `taskQuery`
     * labeled alternative in `QueryLangParser.query`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskQuery?: (ctx: TaskQueryContext) => Result;
    /**
     * Visit a parse tree produced by the `userQuery`
     * labeled alternative in `QueryLangParser.query`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserQuery?: (ctx: UserQueryContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processConditionsAndPaging`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessConditionsAndPaging?: (ctx: ProcessConditionsAndPagingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseConditionsAndPaging`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseConditionsAndPaging?: (ctx: CaseConditionsAndPagingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskConditionsAndPaging`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskConditionsAndPaging?: (ctx: TaskConditionsAndPagingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userConditionsAndPaging`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserConditionsAndPaging?: (ctx: UserConditionsAndPagingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processConditions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessConditions?: (ctx: ProcessConditionsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processOrExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessOrExpression?: (ctx: ProcessOrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processAndExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessAndExpression?: (ctx: ProcessAndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `processConditionGroupBasic`
     * labeled alternative in `QueryLangParser.processConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessConditionGroupBasic?: (ctx: ProcessConditionGroupBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `processConditionGroupParenthesis`
     * labeled alternative in `QueryLangParser.processConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessConditionGroupParenthesis?: (ctx: ProcessConditionGroupParenthesisContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processCondition`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessCondition?: (ctx: ProcessConditionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseConditions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseConditions?: (ctx: CaseConditionsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseOrExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseOrExpression?: (ctx: CaseOrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseAndExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseAndExpression?: (ctx: CaseAndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `caseConditionGroupBasic`
     * labeled alternative in `QueryLangParser.caseConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseConditionGroupBasic?: (ctx: CaseConditionGroupBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `caseConditionGroupParenthesis`
     * labeled alternative in `QueryLangParser.caseConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseConditionGroupParenthesis?: (ctx: CaseConditionGroupParenthesisContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseCondition`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseCondition?: (ctx: CaseConditionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskConditions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskConditions?: (ctx: TaskConditionsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskOrExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskOrExpression?: (ctx: TaskOrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskAndExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskAndExpression?: (ctx: TaskAndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `taskConditionGroupBasic`
     * labeled alternative in `QueryLangParser.taskConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskConditionGroupBasic?: (ctx: TaskConditionGroupBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `taskConditionGroupParenthesis`
     * labeled alternative in `QueryLangParser.taskConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskConditionGroupParenthesis?: (ctx: TaskConditionGroupParenthesisContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskCondition`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskCondition?: (ctx: TaskConditionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userConditions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserConditions?: (ctx: UserConditionsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userOrExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserOrExpression?: (ctx: UserOrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userAndExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserAndExpression?: (ctx: UserAndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by the `userConditionGroupBasic`
     * labeled alternative in `QueryLangParser.userConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserConditionGroupBasic?: (ctx: UserConditionGroupBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `userConditionGroupParenthesis`
     * labeled alternative in `QueryLangParser.userConditionGroup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserConditionGroupParenthesis?: (ctx: UserConditionGroupParenthesisContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userCondition`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserCondition?: (ctx: UserConditionContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.delimeter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDelimeter?: (ctx: DelimeterContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.paging`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPaging?: (ctx: PagingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processSorting`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessSorting?: (ctx: ProcessSortingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processAttributeOrdering`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessAttributeOrdering?: (ctx: ProcessAttributeOrderingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processAttribute`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessAttribute?: (ctx: ProcessAttributeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseSorting`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseSorting?: (ctx: CaseSortingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseAttributeOrdering`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseAttributeOrdering?: (ctx: CaseAttributeOrderingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseAttribute`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseAttribute?: (ctx: CaseAttributeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskSorting`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskSorting?: (ctx: TaskSortingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskAttributeOrdering`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskAttributeOrdering?: (ctx: TaskAttributeOrderingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskAttribute`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskAttribute?: (ctx: TaskAttributeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userSorting`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserSorting?: (ctx: UserSortingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userAttributeOrdering`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserAttributeOrdering?: (ctx: UserAttributeOrderingContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userAttribute`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserAttribute?: (ctx: UserAttributeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.processComparisons`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessComparisons?: (ctx: ProcessComparisonsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.caseComparisons`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseComparisons?: (ctx: CaseComparisonsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.taskComparisons`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTaskComparisons?: (ctx: TaskComparisonsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.userComparisons`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserComparisons?: (ctx: UserComparisonsContext) => Result;
    /**
     * Visit a parse tree produced by the `idBasic`
     * labeled alternative in `QueryLangParser.idComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdBasic?: (ctx: IdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `idList`
     * labeled alternative in `QueryLangParser.idComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdList?: (ctx: IdListContext) => Result;
    /**
     * Visit a parse tree produced by the `idNull`
     * labeled alternative in `QueryLangParser.idComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdNull?: (ctx: IdNullContext) => Result;
    /**
     * Visit a parse tree produced by the `titleBasic`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleBasic?: (ctx: TitleBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `titleLike`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleLike?: (ctx: TitleLikeContext) => Result;
    /**
     * Visit a parse tree produced by the `titleList`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleList?: (ctx: TitleListContext) => Result;
    /**
     * Visit a parse tree produced by the `titleRange`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleRange?: (ctx: TitleRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `titleNull`
     * labeled alternative in `QueryLangParser.titleComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTitleNull?: (ctx: TitleNullContext) => Result;
    /**
     * Visit a parse tree produced by the `identifierBasic`
     * labeled alternative in `QueryLangParser.identifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifierBasic?: (ctx: IdentifierBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `identifierList`
     * labeled alternative in `QueryLangParser.identifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifierList?: (ctx: IdentifierListContext) => Result;
    /**
     * Visit a parse tree produced by the `identifierRange`
     * labeled alternative in `QueryLangParser.identifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifierRange?: (ctx: IdentifierRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `identifierNull`
     * labeled alternative in `QueryLangParser.identifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifierNull?: (ctx: IdentifierNullContext) => Result;
    /**
     * Visit a parse tree produced by the `versionBasic`
     * labeled alternative in `QueryLangParser.versionComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionBasic?: (ctx: VersionBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `versionListCmp`
     * labeled alternative in `QueryLangParser.versionComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionListCmp?: (ctx: VersionListCmpContext) => Result;
    /**
     * Visit a parse tree produced by the `versionRangeCmp`
     * labeled alternative in `QueryLangParser.versionComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionRangeCmp?: (ctx: VersionRangeCmpContext) => Result;
    /**
     * Visit a parse tree produced by the `versionNull`
     * labeled alternative in `QueryLangParser.versionComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionNull?: (ctx: VersionNullContext) => Result;
    /**
     * Visit a parse tree produced by the `cdDateBasic`
     * labeled alternative in `QueryLangParser.creationDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCdDateBasic?: (ctx: CdDateBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `cdDateTimeBasic`
     * labeled alternative in `QueryLangParser.creationDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCdDateTimeBasic?: (ctx: CdDateTimeBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `cdDateList`
     * labeled alternative in `QueryLangParser.creationDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCdDateList?: (ctx: CdDateListContext) => Result;
    /**
     * Visit a parse tree produced by the `cdDateRange`
     * labeled alternative in `QueryLangParser.creationDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCdDateRange?: (ctx: CdDateRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `cdNull`
     * labeled alternative in `QueryLangParser.creationDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCdNull?: (ctx: CdNullContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdBasic`
     * labeled alternative in `QueryLangParser.processIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdBasic?: (ctx: ProcessIdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdList`
     * labeled alternative in `QueryLangParser.processIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdList?: (ctx: ProcessIdListContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdNull`
     * labeled alternative in `QueryLangParser.processIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdNull?: (ctx: ProcessIdNullContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdObjIdBasic`
     * labeled alternative in `QueryLangParser.processIdObjIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdObjIdBasic?: (ctx: ProcessIdObjIdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdObjIdList`
     * labeled alternative in `QueryLangParser.processIdObjIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdObjIdList?: (ctx: ProcessIdObjIdListContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdObjNull`
     * labeled alternative in `QueryLangParser.processIdObjIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdObjNull?: (ctx: ProcessIdObjNullContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdentifierBasic`
     * labeled alternative in `QueryLangParser.processIdentifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdentifierBasic?: (ctx: ProcessIdentifierBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdentifierList`
     * labeled alternative in `QueryLangParser.processIdentifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdentifierList?: (ctx: ProcessIdentifierListContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdentifierRange`
     * labeled alternative in `QueryLangParser.processIdentifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdentifierRange?: (ctx: ProcessIdentifierRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `processIdentifierNull`
     * labeled alternative in `QueryLangParser.processIdentifierComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcessIdentifierNull?: (ctx: ProcessIdentifierNullContext) => Result;
    /**
     * Visit a parse tree produced by the `authorBasic`
     * labeled alternative in `QueryLangParser.authorComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAuthorBasic?: (ctx: AuthorBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `authorList`
     * labeled alternative in `QueryLangParser.authorComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAuthorList?: (ctx: AuthorListContext) => Result;
    /**
     * Visit a parse tree produced by the `authorNull`
     * labeled alternative in `QueryLangParser.authorComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAuthorNull?: (ctx: AuthorNullContext) => Result;
    /**
     * Visit a parse tree produced by the `transitionIdBasic`
     * labeled alternative in `QueryLangParser.transitionIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTransitionIdBasic?: (ctx: TransitionIdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `transitionIdList`
     * labeled alternative in `QueryLangParser.transitionIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTransitionIdList?: (ctx: TransitionIdListContext) => Result;
    /**
     * Visit a parse tree produced by the `transitionIdRange`
     * labeled alternative in `QueryLangParser.transitionIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTransitionIdRange?: (ctx: TransitionIdRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `transitionIdNull`
     * labeled alternative in `QueryLangParser.transitionIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTransitionIdNull?: (ctx: TransitionIdNullContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.stateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStateComparison?: (ctx: StateComparisonContext) => Result;
    /**
     * Visit a parse tree produced by the `userIdBasic`
     * labeled alternative in `QueryLangParser.userIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserIdBasic?: (ctx: UserIdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `userIdList`
     * labeled alternative in `QueryLangParser.userIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserIdList?: (ctx: UserIdListContext) => Result;
    /**
     * Visit a parse tree produced by the `userIdNull`
     * labeled alternative in `QueryLangParser.userIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserIdNull?: (ctx: UserIdNullContext) => Result;
    /**
     * Visit a parse tree produced by the `caseIdBasic`
     * labeled alternative in `QueryLangParser.caseIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseIdBasic?: (ctx: CaseIdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `caseIdList`
     * labeled alternative in `QueryLangParser.caseIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseIdList?: (ctx: CaseIdListContext) => Result;
    /**
     * Visit a parse tree produced by the `caseIdNull`
     * labeled alternative in `QueryLangParser.caseIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseIdNull?: (ctx: CaseIdNullContext) => Result;
    /**
     * Visit a parse tree produced by the `laDateBasic`
     * labeled alternative in `QueryLangParser.lastAssignComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLaDateBasic?: (ctx: LaDateBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `laDateTimeBasic`
     * labeled alternative in `QueryLangParser.lastAssignComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLaDateTimeBasic?: (ctx: LaDateTimeBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `laDateList`
     * labeled alternative in `QueryLangParser.lastAssignComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLaDateList?: (ctx: LaDateListContext) => Result;
    /**
     * Visit a parse tree produced by the `laDateRange`
     * labeled alternative in `QueryLangParser.lastAssignComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLaDateRange?: (ctx: LaDateRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `laNull`
     * labeled alternative in `QueryLangParser.lastAssignComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLaNull?: (ctx: LaNullContext) => Result;
    /**
     * Visit a parse tree produced by the `lfDateBasic`
     * labeled alternative in `QueryLangParser.lastFinishComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLfDateBasic?: (ctx: LfDateBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `lfDateTimeBasic`
     * labeled alternative in `QueryLangParser.lastFinishComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLfDateTimeBasic?: (ctx: LfDateTimeBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `lfDateList`
     * labeled alternative in `QueryLangParser.lastFinishComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLfDateList?: (ctx: LfDateListContext) => Result;
    /**
     * Visit a parse tree produced by the `lfDateRange`
     * labeled alternative in `QueryLangParser.lastFinishComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLfDateRange?: (ctx: LfDateRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `lfNull`
     * labeled alternative in `QueryLangParser.lastFinishComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLfNull?: (ctx: LfNullContext) => Result;
    /**
     * Visit a parse tree produced by the `nameBasic`
     * labeled alternative in `QueryLangParser.nameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNameBasic?: (ctx: NameBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `nameList`
     * labeled alternative in `QueryLangParser.nameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNameList?: (ctx: NameListContext) => Result;
    /**
     * Visit a parse tree produced by the `nameRange`
     * labeled alternative in `QueryLangParser.nameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNameRange?: (ctx: NameRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `nameNull`
     * labeled alternative in `QueryLangParser.nameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNameNull?: (ctx: NameNullContext) => Result;
    /**
     * Visit a parse tree produced by the `surnameBasic`
     * labeled alternative in `QueryLangParser.surnameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSurnameBasic?: (ctx: SurnameBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `surnameList`
     * labeled alternative in `QueryLangParser.surnameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSurnameList?: (ctx: SurnameListContext) => Result;
    /**
     * Visit a parse tree produced by the `surnameRange`
     * labeled alternative in `QueryLangParser.surnameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSurnameRange?: (ctx: SurnameRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `surnameNull`
     * labeled alternative in `QueryLangParser.surnameComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSurnameNull?: (ctx: SurnameNullContext) => Result;
    /**
     * Visit a parse tree produced by the `emailBasic`
     * labeled alternative in `QueryLangParser.emailComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEmailBasic?: (ctx: EmailBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `emailList`
     * labeled alternative in `QueryLangParser.emailComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEmailList?: (ctx: EmailListContext) => Result;
    /**
     * Visit a parse tree produced by the `emailRange`
     * labeled alternative in `QueryLangParser.emailComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEmailRange?: (ctx: EmailRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `emailNull`
     * labeled alternative in `QueryLangParser.emailComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEmailNull?: (ctx: EmailNullContext) => Result;
    /**
     * Visit a parse tree produced by the `dataString`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataString?: (ctx: DataStringContext) => Result;
    /**
     * Visit a parse tree produced by the `dataStringLike`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataStringLike?: (ctx: DataStringLikeContext) => Result;
    /**
     * Visit a parse tree produced by the `dataNumber`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataNumber?: (ctx: DataNumberContext) => Result;
    /**
     * Visit a parse tree produced by the `dataDate`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataDate?: (ctx: DataDateContext) => Result;
    /**
     * Visit a parse tree produced by the `dataDatetime`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataDatetime?: (ctx: DataDatetimeContext) => Result;
    /**
     * Visit a parse tree produced by the `dataBoolean`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataBoolean?: (ctx: DataBooleanContext) => Result;
    /**
     * Visit a parse tree produced by the `dataStringList`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataStringList?: (ctx: DataStringListContext) => Result;
    /**
     * Visit a parse tree produced by the `dataNumberList`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataNumberList?: (ctx: DataNumberListContext) => Result;
    /**
     * Visit a parse tree produced by the `dataDateList`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataDateList?: (ctx: DataDateListContext) => Result;
    /**
     * Visit a parse tree produced by the `dataStringRange`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataStringRange?: (ctx: DataStringRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `dataNumberRange`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataNumberRange?: (ctx: DataNumberRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `dataDateRange`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataDateRange?: (ctx: DataDateRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `dataNull`
     * labeled alternative in `QueryLangParser.dataValueComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataNull?: (ctx: DataNullContext) => Result;
    /**
     * Visit a parse tree produced by the `dataOptionsBasic`
     * labeled alternative in `QueryLangParser.dataOptionsComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataOptionsBasic?: (ctx: DataOptionsBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `dataOptionsList`
     * labeled alternative in `QueryLangParser.dataOptionsComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataOptionsList?: (ctx: DataOptionsListContext) => Result;
    /**
     * Visit a parse tree produced by the `dataOptionsRange`
     * labeled alternative in `QueryLangParser.dataOptionsComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataOptionsRange?: (ctx: DataOptionsRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `dataOptionsNull`
     * labeled alternative in `QueryLangParser.dataOptionsComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataOptionsNull?: (ctx: DataOptionsNullContext) => Result;
    /**
     * Visit a parse tree produced by the `placesBasic`
     * labeled alternative in `QueryLangParser.placesComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPlacesBasic?: (ctx: PlacesBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `placesList`
     * labeled alternative in `QueryLangParser.placesComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPlacesList?: (ctx: PlacesListContext) => Result;
    /**
     * Visit a parse tree produced by the `placesRange`
     * labeled alternative in `QueryLangParser.placesComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPlacesRange?: (ctx: PlacesRangeContext) => Result;
    /**
     * Visit a parse tree produced by the `placesNull`
     * labeled alternative in `QueryLangParser.placesComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPlacesNull?: (ctx: PlacesNullContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.tasksStateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTasksStateComparison?: (ctx: TasksStateComparisonContext) => Result;
    /**
     * Visit a parse tree produced by the `tasksUserIdBasic`
     * labeled alternative in `QueryLangParser.tasksUserIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTasksUserIdBasic?: (ctx: TasksUserIdBasicContext) => Result;
    /**
     * Visit a parse tree produced by the `tasksUserIdList`
     * labeled alternative in `QueryLangParser.tasksUserIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTasksUserIdList?: (ctx: TasksUserIdListContext) => Result;
    /**
     * Visit a parse tree produced by the `tasksUserIdNull`
     * labeled alternative in `QueryLangParser.tasksUserIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTasksUserIdNull?: (ctx: TasksUserIdNullContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.objectIdComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitObjectIdComparison?: (ctx: ObjectIdComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.stringComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringComparison?: (ctx: StringComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.stringLikeComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringLikeComparison?: (ctx: StringLikeComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.numberComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumberComparison?: (ctx: NumberComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDateComparison?: (ctx: DateComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dateTimeComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDateTimeComparison?: (ctx: DateTimeComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.booleanComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanComparison?: (ctx: BooleanComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.nullComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNullComparison?: (ctx: NullComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inListStringComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInListStringComparison?: (ctx: InListStringComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inListNumberComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInListNumberComparison?: (ctx: InListNumberComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inListDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInListDateComparison?: (ctx: InListDateComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inListVersionComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInListVersionComparison?: (ctx: InListVersionComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inRangeStringComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInRangeStringComparison?: (ctx: InRangeStringComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inRangeNumberComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInRangeNumberComparison?: (ctx: InRangeNumberComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inRangeDateComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInRangeDateComparison?: (ctx: InRangeDateComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.inRangeVersionComparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInRangeVersionComparison?: (ctx: InRangeVersionComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dataValue`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataValue?: (ctx: DataValueContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dataOptions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDataOptions?: (ctx: DataOptionsContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.places`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPlaces?: (ctx: PlacesContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.tasksState`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTasksState?: (ctx: TasksStateContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.tasksUserId`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTasksUserId?: (ctx: TasksUserIdContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.javaId`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitJavaId?: (ctx: JavaIdContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.stringList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringList?: (ctx: StringListContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.intList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIntList?: (ctx: IntListContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.doubleList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDoubleList?: (ctx: DoubleListContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dateList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDateList?: (ctx: DateListContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dateTimeList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDateTimeList?: (ctx: DateTimeListContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.versionList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionList?: (ctx: VersionListContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.stringRange`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringRange?: (ctx: StringRangeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.intRange`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIntRange?: (ctx: IntRangeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.doubleRange`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDoubleRange?: (ctx: DoubleRangeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dateRange`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDateRange?: (ctx: DateRangeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.dateTimeRange`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDateTimeRange?: (ctx: DateTimeRangeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.versionRange`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionRange?: (ctx: VersionRangeContext) => Result;
    /**
     * Visit a parse tree produced by `QueryLangParser.loggedUserStringAttribute`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLoggedUserStringAttribute?: (ctx: LoggedUserStringAttributeContext) => Result;
}

