
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { QueryLangVisitor } from "./QueryLangVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class QueryLangParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly WHERE = 8;
    public static readonly AND = 9;
    public static readonly OR = 10;
    public static readonly NOT = 11;
    public static readonly EQ = 12;
    public static readonly NEQ = 13;
    public static readonly LT = 14;
    public static readonly GT = 15;
    public static readonly LTE = 16;
    public static readonly GTE = 17;
    public static readonly CONTAINS = 18;
    public static readonly IN = 19;
    public static readonly CASE = 20;
    public static readonly CASES = 21;
    public static readonly TASK = 22;
    public static readonly TASKS = 23;
    public static readonly USER = 24;
    public static readonly USERS = 25;
    public static readonly PROCESS = 26;
    public static readonly PROCESSES = 27;
    public static readonly ID = 28;
    public static readonly TITLE = 29;
    public static readonly IDENTIFIER = 30;
    public static readonly VERSION = 31;
    public static readonly CREATION_DATE = 32;
    public static readonly PROCESS_ID = 33;
    public static readonly PROCESS_IDENTIFIER = 34;
    public static readonly AUTHOR = 35;
    public static readonly PLACES = 36;
    public static readonly TRANSITION_ID = 37;
    public static readonly STATE = 38;
    public static readonly USER_ID = 39;
    public static readonly CASE_ID = 40;
    public static readonly LAST_ASSIGN = 41;
    public static readonly LAST_FINISH = 42;
    public static readonly NAME = 43;
    public static readonly SURNAME = 44;
    public static readonly EMAIL = 45;
    public static readonly DATA = 46;
    public static readonly VALUE = 47;
    public static readonly OPTIONS = 48;
    public static readonly MARKING = 49;
    public static readonly ENABLED = 50;
    public static readonly DISABLED = 51;
    public static readonly PAGE = 52;
    public static readonly SIZE = 53;
    public static readonly SORT_BY = 54;
    public static readonly ASC = 55;
    public static readonly DESC = 56;
    public static readonly STRING = 57;
    public static readonly INT = 58;
    public static readonly DOUBLE = 59;
    public static readonly DATETIME = 60;
    public static readonly DATE = 61;
    public static readonly BOOLEAN = 62;
    public static readonly VERSION_NUMBER = 63;
    public static readonly NULL = 64;
    public static readonly LIKE = 65;
    public static readonly JAVA_ID = 66;
    public static readonly SPACE = 67;
    public static readonly ANY = 68;
    public static readonly LOGGED_USER_ID = 69;
    public static readonly LOGGED_USER_FULLNAME = 70;
    public static readonly LOGGED_USER_USERNAME = 71;
    public static readonly LOGGED_USER_ANONYMOUS = 72;
    public static readonly RULE_query = 0;
    public static readonly RULE_processConditionsAndPaging = 1;
    public static readonly RULE_caseConditionsAndPaging = 2;
    public static readonly RULE_taskConditionsAndPaging = 3;
    public static readonly RULE_userConditionsAndPaging = 4;
    public static readonly RULE_processConditions = 5;
    public static readonly RULE_processOrExpression = 6;
    public static readonly RULE_processAndExpression = 7;
    public static readonly RULE_processConditionGroup = 8;
    public static readonly RULE_processCondition = 9;
    public static readonly RULE_caseConditions = 10;
    public static readonly RULE_caseOrExpression = 11;
    public static readonly RULE_caseAndExpression = 12;
    public static readonly RULE_caseConditionGroup = 13;
    public static readonly RULE_caseCondition = 14;
    public static readonly RULE_taskConditions = 15;
    public static readonly RULE_taskOrExpression = 16;
    public static readonly RULE_taskAndExpression = 17;
    public static readonly RULE_taskConditionGroup = 18;
    public static readonly RULE_taskCondition = 19;
    public static readonly RULE_userConditions = 20;
    public static readonly RULE_userOrExpression = 21;
    public static readonly RULE_userAndExpression = 22;
    public static readonly RULE_userConditionGroup = 23;
    public static readonly RULE_userCondition = 24;
    public static readonly RULE_delimeter = 25;
    public static readonly RULE_paging = 26;
    public static readonly RULE_processSorting = 27;
    public static readonly RULE_processAttributeOrdering = 28;
    public static readonly RULE_processAttribute = 29;
    public static readonly RULE_caseSorting = 30;
    public static readonly RULE_caseAttributeOrdering = 31;
    public static readonly RULE_caseAttribute = 32;
    public static readonly RULE_taskSorting = 33;
    public static readonly RULE_taskAttributeOrdering = 34;
    public static readonly RULE_taskAttribute = 35;
    public static readonly RULE_userSorting = 36;
    public static readonly RULE_userAttributeOrdering = 37;
    public static readonly RULE_userAttribute = 38;
    public static readonly RULE_processComparisons = 39;
    public static readonly RULE_caseComparisons = 40;
    public static readonly RULE_taskComparisons = 41;
    public static readonly RULE_userComparisons = 42;
    public static readonly RULE_idComparison = 43;
    public static readonly RULE_titleComparison = 44;
    public static readonly RULE_identifierComparison = 45;
    public static readonly RULE_versionComparison = 46;
    public static readonly RULE_creationDateComparison = 47;
    public static readonly RULE_processIdComparison = 48;
    public static readonly RULE_processIdObjIdComparison = 49;
    public static readonly RULE_processIdentifierComparison = 50;
    public static readonly RULE_authorComparison = 51;
    public static readonly RULE_transitionIdComparison = 52;
    public static readonly RULE_stateComparison = 53;
    public static readonly RULE_userIdComparison = 54;
    public static readonly RULE_caseIdComparison = 55;
    public static readonly RULE_lastAssignComparison = 56;
    public static readonly RULE_lastFinishComparison = 57;
    public static readonly RULE_nameComparison = 58;
    public static readonly RULE_surnameComparison = 59;
    public static readonly RULE_emailComparison = 60;
    public static readonly RULE_dataValueComparison = 61;
    public static readonly RULE_dataOptionsComparison = 62;
    public static readonly RULE_placesComparison = 63;
    public static readonly RULE_tasksStateComparison = 64;
    public static readonly RULE_tasksUserIdComparison = 65;
    public static readonly RULE_objectIdComparison = 66;
    public static readonly RULE_stringComparison = 67;
    public static readonly RULE_stringLikeComparison = 68;
    public static readonly RULE_numberComparison = 69;
    public static readonly RULE_dateComparison = 70;
    public static readonly RULE_dateTimeComparison = 71;
    public static readonly RULE_booleanComparison = 72;
    public static readonly RULE_nullComparison = 73;
    public static readonly RULE_inListStringComparison = 74;
    public static readonly RULE_inListNumberComparison = 75;
    public static readonly RULE_inListDateComparison = 76;
    public static readonly RULE_inListVersionComparison = 77;
    public static readonly RULE_inRangeStringComparison = 78;
    public static readonly RULE_inRangeNumberComparison = 79;
    public static readonly RULE_inRangeDateComparison = 80;
    public static readonly RULE_inRangeVersionComparison = 81;
    public static readonly RULE_dataValue = 82;
    public static readonly RULE_dataOptions = 83;
    public static readonly RULE_places = 84;
    public static readonly RULE_tasksState = 85;
    public static readonly RULE_tasksUserId = 86;
    public static readonly RULE_javaId = 87;
    public static readonly RULE_stringList = 88;
    public static readonly RULE_intList = 89;
    public static readonly RULE_doubleList = 90;
    public static readonly RULE_dateList = 91;
    public static readonly RULE_dateTimeList = 92;
    public static readonly RULE_versionList = 93;
    public static readonly RULE_stringRange = 94;
    public static readonly RULE_intRange = 95;
    public static readonly RULE_doubleRange = 96;
    public static readonly RULE_dateRange = 97;
    public static readonly RULE_dateTimeRange = 98;
    public static readonly RULE_versionRange = 99;
    public static readonly RULE_loggedUserStringAttribute = 100;

    public static readonly literalNames = [
        null, "'('", "')'", "':'", "','", "'.'", "'['", "']'", null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        "'*'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, "WHERE", "AND", 
        "OR", "NOT", "EQ", "NEQ", "LT", "GT", "LTE", "GTE", "CONTAINS", 
        "IN", "CASE", "CASES", "TASK", "TASKS", "USER", "USERS", "PROCESS", 
        "PROCESSES", "ID", "TITLE", "IDENTIFIER", "VERSION", "CREATION_DATE", 
        "PROCESS_ID", "PROCESS_IDENTIFIER", "AUTHOR", "PLACES", "TRANSITION_ID", 
        "STATE", "USER_ID", "CASE_ID", "LAST_ASSIGN", "LAST_FINISH", "NAME", 
        "SURNAME", "EMAIL", "DATA", "VALUE", "OPTIONS", "MARKING", "ENABLED", 
        "DISABLED", "PAGE", "SIZE", "SORT_BY", "ASC", "DESC", "STRING", 
        "INT", "DOUBLE", "DATETIME", "DATE", "BOOLEAN", "VERSION_NUMBER", 
        "NULL", "LIKE", "JAVA_ID", "SPACE", "ANY", "LOGGED_USER_ID", "LOGGED_USER_FULLNAME", 
        "LOGGED_USER_USERNAME", "LOGGED_USER_ANONYMOUS"
    ];
    public static readonly ruleNames = [
        "query", "processConditionsAndPaging", "caseConditionsAndPaging", 
        "taskConditionsAndPaging", "userConditionsAndPaging", "processConditions", 
        "processOrExpression", "processAndExpression", "processConditionGroup", 
        "processCondition", "caseConditions", "caseOrExpression", "caseAndExpression", 
        "caseConditionGroup", "caseCondition", "taskConditions", "taskOrExpression", 
        "taskAndExpression", "taskConditionGroup", "taskCondition", "userConditions", 
        "userOrExpression", "userAndExpression", "userConditionGroup", "userCondition", 
        "delimeter", "paging", "processSorting", "processAttributeOrdering", 
        "processAttribute", "caseSorting", "caseAttributeOrdering", "caseAttribute", 
        "taskSorting", "taskAttributeOrdering", "taskAttribute", "userSorting", 
        "userAttributeOrdering", "userAttribute", "processComparisons", 
        "caseComparisons", "taskComparisons", "userComparisons", "idComparison", 
        "titleComparison", "identifierComparison", "versionComparison", 
        "creationDateComparison", "processIdComparison", "processIdObjIdComparison", 
        "processIdentifierComparison", "authorComparison", "transitionIdComparison", 
        "stateComparison", "userIdComparison", "caseIdComparison", "lastAssignComparison", 
        "lastFinishComparison", "nameComparison", "surnameComparison", "emailComparison", 
        "dataValueComparison", "dataOptionsComparison", "placesComparison", 
        "tasksStateComparison", "tasksUserIdComparison", "objectIdComparison", 
        "stringComparison", "stringLikeComparison", "numberComparison", 
        "dateComparison", "dateTimeComparison", "booleanComparison", "nullComparison", 
        "inListStringComparison", "inListNumberComparison", "inListDateComparison", 
        "inListVersionComparison", "inRangeStringComparison", "inRangeNumberComparison", 
        "inRangeDateComparison", "inRangeVersionComparison", "dataValue", 
        "dataOptions", "places", "tasksState", "tasksUserId", "javaId", 
        "stringList", "intList", "doubleList", "dateList", "dateTimeList", 
        "versionList", "stringRange", "intRange", "doubleRange", "dateRange", 
        "dateTimeRange", "versionRange", "loggedUserStringAttribute",
    ];

    public get grammarFileName(): string { return "QueryLang.g4"; }
    public get literalNames(): (string | null)[] { return QueryLangParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return QueryLangParser.symbolicNames; }
    public get ruleNames(): string[] { return QueryLangParser.ruleNames; }
    public get serializedATN(): number[] { return QueryLangParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, QueryLangParser._ATN, QueryLangParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public query(): QueryContext {
        let localContext = new QueryContext(this.context, this.state);
        this.enterRule(localContext, 0, QueryLangParser.RULE_query);
        let _la: number;
        try {
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.PROCESS:
            case QueryLangParser.PROCESSES:
                localContext = new ProcessQueryContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 202;
                (localContext as ProcessQueryContext)._resource = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 26 || _la === 27)) {
                    (localContext as ProcessQueryContext)._resource = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 204;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 3 || _la === 67) {
                    {
                    this.state = 203;
                    this.processConditionsAndPaging();
                    }
                }

                this.state = 206;
                this.match(QueryLangParser.EOF);
                }
                break;
            case QueryLangParser.CASE:
            case QueryLangParser.CASES:
                localContext = new CaseQueryContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 207;
                (localContext as CaseQueryContext)._resource = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 20 || _la === 21)) {
                    (localContext as CaseQueryContext)._resource = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 209;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 3 || _la === 67) {
                    {
                    this.state = 208;
                    this.caseConditionsAndPaging();
                    }
                }

                this.state = 211;
                this.match(QueryLangParser.EOF);
                }
                break;
            case QueryLangParser.TASK:
            case QueryLangParser.TASKS:
                localContext = new TaskQueryContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 212;
                (localContext as TaskQueryContext)._resource = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 22 || _la === 23)) {
                    (localContext as TaskQueryContext)._resource = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 214;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 3 || _la === 67) {
                    {
                    this.state = 213;
                    this.taskConditionsAndPaging();
                    }
                }

                this.state = 216;
                this.match(QueryLangParser.EOF);
                }
                break;
            case QueryLangParser.USER:
            case QueryLangParser.USERS:
                localContext = new UserQueryContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 217;
                (localContext as UserQueryContext)._resource = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 24 || _la === 25)) {
                    (localContext as UserQueryContext)._resource = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 3 || _la === 67) {
                    {
                    this.state = 218;
                    this.userConditionsAndPaging();
                    }
                }

                this.state = 221;
                this.match(QueryLangParser.EOF);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processConditionsAndPaging(): ProcessConditionsAndPagingContext {
        let localContext = new ProcessConditionsAndPagingContext(this.context, this.state);
        this.enterRule(localContext, 2, QueryLangParser.RULE_processConditionsAndPaging);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 224;
            this.delimeter();
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 4160750593) !== 0)) {
                {
                this.state = 225;
                this.processConditions();
                }
            }

            this.state = 229;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 52) {
                {
                this.state = 228;
                this.paging();
                }
            }

            this.state = 232;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 54) {
                {
                this.state = 231;
                this.processSorting();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseConditionsAndPaging(): CaseConditionsAndPagingContext {
        let localContext = new CaseConditionsAndPagingContext(this.context, this.state);
        this.enterRule(localContext, 4, QueryLangParser.RULE_caseConditionsAndPaging);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 234;
            this.delimeter();
            this.state = 236;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 813697026) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16415) !== 0)) {
                {
                this.state = 235;
                this.caseConditions();
                }
            }

            this.state = 239;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 52) {
                {
                this.state = 238;
                this.paging();
                }
            }

            this.state = 242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 54) {
                {
                this.state = 241;
                this.caseSorting();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskConditionsAndPaging(): TaskConditionsAndPagingContext {
        let localContext = new TaskConditionsAndPagingContext(this.context, this.state);
        this.enterRule(localContext, 6, QueryLangParser.RULE_taskConditionsAndPaging);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 244;
            this.delimeter();
            this.state = 246;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 805308418) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1009) !== 0)) {
                {
                this.state = 245;
                this.taskConditions();
                }
            }

            this.state = 249;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 52) {
                {
                this.state = 248;
                this.paging();
                }
            }

            this.state = 252;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 54) {
                {
                this.state = 251;
                this.taskSorting();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userConditionsAndPaging(): UserConditionsAndPagingContext {
        let localContext = new UserConditionsAndPagingContext(this.context, this.state);
        this.enterRule(localContext, 8, QueryLangParser.RULE_userConditionsAndPaging);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 254;
            this.delimeter();
            this.state = 256;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 268437506) !== 0) || ((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 7) !== 0)) {
                {
                this.state = 255;
                this.userConditions();
                }
            }

            this.state = 259;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 52) {
                {
                this.state = 258;
                this.paging();
                }
            }

            this.state = 262;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 54) {
                {
                this.state = 261;
                this.userSorting();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processConditions(): ProcessConditionsContext {
        let localContext = new ProcessConditionsContext(this.context, this.state);
        this.enterRule(localContext, 10, QueryLangParser.RULE_processConditions);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 264;
            this.processOrExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processOrExpression(): ProcessOrExpressionContext {
        let localContext = new ProcessOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 12, QueryLangParser.RULE_processOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 266;
            this.processAndExpression();
            this.state = 273;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 267;
                    this.match(QueryLangParser.SPACE);
                    this.state = 268;
                    this.match(QueryLangParser.OR);
                    this.state = 269;
                    this.match(QueryLangParser.SPACE);
                    this.state = 270;
                    this.processAndExpression();
                    }
                    }
                }
                this.state = 275;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processAndExpression(): ProcessAndExpressionContext {
        let localContext = new ProcessAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 14, QueryLangParser.RULE_processAndExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.processConditionGroup();
            this.state = 283;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 277;
                    this.match(QueryLangParser.SPACE);
                    this.state = 278;
                    this.match(QueryLangParser.AND);
                    this.state = 279;
                    this.match(QueryLangParser.SPACE);
                    this.state = 280;
                    this.processConditionGroup();
                    }
                    }
                }
                this.state = 285;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processConditionGroup(): ProcessConditionGroupContext {
        let localContext = new ProcessConditionGroupContext(this.context, this.state);
        this.enterRule(localContext, 16, QueryLangParser.RULE_processConditionGroup);
        let _la: number;
        try {
            this.state = 305;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.ID:
            case QueryLangParser.TITLE:
            case QueryLangParser.IDENTIFIER:
            case QueryLangParser.VERSION:
            case QueryLangParser.CREATION_DATE:
                localContext = new ProcessConditionGroupBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 286;
                this.processCondition();
                }
                break;
            case QueryLangParser.T__0:
            case QueryLangParser.NOT:
                localContext = new ProcessConditionGroupParenthesisContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 291;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 287;
                    this.match(QueryLangParser.NOT);
                    this.state = 289;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 288;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    }
                }

                this.state = 293;
                this.match(QueryLangParser.T__0);
                this.state = 295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 294;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 297;
                this.processConditions();
                this.state = 299;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 298;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 301;
                this.match(QueryLangParser.T__1);
                this.state = 303;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
                case 1:
                    {
                    this.state = 302;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processCondition(): ProcessConditionContext {
        let localContext = new ProcessConditionContext(this.context, this.state);
        this.enterRule(localContext, 18, QueryLangParser.RULE_processCondition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.processComparisons();
            this.state = 309;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                {
                this.state = 308;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseConditions(): CaseConditionsContext {
        let localContext = new CaseConditionsContext(this.context, this.state);
        this.enterRule(localContext, 20, QueryLangParser.RULE_caseConditions);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.caseOrExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseOrExpression(): CaseOrExpressionContext {
        let localContext = new CaseOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 22, QueryLangParser.RULE_caseOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 313;
            this.caseAndExpression();
            this.state = 320;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 314;
                    this.match(QueryLangParser.SPACE);
                    this.state = 315;
                    this.match(QueryLangParser.OR);
                    this.state = 316;
                    this.match(QueryLangParser.SPACE);
                    this.state = 317;
                    this.caseAndExpression();
                    }
                    }
                }
                this.state = 322;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseAndExpression(): CaseAndExpressionContext {
        let localContext = new CaseAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 24, QueryLangParser.RULE_caseAndExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 323;
            this.caseConditionGroup();
            this.state = 330;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 324;
                    this.match(QueryLangParser.SPACE);
                    this.state = 325;
                    this.match(QueryLangParser.AND);
                    this.state = 326;
                    this.match(QueryLangParser.SPACE);
                    this.state = 327;
                    this.caseConditionGroup();
                    }
                    }
                }
                this.state = 332;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseConditionGroup(): CaseConditionGroupContext {
        let localContext = new CaseConditionGroupContext(this.context, this.state);
        this.enterRule(localContext, 26, QueryLangParser.RULE_caseConditionGroup);
        let _la: number;
        try {
            this.state = 352;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.TASKS:
            case QueryLangParser.ID:
            case QueryLangParser.TITLE:
            case QueryLangParser.CREATION_DATE:
            case QueryLangParser.PROCESS_ID:
            case QueryLangParser.PROCESS_IDENTIFIER:
            case QueryLangParser.AUTHOR:
            case QueryLangParser.PLACES:
            case QueryLangParser.DATA:
                localContext = new CaseConditionGroupBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 333;
                this.caseCondition();
                }
                break;
            case QueryLangParser.T__0:
            case QueryLangParser.NOT:
                localContext = new CaseConditionGroupParenthesisContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 338;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 334;
                    this.match(QueryLangParser.NOT);
                    this.state = 336;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 335;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    }
                }

                this.state = 340;
                this.match(QueryLangParser.T__0);
                this.state = 342;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 341;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 344;
                this.caseConditions();
                this.state = 346;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 345;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 348;
                this.match(QueryLangParser.T__1);
                this.state = 350;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
                case 1:
                    {
                    this.state = 349;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseCondition(): CaseConditionContext {
        let localContext = new CaseConditionContext(this.context, this.state);
        this.enterRule(localContext, 28, QueryLangParser.RULE_caseCondition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 354;
            this.caseComparisons();
            this.state = 356;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 355;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskConditions(): TaskConditionsContext {
        let localContext = new TaskConditionsContext(this.context, this.state);
        this.enterRule(localContext, 30, QueryLangParser.RULE_taskConditions);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 358;
            this.taskOrExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskOrExpression(): TaskOrExpressionContext {
        let localContext = new TaskOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 32, QueryLangParser.RULE_taskOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 360;
            this.taskAndExpression();
            this.state = 367;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 361;
                    this.match(QueryLangParser.SPACE);
                    this.state = 362;
                    this.match(QueryLangParser.OR);
                    this.state = 363;
                    this.match(QueryLangParser.SPACE);
                    this.state = 364;
                    this.taskAndExpression();
                    }
                    }
                }
                this.state = 369;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskAndExpression(): TaskAndExpressionContext {
        let localContext = new TaskAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 34, QueryLangParser.RULE_taskAndExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 370;
            this.taskConditionGroup();
            this.state = 377;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 371;
                    this.match(QueryLangParser.SPACE);
                    this.state = 372;
                    this.match(QueryLangParser.AND);
                    this.state = 373;
                    this.match(QueryLangParser.SPACE);
                    this.state = 374;
                    this.taskConditionGroup();
                    }
                    }
                }
                this.state = 379;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskConditionGroup(): TaskConditionGroupContext {
        let localContext = new TaskConditionGroupContext(this.context, this.state);
        this.enterRule(localContext, 36, QueryLangParser.RULE_taskConditionGroup);
        let _la: number;
        try {
            this.state = 399;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.ID:
            case QueryLangParser.TITLE:
            case QueryLangParser.PROCESS_ID:
            case QueryLangParser.TRANSITION_ID:
            case QueryLangParser.STATE:
            case QueryLangParser.USER_ID:
            case QueryLangParser.CASE_ID:
            case QueryLangParser.LAST_ASSIGN:
            case QueryLangParser.LAST_FINISH:
                localContext = new TaskConditionGroupBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 380;
                this.taskCondition();
                }
                break;
            case QueryLangParser.T__0:
            case QueryLangParser.NOT:
                localContext = new TaskConditionGroupParenthesisContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 385;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 381;
                    this.match(QueryLangParser.NOT);
                    this.state = 383;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 382;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    }
                }

                this.state = 387;
                this.match(QueryLangParser.T__0);
                this.state = 389;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 388;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 391;
                this.taskConditions();
                this.state = 393;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 392;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 395;
                this.match(QueryLangParser.T__1);
                this.state = 397;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
                case 1:
                    {
                    this.state = 396;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskCondition(): TaskConditionContext {
        let localContext = new TaskConditionContext(this.context, this.state);
        this.enterRule(localContext, 38, QueryLangParser.RULE_taskCondition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 401;
            this.taskComparisons();
            this.state = 403;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 43, this.context) ) {
            case 1:
                {
                this.state = 402;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userConditions(): UserConditionsContext {
        let localContext = new UserConditionsContext(this.context, this.state);
        this.enterRule(localContext, 40, QueryLangParser.RULE_userConditions);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 405;
            this.userOrExpression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userOrExpression(): UserOrExpressionContext {
        let localContext = new UserOrExpressionContext(this.context, this.state);
        this.enterRule(localContext, 42, QueryLangParser.RULE_userOrExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 407;
            this.userAndExpression();
            this.state = 414;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 44, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 408;
                    this.match(QueryLangParser.SPACE);
                    this.state = 409;
                    this.match(QueryLangParser.OR);
                    this.state = 410;
                    this.match(QueryLangParser.SPACE);
                    this.state = 411;
                    this.userAndExpression();
                    }
                    }
                }
                this.state = 416;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 44, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userAndExpression(): UserAndExpressionContext {
        let localContext = new UserAndExpressionContext(this.context, this.state);
        this.enterRule(localContext, 44, QueryLangParser.RULE_userAndExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 417;
            this.userConditionGroup();
            this.state = 424;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 418;
                    this.match(QueryLangParser.SPACE);
                    this.state = 419;
                    this.match(QueryLangParser.AND);
                    this.state = 420;
                    this.match(QueryLangParser.SPACE);
                    this.state = 421;
                    this.userConditionGroup();
                    }
                    }
                }
                this.state = 426;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userConditionGroup(): UserConditionGroupContext {
        let localContext = new UserConditionGroupContext(this.context, this.state);
        this.enterRule(localContext, 46, QueryLangParser.RULE_userConditionGroup);
        let _la: number;
        try {
            this.state = 446;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.ID:
            case QueryLangParser.NAME:
            case QueryLangParser.SURNAME:
            case QueryLangParser.EMAIL:
                localContext = new UserConditionGroupBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 427;
                this.userCondition();
                }
                break;
            case QueryLangParser.T__0:
            case QueryLangParser.NOT:
                localContext = new UserConditionGroupParenthesisContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 428;
                    this.match(QueryLangParser.NOT);
                    this.state = 430;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 429;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    }
                }

                this.state = 434;
                this.match(QueryLangParser.T__0);
                this.state = 436;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 435;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 438;
                this.userConditions();
                this.state = 440;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 439;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 442;
                this.match(QueryLangParser.T__1);
                this.state = 444;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
                case 1:
                    {
                    this.state = 443;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userCondition(): UserConditionContext {
        let localContext = new UserConditionContext(this.context, this.state);
        this.enterRule(localContext, 48, QueryLangParser.RULE_userCondition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 448;
            this.userComparisons();
            this.state = 450;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                {
                this.state = 449;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public delimeter(): DelimeterContext {
        let localContext = new DelimeterContext(this.context, this.state);
        this.enterRule(localContext, 50, QueryLangParser.RULE_delimeter);
        let _la: number;
        try {
            this.state = 460;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 452;
                this.match(QueryLangParser.SPACE);
                this.state = 453;
                this.match(QueryLangParser.WHERE);
                this.state = 454;
                this.match(QueryLangParser.SPACE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 455;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 458;
                this.match(QueryLangParser.T__2);
                this.state = 459;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public paging(): PagingContext {
        let localContext = new PagingContext(this.context, this.state);
        this.enterRule(localContext, 52, QueryLangParser.RULE_paging);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 462;
            this.match(QueryLangParser.PAGE);
            this.state = 463;
            this.match(QueryLangParser.SPACE);
            this.state = 464;
            localContext._pageNum = this.match(QueryLangParser.INT);
            this.state = 469;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                {
                this.state = 465;
                this.match(QueryLangParser.SPACE);
                this.state = 466;
                this.match(QueryLangParser.SIZE);
                this.state = 467;
                this.match(QueryLangParser.SPACE);
                this.state = 468;
                localContext._pageSize = this.match(QueryLangParser.INT);
                }
                break;
            }
            this.state = 472;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 471;
                this.match(QueryLangParser.SPACE);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processSorting(): ProcessSortingContext {
        let localContext = new ProcessSortingContext(this.context, this.state);
        this.enterRule(localContext, 54, QueryLangParser.RULE_processSorting);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 474;
            this.match(QueryLangParser.SORT_BY);
            this.state = 475;
            this.match(QueryLangParser.SPACE);
            this.state = 476;
            this.processAttributeOrdering();
            this.state = 484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 477;
                this.match(QueryLangParser.T__3);
                this.state = 479;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 478;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 481;
                this.processAttributeOrdering();
                }
                }
                this.state = 486;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 488;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 487;
                this.match(QueryLangParser.SPACE);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processAttributeOrdering(): ProcessAttributeOrderingContext {
        let localContext = new ProcessAttributeOrderingContext(this.context, this.state);
        this.enterRule(localContext, 56, QueryLangParser.RULE_processAttributeOrdering);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            this.processAttribute();
            this.state = 493;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
            case 1:
                {
                this.state = 491;
                this.match(QueryLangParser.SPACE);
                this.state = 492;
                localContext._ordering = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 55 || _la === 56)) {
                    localContext._ordering = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processAttribute(): ProcessAttributeContext {
        let localContext = new ProcessAttributeContext(this.context, this.state);
        this.enterRule(localContext, 58, QueryLangParser.RULE_processAttribute);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 495;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 31) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseSorting(): CaseSortingContext {
        let localContext = new CaseSortingContext(this.context, this.state);
        this.enterRule(localContext, 60, QueryLangParser.RULE_caseSorting);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 497;
            this.match(QueryLangParser.SORT_BY);
            this.state = 498;
            this.match(QueryLangParser.SPACE);
            this.state = 499;
            this.caseAttributeOrdering();
            this.state = 507;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 500;
                this.match(QueryLangParser.T__3);
                this.state = 502;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 501;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 504;
                this.caseAttributeOrdering();
                }
                }
                this.state = 509;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 510;
                this.match(QueryLangParser.SPACE);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseAttributeOrdering(): CaseAttributeOrderingContext {
        let localContext = new CaseAttributeOrderingContext(this.context, this.state);
        this.enterRule(localContext, 62, QueryLangParser.RULE_caseAttributeOrdering);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 513;
            this.caseAttribute();
            this.state = 516;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                {
                this.state = 514;
                this.match(QueryLangParser.SPACE);
                this.state = 515;
                localContext._ordering = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 55 || _la === 56)) {
                    localContext._ordering = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseAttribute(): CaseAttributeContext {
        let localContext = new CaseAttributeContext(this.context, this.state);
        this.enterRule(localContext, 64, QueryLangParser.RULE_caseAttribute);
        try {
            this.state = 529;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 65, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 518;
                this.match(QueryLangParser.ID);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 519;
                this.match(QueryLangParser.PROCESS_ID);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 520;
                this.match(QueryLangParser.PROCESS_IDENTIFIER);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 521;
                this.match(QueryLangParser.TITLE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 522;
                this.match(QueryLangParser.CREATION_DATE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 523;
                this.match(QueryLangParser.AUTHOR);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 524;
                this.places();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 525;
                this.tasksUserId();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 526;
                this.tasksState();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 527;
                this.dataValue();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 528;
                this.dataOptions();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskSorting(): TaskSortingContext {
        let localContext = new TaskSortingContext(this.context, this.state);
        this.enterRule(localContext, 66, QueryLangParser.RULE_taskSorting);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 531;
            this.match(QueryLangParser.SORT_BY);
            this.state = 532;
            this.match(QueryLangParser.SPACE);
            this.state = 533;
            this.taskAttributeOrdering();
            this.state = 541;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 534;
                this.match(QueryLangParser.T__3);
                this.state = 536;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 535;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 538;
                this.taskAttributeOrdering();
                }
                }
                this.state = 543;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 545;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 544;
                this.match(QueryLangParser.SPACE);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskAttributeOrdering(): TaskAttributeOrderingContext {
        let localContext = new TaskAttributeOrderingContext(this.context, this.state);
        this.enterRule(localContext, 68, QueryLangParser.RULE_taskAttributeOrdering);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 547;
            this.taskAttribute();
            this.state = 550;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
            case 1:
                {
                this.state = 548;
                this.match(QueryLangParser.SPACE);
                this.state = 549;
                localContext._ordering = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 55 || _la === 56)) {
                    localContext._ordering = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskAttribute(): TaskAttributeContext {
        let localContext = new TaskAttributeContext(this.context, this.state);
        this.enterRule(localContext, 70, QueryLangParser.RULE_taskAttribute);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 552;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 32291) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userSorting(): UserSortingContext {
        let localContext = new UserSortingContext(this.context, this.state);
        this.enterRule(localContext, 72, QueryLangParser.RULE_userSorting);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 554;
            this.match(QueryLangParser.SORT_BY);
            this.state = 555;
            this.match(QueryLangParser.SPACE);
            this.state = 556;
            this.userAttributeOrdering();
            this.state = 564;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 557;
                this.match(QueryLangParser.T__3);
                this.state = 559;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 558;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                this.state = 561;
                this.userAttributeOrdering();
                }
                }
                this.state = 566;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 568;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 567;
                this.match(QueryLangParser.SPACE);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userAttributeOrdering(): UserAttributeOrderingContext {
        let localContext = new UserAttributeOrderingContext(this.context, this.state);
        this.enterRule(localContext, 74, QueryLangParser.RULE_userAttributeOrdering);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 570;
            this.userAttribute();
            this.state = 573;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 73, this.context) ) {
            case 1:
                {
                this.state = 571;
                this.match(QueryLangParser.SPACE);
                this.state = 572;
                localContext._ordering = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 55 || _la === 56)) {
                    localContext._ordering = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userAttribute(): UserAttributeContext {
        let localContext = new UserAttributeContext(this.context, this.state);
        this.enterRule(localContext, 76, QueryLangParser.RULE_userAttribute);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 575;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 229377) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processComparisons(): ProcessComparisonsContext {
        let localContext = new ProcessComparisonsContext(this.context, this.state);
        this.enterRule(localContext, 78, QueryLangParser.RULE_processComparisons);
        try {
            this.state = 582;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 577;
                this.idComparison();
                }
                break;
            case QueryLangParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 578;
                this.identifierComparison();
                }
                break;
            case QueryLangParser.VERSION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 579;
                this.versionComparison();
                }
                break;
            case QueryLangParser.TITLE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 580;
                this.titleComparison();
                }
                break;
            case QueryLangParser.CREATION_DATE:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 581;
                this.creationDateComparison();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseComparisons(): CaseComparisonsContext {
        let localContext = new CaseComparisonsContext(this.context, this.state);
        this.enterRule(localContext, 80, QueryLangParser.RULE_caseComparisons);
        try {
            this.state = 595;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 584;
                this.idComparison();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 585;
                this.processIdObjIdComparison();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 586;
                this.processIdentifierComparison();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 587;
                this.titleComparison();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 588;
                this.creationDateComparison();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 589;
                this.authorComparison();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 590;
                this.placesComparison();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 591;
                this.tasksStateComparison();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 592;
                this.tasksUserIdComparison();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 593;
                this.dataValueComparison();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 594;
                this.dataOptionsComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public taskComparisons(): TaskComparisonsContext {
        let localContext = new TaskComparisonsContext(this.context, this.state);
        this.enterRule(localContext, 82, QueryLangParser.RULE_taskComparisons);
        try {
            this.state = 606;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 597;
                this.idComparison();
                }
                break;
            case QueryLangParser.TRANSITION_ID:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 598;
                this.transitionIdComparison();
                }
                break;
            case QueryLangParser.TITLE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 599;
                this.titleComparison();
                }
                break;
            case QueryLangParser.STATE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 600;
                this.stateComparison();
                }
                break;
            case QueryLangParser.USER_ID:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 601;
                this.userIdComparison();
                }
                break;
            case QueryLangParser.CASE_ID:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 602;
                this.caseIdComparison();
                }
                break;
            case QueryLangParser.PROCESS_ID:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 603;
                this.processIdComparison();
                }
                break;
            case QueryLangParser.LAST_ASSIGN:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 604;
                this.lastAssignComparison();
                }
                break;
            case QueryLangParser.LAST_FINISH:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 605;
                this.lastFinishComparison();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userComparisons(): UserComparisonsContext {
        let localContext = new UserComparisonsContext(this.context, this.state);
        this.enterRule(localContext, 84, QueryLangParser.RULE_userComparisons);
        try {
            this.state = 612;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 608;
                this.idComparison();
                }
                break;
            case QueryLangParser.NAME:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 609;
                this.nameComparison();
                }
                break;
            case QueryLangParser.SURNAME:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 610;
                this.surnameComparison();
                }
                break;
            case QueryLangParser.EMAIL:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 611;
                this.emailComparison();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public idComparison(): IdComparisonContext {
        let localContext = new IdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 86, QueryLangParser.RULE_idComparison);
        try {
            this.state = 623;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                localContext = new IdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 614;
                this.match(QueryLangParser.ID);
                this.state = 615;
                this.match(QueryLangParser.SPACE);
                this.state = 616;
                this.objectIdComparison();
                }
                break;
            case 2:
                localContext = new IdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 617;
                this.match(QueryLangParser.ID);
                this.state = 618;
                this.match(QueryLangParser.SPACE);
                this.state = 619;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new IdNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 620;
                this.match(QueryLangParser.ID);
                this.state = 621;
                this.match(QueryLangParser.SPACE);
                this.state = 622;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public titleComparison(): TitleComparisonContext {
        let localContext = new TitleComparisonContext(this.context, this.state);
        this.enterRule(localContext, 88, QueryLangParser.RULE_titleComparison);
        try {
            this.state = 640;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
            case 1:
                localContext = new TitleBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 625;
                this.match(QueryLangParser.TITLE);
                this.state = 626;
                this.match(QueryLangParser.SPACE);
                this.state = 627;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new TitleLikeContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 628;
                this.match(QueryLangParser.TITLE);
                this.state = 629;
                this.match(QueryLangParser.SPACE);
                this.state = 630;
                this.stringLikeComparison();
                }
                break;
            case 3:
                localContext = new TitleListContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 631;
                this.match(QueryLangParser.TITLE);
                this.state = 632;
                this.match(QueryLangParser.SPACE);
                this.state = 633;
                this.inListStringComparison();
                }
                break;
            case 4:
                localContext = new TitleRangeContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 634;
                this.match(QueryLangParser.TITLE);
                this.state = 635;
                this.match(QueryLangParser.SPACE);
                this.state = 636;
                this.inRangeStringComparison();
                }
                break;
            case 5:
                localContext = new TitleNullContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 637;
                this.match(QueryLangParser.TITLE);
                this.state = 638;
                this.match(QueryLangParser.SPACE);
                this.state = 639;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifierComparison(): IdentifierComparisonContext {
        let localContext = new IdentifierComparisonContext(this.context, this.state);
        this.enterRule(localContext, 90, QueryLangParser.RULE_identifierComparison);
        try {
            this.state = 654;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                localContext = new IdentifierBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 642;
                this.match(QueryLangParser.IDENTIFIER);
                this.state = 643;
                this.match(QueryLangParser.SPACE);
                this.state = 644;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new IdentifierListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 645;
                this.match(QueryLangParser.IDENTIFIER);
                this.state = 646;
                this.match(QueryLangParser.SPACE);
                this.state = 647;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new IdentifierRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 648;
                this.match(QueryLangParser.IDENTIFIER);
                this.state = 649;
                this.match(QueryLangParser.SPACE);
                this.state = 650;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new IdentifierNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 651;
                this.match(QueryLangParser.IDENTIFIER);
                this.state = 652;
                this.match(QueryLangParser.SPACE);
                this.state = 653;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public versionComparison(): VersionComparisonContext {
        let localContext = new VersionComparisonContext(this.context, this.state);
        this.enterRule(localContext, 92, QueryLangParser.RULE_versionComparison);
        let _la: number;
        try {
            this.state = 676;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
            case 1:
                localContext = new VersionBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 656;
                this.match(QueryLangParser.VERSION);
                this.state = 657;
                this.match(QueryLangParser.SPACE);
                this.state = 662;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 658;
                    this.match(QueryLangParser.NOT);
                    this.state = 660;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 659;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    }
                }

                this.state = 664;
                (localContext as VersionBasicContext)._op = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 249856) !== 0))) {
                    (localContext as VersionBasicContext)._op = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 665;
                this.match(QueryLangParser.SPACE);
                this.state = 666;
                this.match(QueryLangParser.VERSION_NUMBER);
                }
                break;
            case 2:
                localContext = new VersionListCmpContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 667;
                this.match(QueryLangParser.VERSION);
                this.state = 668;
                this.match(QueryLangParser.SPACE);
                this.state = 669;
                this.inListVersionComparison();
                }
                break;
            case 3:
                localContext = new VersionRangeCmpContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 670;
                this.match(QueryLangParser.VERSION);
                this.state = 671;
                this.match(QueryLangParser.SPACE);
                this.state = 672;
                this.inRangeVersionComparison();
                }
                break;
            case 4:
                localContext = new VersionNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 673;
                this.match(QueryLangParser.VERSION);
                this.state = 674;
                this.match(QueryLangParser.SPACE);
                this.state = 675;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public creationDateComparison(): CreationDateComparisonContext {
        let localContext = new CreationDateComparisonContext(this.context, this.state);
        this.enterRule(localContext, 94, QueryLangParser.RULE_creationDateComparison);
        try {
            this.state = 693;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                localContext = new CdDateBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 678;
                this.match(QueryLangParser.CREATION_DATE);
                this.state = 679;
                this.match(QueryLangParser.SPACE);
                this.state = 680;
                this.dateComparison();
                }
                break;
            case 2:
                localContext = new CdDateTimeBasicContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 681;
                this.match(QueryLangParser.CREATION_DATE);
                this.state = 682;
                this.match(QueryLangParser.SPACE);
                this.state = 683;
                this.dateTimeComparison();
                }
                break;
            case 3:
                localContext = new CdDateListContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 684;
                this.match(QueryLangParser.CREATION_DATE);
                this.state = 685;
                this.match(QueryLangParser.SPACE);
                this.state = 686;
                this.inListDateComparison();
                }
                break;
            case 4:
                localContext = new CdDateRangeContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 687;
                this.match(QueryLangParser.CREATION_DATE);
                this.state = 688;
                this.match(QueryLangParser.SPACE);
                this.state = 689;
                this.inRangeDateComparison();
                }
                break;
            case 5:
                localContext = new CdNullContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 690;
                this.match(QueryLangParser.CREATION_DATE);
                this.state = 691;
                this.match(QueryLangParser.SPACE);
                this.state = 692;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processIdComparison(): ProcessIdComparisonContext {
        let localContext = new ProcessIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 96, QueryLangParser.RULE_processIdComparison);
        try {
            this.state = 704;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
            case 1:
                localContext = new ProcessIdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 695;
                this.match(QueryLangParser.PROCESS_ID);
                this.state = 696;
                this.match(QueryLangParser.SPACE);
                this.state = 697;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new ProcessIdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 698;
                this.match(QueryLangParser.PROCESS_ID);
                this.state = 699;
                this.match(QueryLangParser.SPACE);
                this.state = 700;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new ProcessIdNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 701;
                this.match(QueryLangParser.PROCESS_ID);
                this.state = 702;
                this.match(QueryLangParser.SPACE);
                this.state = 703;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processIdObjIdComparison(): ProcessIdObjIdComparisonContext {
        let localContext = new ProcessIdObjIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 98, QueryLangParser.RULE_processIdObjIdComparison);
        try {
            this.state = 715;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
            case 1:
                localContext = new ProcessIdObjIdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 706;
                this.match(QueryLangParser.PROCESS_ID);
                this.state = 707;
                this.match(QueryLangParser.SPACE);
                this.state = 708;
                this.objectIdComparison();
                }
                break;
            case 2:
                localContext = new ProcessIdObjIdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 709;
                this.match(QueryLangParser.PROCESS_ID);
                this.state = 710;
                this.match(QueryLangParser.SPACE);
                this.state = 711;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new ProcessIdObjNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 712;
                this.match(QueryLangParser.PROCESS_ID);
                this.state = 713;
                this.match(QueryLangParser.SPACE);
                this.state = 714;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public processIdentifierComparison(): ProcessIdentifierComparisonContext {
        let localContext = new ProcessIdentifierComparisonContext(this.context, this.state);
        this.enterRule(localContext, 100, QueryLangParser.RULE_processIdentifierComparison);
        try {
            this.state = 729;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
            case 1:
                localContext = new ProcessIdentifierBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 717;
                this.match(QueryLangParser.PROCESS_IDENTIFIER);
                this.state = 718;
                this.match(QueryLangParser.SPACE);
                this.state = 719;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new ProcessIdentifierListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 720;
                this.match(QueryLangParser.PROCESS_IDENTIFIER);
                this.state = 721;
                this.match(QueryLangParser.SPACE);
                this.state = 722;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new ProcessIdentifierRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 723;
                this.match(QueryLangParser.PROCESS_IDENTIFIER);
                this.state = 724;
                this.match(QueryLangParser.SPACE);
                this.state = 725;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new ProcessIdentifierNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 726;
                this.match(QueryLangParser.PROCESS_IDENTIFIER);
                this.state = 727;
                this.match(QueryLangParser.SPACE);
                this.state = 728;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public authorComparison(): AuthorComparisonContext {
        let localContext = new AuthorComparisonContext(this.context, this.state);
        this.enterRule(localContext, 102, QueryLangParser.RULE_authorComparison);
        try {
            this.state = 740;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                localContext = new AuthorBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 731;
                this.match(QueryLangParser.AUTHOR);
                this.state = 732;
                this.match(QueryLangParser.SPACE);
                this.state = 733;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new AuthorListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 734;
                this.match(QueryLangParser.AUTHOR);
                this.state = 735;
                this.match(QueryLangParser.SPACE);
                this.state = 736;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new AuthorNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 737;
                this.match(QueryLangParser.AUTHOR);
                this.state = 738;
                this.match(QueryLangParser.SPACE);
                this.state = 739;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transitionIdComparison(): TransitionIdComparisonContext {
        let localContext = new TransitionIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 104, QueryLangParser.RULE_transitionIdComparison);
        try {
            this.state = 754;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
            case 1:
                localContext = new TransitionIdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 742;
                this.match(QueryLangParser.TRANSITION_ID);
                this.state = 743;
                this.match(QueryLangParser.SPACE);
                this.state = 744;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new TransitionIdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 745;
                this.match(QueryLangParser.TRANSITION_ID);
                this.state = 746;
                this.match(QueryLangParser.SPACE);
                this.state = 747;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new TransitionIdRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 748;
                this.match(QueryLangParser.TRANSITION_ID);
                this.state = 749;
                this.match(QueryLangParser.SPACE);
                this.state = 750;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new TransitionIdNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 751;
                this.match(QueryLangParser.TRANSITION_ID);
                this.state = 752;
                this.match(QueryLangParser.SPACE);
                this.state = 753;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stateComparison(): StateComparisonContext {
        let localContext = new StateComparisonContext(this.context, this.state);
        this.enterRule(localContext, 106, QueryLangParser.RULE_stateComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 756;
            this.match(QueryLangParser.STATE);
            this.state = 757;
            this.match(QueryLangParser.SPACE);
            this.state = 758;
            this.match(QueryLangParser.EQ);
            this.state = 759;
            this.match(QueryLangParser.SPACE);
            this.state = 760;
            localContext._state = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 50 || _la === 51)) {
                localContext._state = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public userIdComparison(): UserIdComparisonContext {
        let localContext = new UserIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 108, QueryLangParser.RULE_userIdComparison);
        try {
            this.state = 771;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context) ) {
            case 1:
                localContext = new UserIdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 762;
                this.match(QueryLangParser.USER_ID);
                this.state = 763;
                this.match(QueryLangParser.SPACE);
                this.state = 764;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new UserIdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 765;
                this.match(QueryLangParser.USER_ID);
                this.state = 766;
                this.match(QueryLangParser.SPACE);
                this.state = 767;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new UserIdNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 768;
                this.match(QueryLangParser.USER_ID);
                this.state = 769;
                this.match(QueryLangParser.SPACE);
                this.state = 770;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public caseIdComparison(): CaseIdComparisonContext {
        let localContext = new CaseIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 110, QueryLangParser.RULE_caseIdComparison);
        try {
            this.state = 782;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
            case 1:
                localContext = new CaseIdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 773;
                this.match(QueryLangParser.CASE_ID);
                this.state = 774;
                this.match(QueryLangParser.SPACE);
                this.state = 775;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new CaseIdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 776;
                this.match(QueryLangParser.CASE_ID);
                this.state = 777;
                this.match(QueryLangParser.SPACE);
                this.state = 778;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new CaseIdNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 779;
                this.match(QueryLangParser.CASE_ID);
                this.state = 780;
                this.match(QueryLangParser.SPACE);
                this.state = 781;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lastAssignComparison(): LastAssignComparisonContext {
        let localContext = new LastAssignComparisonContext(this.context, this.state);
        this.enterRule(localContext, 112, QueryLangParser.RULE_lastAssignComparison);
        try {
            this.state = 799;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 92, this.context) ) {
            case 1:
                localContext = new LaDateBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 784;
                this.match(QueryLangParser.LAST_ASSIGN);
                this.state = 785;
                this.match(QueryLangParser.SPACE);
                this.state = 786;
                this.dateComparison();
                }
                break;
            case 2:
                localContext = new LaDateTimeBasicContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 787;
                this.match(QueryLangParser.LAST_ASSIGN);
                this.state = 788;
                this.match(QueryLangParser.SPACE);
                this.state = 789;
                this.dateTimeComparison();
                }
                break;
            case 3:
                localContext = new LaDateListContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 790;
                this.match(QueryLangParser.LAST_ASSIGN);
                this.state = 791;
                this.match(QueryLangParser.SPACE);
                this.state = 792;
                this.inListDateComparison();
                }
                break;
            case 4:
                localContext = new LaDateRangeContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 793;
                this.match(QueryLangParser.LAST_ASSIGN);
                this.state = 794;
                this.match(QueryLangParser.SPACE);
                this.state = 795;
                this.inRangeDateComparison();
                }
                break;
            case 5:
                localContext = new LaNullContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 796;
                this.match(QueryLangParser.LAST_ASSIGN);
                this.state = 797;
                this.match(QueryLangParser.SPACE);
                this.state = 798;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lastFinishComparison(): LastFinishComparisonContext {
        let localContext = new LastFinishComparisonContext(this.context, this.state);
        this.enterRule(localContext, 114, QueryLangParser.RULE_lastFinishComparison);
        try {
            this.state = 816;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 93, this.context) ) {
            case 1:
                localContext = new LfDateBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 801;
                this.match(QueryLangParser.LAST_FINISH);
                this.state = 802;
                this.match(QueryLangParser.SPACE);
                this.state = 803;
                this.dateComparison();
                }
                break;
            case 2:
                localContext = new LfDateTimeBasicContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 804;
                this.match(QueryLangParser.LAST_FINISH);
                this.state = 805;
                this.match(QueryLangParser.SPACE);
                this.state = 806;
                this.dateTimeComparison();
                }
                break;
            case 3:
                localContext = new LfDateListContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 807;
                this.match(QueryLangParser.LAST_FINISH);
                this.state = 808;
                this.match(QueryLangParser.SPACE);
                this.state = 809;
                this.inListDateComparison();
                }
                break;
            case 4:
                localContext = new LfDateRangeContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 810;
                this.match(QueryLangParser.LAST_FINISH);
                this.state = 811;
                this.match(QueryLangParser.SPACE);
                this.state = 812;
                this.inRangeDateComparison();
                }
                break;
            case 5:
                localContext = new LfNullContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 813;
                this.match(QueryLangParser.LAST_FINISH);
                this.state = 814;
                this.match(QueryLangParser.SPACE);
                this.state = 815;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public nameComparison(): NameComparisonContext {
        let localContext = new NameComparisonContext(this.context, this.state);
        this.enterRule(localContext, 116, QueryLangParser.RULE_nameComparison);
        try {
            this.state = 830;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 94, this.context) ) {
            case 1:
                localContext = new NameBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 818;
                this.match(QueryLangParser.NAME);
                this.state = 819;
                this.match(QueryLangParser.SPACE);
                this.state = 820;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new NameListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 821;
                this.match(QueryLangParser.NAME);
                this.state = 822;
                this.match(QueryLangParser.SPACE);
                this.state = 823;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new NameRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 824;
                this.match(QueryLangParser.NAME);
                this.state = 825;
                this.match(QueryLangParser.SPACE);
                this.state = 826;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new NameNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 827;
                this.match(QueryLangParser.NAME);
                this.state = 828;
                this.match(QueryLangParser.SPACE);
                this.state = 829;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public surnameComparison(): SurnameComparisonContext {
        let localContext = new SurnameComparisonContext(this.context, this.state);
        this.enterRule(localContext, 118, QueryLangParser.RULE_surnameComparison);
        try {
            this.state = 844;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                localContext = new SurnameBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 832;
                this.match(QueryLangParser.SURNAME);
                this.state = 833;
                this.match(QueryLangParser.SPACE);
                this.state = 834;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new SurnameListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 835;
                this.match(QueryLangParser.SURNAME);
                this.state = 836;
                this.match(QueryLangParser.SPACE);
                this.state = 837;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new SurnameRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 838;
                this.match(QueryLangParser.SURNAME);
                this.state = 839;
                this.match(QueryLangParser.SPACE);
                this.state = 840;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new SurnameNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 841;
                this.match(QueryLangParser.SURNAME);
                this.state = 842;
                this.match(QueryLangParser.SPACE);
                this.state = 843;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public emailComparison(): EmailComparisonContext {
        let localContext = new EmailComparisonContext(this.context, this.state);
        this.enterRule(localContext, 120, QueryLangParser.RULE_emailComparison);
        try {
            this.state = 858;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                localContext = new EmailBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 846;
                this.match(QueryLangParser.EMAIL);
                this.state = 847;
                this.match(QueryLangParser.SPACE);
                this.state = 848;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new EmailListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 849;
                this.match(QueryLangParser.EMAIL);
                this.state = 850;
                this.match(QueryLangParser.SPACE);
                this.state = 851;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new EmailRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 852;
                this.match(QueryLangParser.EMAIL);
                this.state = 853;
                this.match(QueryLangParser.SPACE);
                this.state = 854;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new EmailNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 855;
                this.match(QueryLangParser.EMAIL);
                this.state = 856;
                this.match(QueryLangParser.SPACE);
                this.state = 857;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dataValueComparison(): DataValueComparisonContext {
        let localContext = new DataValueComparisonContext(this.context, this.state);
        this.enterRule(localContext, 122, QueryLangParser.RULE_dataValueComparison);
        try {
            this.state = 912;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                localContext = new DataStringContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 860;
                this.dataValue();
                this.state = 861;
                this.match(QueryLangParser.SPACE);
                this.state = 862;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new DataStringLikeContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 864;
                this.dataValue();
                this.state = 865;
                this.match(QueryLangParser.SPACE);
                this.state = 866;
                this.stringLikeComparison();
                }
                break;
            case 3:
                localContext = new DataNumberContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 868;
                this.dataValue();
                this.state = 869;
                this.match(QueryLangParser.SPACE);
                this.state = 870;
                this.numberComparison();
                }
                break;
            case 4:
                localContext = new DataDateContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 872;
                this.dataValue();
                this.state = 873;
                this.match(QueryLangParser.SPACE);
                this.state = 874;
                this.dateComparison();
                }
                break;
            case 5:
                localContext = new DataDatetimeContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 876;
                this.dataValue();
                this.state = 877;
                this.match(QueryLangParser.SPACE);
                this.state = 878;
                this.dateTimeComparison();
                }
                break;
            case 6:
                localContext = new DataBooleanContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 880;
                this.dataValue();
                this.state = 881;
                this.match(QueryLangParser.SPACE);
                this.state = 882;
                this.booleanComparison();
                }
                break;
            case 7:
                localContext = new DataStringListContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 884;
                this.dataValue();
                this.state = 885;
                this.match(QueryLangParser.SPACE);
                this.state = 886;
                this.inListStringComparison();
                }
                break;
            case 8:
                localContext = new DataNumberListContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 888;
                this.dataValue();
                this.state = 889;
                this.match(QueryLangParser.SPACE);
                this.state = 890;
                this.inListNumberComparison();
                }
                break;
            case 9:
                localContext = new DataDateListContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 892;
                this.dataValue();
                this.state = 893;
                this.match(QueryLangParser.SPACE);
                this.state = 894;
                this.inListDateComparison();
                }
                break;
            case 10:
                localContext = new DataStringRangeContext(localContext);
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 896;
                this.dataValue();
                this.state = 897;
                this.match(QueryLangParser.SPACE);
                this.state = 898;
                this.inRangeStringComparison();
                }
                break;
            case 11:
                localContext = new DataNumberRangeContext(localContext);
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 900;
                this.dataValue();
                this.state = 901;
                this.match(QueryLangParser.SPACE);
                this.state = 902;
                this.inRangeNumberComparison();
                }
                break;
            case 12:
                localContext = new DataDateRangeContext(localContext);
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 904;
                this.dataValue();
                this.state = 905;
                this.match(QueryLangParser.SPACE);
                this.state = 906;
                this.inRangeDateComparison();
                }
                break;
            case 13:
                localContext = new DataNullContext(localContext);
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 908;
                this.dataValue();
                this.state = 909;
                this.match(QueryLangParser.SPACE);
                this.state = 910;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dataOptionsComparison(): DataOptionsComparisonContext {
        let localContext = new DataOptionsComparisonContext(this.context, this.state);
        this.enterRule(localContext, 124, QueryLangParser.RULE_dataOptionsComparison);
        try {
            this.state = 930;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
            case 1:
                localContext = new DataOptionsBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 914;
                this.dataOptions();
                this.state = 915;
                this.match(QueryLangParser.SPACE);
                this.state = 916;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new DataOptionsListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 918;
                this.dataOptions();
                this.state = 919;
                this.match(QueryLangParser.SPACE);
                this.state = 920;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new DataOptionsRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 922;
                this.dataOptions();
                this.state = 923;
                this.match(QueryLangParser.SPACE);
                this.state = 924;
                this.inRangeStringComparison();
                }
                break;
            case 4:
                localContext = new DataOptionsNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 926;
                this.dataOptions();
                this.state = 927;
                this.match(QueryLangParser.SPACE);
                this.state = 928;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public placesComparison(): PlacesComparisonContext {
        let localContext = new PlacesComparisonContext(this.context, this.state);
        this.enterRule(localContext, 126, QueryLangParser.RULE_placesComparison);
        try {
            this.state = 948;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 99, this.context) ) {
            case 1:
                localContext = new PlacesBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 932;
                this.places();
                this.state = 933;
                this.match(QueryLangParser.SPACE);
                this.state = 934;
                this.numberComparison();
                }
                break;
            case 2:
                localContext = new PlacesListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 936;
                this.places();
                this.state = 937;
                this.match(QueryLangParser.SPACE);
                this.state = 938;
                this.inListNumberComparison();
                }
                break;
            case 3:
                localContext = new PlacesRangeContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 940;
                this.places();
                this.state = 941;
                this.match(QueryLangParser.SPACE);
                this.state = 942;
                this.inRangeNumberComparison();
                }
                break;
            case 4:
                localContext = new PlacesNullContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 944;
                this.places();
                this.state = 945;
                this.match(QueryLangParser.SPACE);
                this.state = 946;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tasksStateComparison(): TasksStateComparisonContext {
        let localContext = new TasksStateComparisonContext(this.context, this.state);
        this.enterRule(localContext, 128, QueryLangParser.RULE_tasksStateComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 950;
            this.tasksState();
            this.state = 951;
            this.match(QueryLangParser.SPACE);
            this.state = 956;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 952;
                this.match(QueryLangParser.NOT);
                this.state = 954;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 953;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 958;
            localContext._op = this.match(QueryLangParser.EQ);
            this.state = 959;
            this.match(QueryLangParser.SPACE);
            this.state = 960;
            localContext._state = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 50 || _la === 51)) {
                localContext._state = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tasksUserIdComparison(): TasksUserIdComparisonContext {
        let localContext = new TasksUserIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 130, QueryLangParser.RULE_tasksUserIdComparison);
        try {
            this.state = 974;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context) ) {
            case 1:
                localContext = new TasksUserIdBasicContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 962;
                this.tasksUserId();
                this.state = 963;
                this.match(QueryLangParser.SPACE);
                this.state = 964;
                this.stringComparison();
                }
                break;
            case 2:
                localContext = new TasksUserIdListContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 966;
                this.tasksUserId();
                this.state = 967;
                this.match(QueryLangParser.SPACE);
                this.state = 968;
                this.inListStringComparison();
                }
                break;
            case 3:
                localContext = new TasksUserIdNullContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 970;
                this.tasksUserId();
                this.state = 971;
                this.match(QueryLangParser.SPACE);
                this.state = 972;
                this.nullComparison();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public objectIdComparison(): ObjectIdComparisonContext {
        let localContext = new ObjectIdComparisonContext(this.context, this.state);
        this.enterRule(localContext, 132, QueryLangParser.RULE_objectIdComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 980;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 976;
                this.match(QueryLangParser.NOT);
                this.state = 978;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 977;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 982;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 12 || _la === 13)) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 983;
            this.match(QueryLangParser.SPACE);
            this.state = 984;
            _la = this.tokenStream.LA(1);
            if(!(_la === 57 || _la === 69)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stringComparison(): StringComparisonContext {
        let localContext = new StringComparisonContext(this.context, this.state);
        this.enterRule(localContext, 134, QueryLangParser.RULE_stringComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 990;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 986;
                this.match(QueryLangParser.NOT);
                this.state = 988;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 987;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 992;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 520192) !== 0))) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 993;
            this.match(QueryLangParser.SPACE);
            this.state = 996;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.STRING:
                {
                this.state = 994;
                this.match(QueryLangParser.STRING);
                }
                break;
            case QueryLangParser.LOGGED_USER_ID:
            case QueryLangParser.LOGGED_USER_FULLNAME:
            case QueryLangParser.LOGGED_USER_USERNAME:
                {
                this.state = 995;
                this.loggedUserStringAttribute();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stringLikeComparison(): StringLikeComparisonContext {
        let localContext = new StringLikeComparisonContext(this.context, this.state);
        this.enterRule(localContext, 136, QueryLangParser.RULE_stringLikeComparison);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 998;
            this.stringComparison();
            this.state = 999;
            this.match(QueryLangParser.LIKE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public numberComparison(): NumberComparisonContext {
        let localContext = new NumberComparisonContext(this.context, this.state);
        this.enterRule(localContext, 138, QueryLangParser.RULE_numberComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1005;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1001;
                this.match(QueryLangParser.NOT);
                this.state = 1003;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1002;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1007;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 258048) !== 0))) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1008;
            this.match(QueryLangParser.SPACE);
            this.state = 1009;
            localContext._number_ = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 58 || _la === 59)) {
                localContext._number_ = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateComparison(): DateComparisonContext {
        let localContext = new DateComparisonContext(this.context, this.state);
        this.enterRule(localContext, 140, QueryLangParser.RULE_dateComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1015;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1011;
                this.match(QueryLangParser.NOT);
                this.state = 1013;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1012;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1017;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 258048) !== 0))) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1018;
            this.match(QueryLangParser.SPACE);
            this.state = 1019;
            this.match(QueryLangParser.DATE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateTimeComparison(): DateTimeComparisonContext {
        let localContext = new DateTimeComparisonContext(this.context, this.state);
        this.enterRule(localContext, 142, QueryLangParser.RULE_dateTimeComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1025;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1021;
                this.match(QueryLangParser.NOT);
                this.state = 1023;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1022;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1027;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 258048) !== 0))) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1028;
            this.match(QueryLangParser.SPACE);
            this.state = 1029;
            this.match(QueryLangParser.DATETIME);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public booleanComparison(): BooleanComparisonContext {
        let localContext = new BooleanComparisonContext(this.context, this.state);
        this.enterRule(localContext, 144, QueryLangParser.RULE_booleanComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1035;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1031;
                this.match(QueryLangParser.NOT);
                this.state = 1033;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1032;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1037;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 12 || _la === 13)) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1038;
            this.match(QueryLangParser.SPACE);
            this.state = 1039;
            _la = this.tokenStream.LA(1);
            if(!(_la === 62 || _la === 72)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public nullComparison(): NullComparisonContext {
        let localContext = new NullComparisonContext(this.context, this.state);
        this.enterRule(localContext, 146, QueryLangParser.RULE_nullComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1045;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1041;
                this.match(QueryLangParser.NOT);
                this.state = 1043;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1042;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1047;
            localContext._op = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 12 || _la === 13)) {
                localContext._op = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1048;
            this.match(QueryLangParser.SPACE);
            this.state = 1049;
            this.match(QueryLangParser.NULL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inListStringComparison(): InListStringComparisonContext {
        let localContext = new InListStringComparisonContext(this.context, this.state);
        this.enterRule(localContext, 148, QueryLangParser.RULE_inListStringComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1055;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1051;
                this.match(QueryLangParser.NOT);
                this.state = 1053;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1052;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1057;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1059;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1058;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1061;
            this.stringList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inListNumberComparison(): InListNumberComparisonContext {
        let localContext = new InListNumberComparisonContext(this.context, this.state);
        this.enterRule(localContext, 150, QueryLangParser.RULE_inListNumberComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1067;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1063;
                this.match(QueryLangParser.NOT);
                this.state = 1065;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1064;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1069;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1071;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1070;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1075;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context) ) {
            case 1:
                {
                this.state = 1073;
                this.intList();
                }
                break;
            case 2:
                {
                this.state = 1074;
                this.doubleList();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inListDateComparison(): InListDateComparisonContext {
        let localContext = new InListDateComparisonContext(this.context, this.state);
        this.enterRule(localContext, 152, QueryLangParser.RULE_inListDateComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1081;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1077;
                this.match(QueryLangParser.NOT);
                this.state = 1079;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1078;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1083;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1085;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1084;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1089;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 128, this.context) ) {
            case 1:
                {
                this.state = 1087;
                this.dateList();
                }
                break;
            case 2:
                {
                this.state = 1088;
                this.dateTimeList();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inListVersionComparison(): InListVersionComparisonContext {
        let localContext = new InListVersionComparisonContext(this.context, this.state);
        this.enterRule(localContext, 154, QueryLangParser.RULE_inListVersionComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1095;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1091;
                this.match(QueryLangParser.NOT);
                this.state = 1093;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1092;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1097;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1099;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1098;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1101;
            this.versionList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        let localContext = new InRangeStringComparisonContext(this.context, this.state);
        this.enterRule(localContext, 156, QueryLangParser.RULE_inRangeStringComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1107;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1103;
                this.match(QueryLangParser.NOT);
                this.state = 1105;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1104;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1109;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1111;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1110;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1113;
            this.stringRange();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inRangeNumberComparison(): InRangeNumberComparisonContext {
        let localContext = new InRangeNumberComparisonContext(this.context, this.state);
        this.enterRule(localContext, 158, QueryLangParser.RULE_inRangeNumberComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1119;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1115;
                this.match(QueryLangParser.NOT);
                this.state = 1117;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1116;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1121;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1123;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1122;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1127;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
            case 1:
                {
                this.state = 1125;
                this.intRange();
                }
                break;
            case 2:
                {
                this.state = 1126;
                this.doubleRange();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inRangeDateComparison(): InRangeDateComparisonContext {
        let localContext = new InRangeDateComparisonContext(this.context, this.state);
        this.enterRule(localContext, 160, QueryLangParser.RULE_inRangeDateComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1133;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1129;
                this.match(QueryLangParser.NOT);
                this.state = 1131;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1130;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1135;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1137;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1136;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1141;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 142, this.context) ) {
            case 1:
                {
                this.state = 1139;
                this.dateRange();
                }
                break;
            case 2:
                {
                this.state = 1140;
                this.dateTimeRange();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public inRangeVersionComparison(): InRangeVersionComparisonContext {
        let localContext = new InRangeVersionComparisonContext(this.context, this.state);
        this.enterRule(localContext, 162, QueryLangParser.RULE_inRangeVersionComparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1147;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 1143;
                this.match(QueryLangParser.NOT);
                this.state = 1145;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 67) {
                    {
                    this.state = 1144;
                    this.match(QueryLangParser.SPACE);
                    }
                }

                }
            }

            this.state = 1149;
            localContext._op = this.match(QueryLangParser.IN);
            this.state = 1151;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1150;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1153;
            this.versionRange();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dataValue(): DataValueContext {
        let localContext = new DataValueContext(this.context, this.state);
        this.enterRule(localContext, 164, QueryLangParser.RULE_dataValue);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1155;
            this.match(QueryLangParser.DATA);
            this.state = 1156;
            this.match(QueryLangParser.T__4);
            this.state = 1157;
            localContext._fieldId = this.javaId();
            this.state = 1158;
            this.match(QueryLangParser.T__4);
            this.state = 1159;
            this.match(QueryLangParser.VALUE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dataOptions(): DataOptionsContext {
        let localContext = new DataOptionsContext(this.context, this.state);
        this.enterRule(localContext, 166, QueryLangParser.RULE_dataOptions);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1161;
            this.match(QueryLangParser.DATA);
            this.state = 1162;
            this.match(QueryLangParser.T__4);
            this.state = 1163;
            localContext._fieldId = this.javaId();
            this.state = 1164;
            this.match(QueryLangParser.T__4);
            this.state = 1165;
            this.match(QueryLangParser.OPTIONS);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public places(): PlacesContext {
        let localContext = new PlacesContext(this.context, this.state);
        this.enterRule(localContext, 168, QueryLangParser.RULE_places);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1167;
            this.match(QueryLangParser.PLACES);
            this.state = 1168;
            this.match(QueryLangParser.T__4);
            this.state = 1169;
            localContext._placeId = this.javaId();
            this.state = 1170;
            this.match(QueryLangParser.T__4);
            this.state = 1171;
            this.match(QueryLangParser.MARKING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tasksState(): TasksStateContext {
        let localContext = new TasksStateContext(this.context, this.state);
        this.enterRule(localContext, 170, QueryLangParser.RULE_tasksState);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1173;
            this.match(QueryLangParser.TASKS);
            this.state = 1174;
            this.match(QueryLangParser.T__4);
            this.state = 1175;
            localContext._taskId = this.javaId();
            this.state = 1176;
            this.match(QueryLangParser.T__4);
            this.state = 1177;
            this.match(QueryLangParser.STATE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tasksUserId(): TasksUserIdContext {
        let localContext = new TasksUserIdContext(this.context, this.state);
        this.enterRule(localContext, 172, QueryLangParser.RULE_tasksUserId);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1179;
            this.match(QueryLangParser.TASKS);
            this.state = 1180;
            this.match(QueryLangParser.T__4);
            this.state = 1181;
            localContext._taskId = this.javaId();
            this.state = 1182;
            this.match(QueryLangParser.T__4);
            this.state = 1183;
            this.match(QueryLangParser.USER_ID);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public javaId(): JavaIdContext {
        let localContext = new JavaIdContext(this.context, this.state);
        this.enterRule(localContext, 174, QueryLangParser.RULE_javaId);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1185;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & 4294967295) !== 0) || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 16411) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stringList(): StringListContext {
        let localContext = new StringListContext(this.context, this.state);
        this.enterRule(localContext, 176, QueryLangParser.RULE_stringList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1187;
            this.match(QueryLangParser.T__0);
            this.state = 1189;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 146, this.context) ) {
            case 1:
                {
                this.state = 1188;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            this.state = 1214;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 28673) !== 0)) {
                {
                this.state = 1193;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case QueryLangParser.STRING:
                    {
                    this.state = 1191;
                    this.match(QueryLangParser.STRING);
                    }
                    break;
                case QueryLangParser.LOGGED_USER_ID:
                case QueryLangParser.LOGGED_USER_FULLNAME:
                case QueryLangParser.LOGGED_USER_USERNAME:
                    {
                    this.state = 1192;
                    this.loggedUserStringAttribute();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 1196;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 148, this.context) ) {
                case 1:
                    {
                    this.state = 1195;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                this.state = 1211;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 4) {
                    {
                    {
                    this.state = 1198;
                    this.match(QueryLangParser.T__3);
                    this.state = 1200;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 1199;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    this.state = 1204;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case QueryLangParser.STRING:
                        {
                        this.state = 1202;
                        this.match(QueryLangParser.STRING);
                        }
                        break;
                    case QueryLangParser.LOGGED_USER_ID:
                    case QueryLangParser.LOGGED_USER_FULLNAME:
                    case QueryLangParser.LOGGED_USER_USERNAME:
                        {
                        this.state = 1203;
                        this.loggedUserStringAttribute();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 1207;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 151, this.context) ) {
                    case 1:
                        {
                        this.state = 1206;
                        this.match(QueryLangParser.SPACE);
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1213;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1217;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1216;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1219;
            this.match(QueryLangParser.T__1);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public intList(): IntListContext {
        let localContext = new IntListContext(this.context, this.state);
        this.enterRule(localContext, 178, QueryLangParser.RULE_intList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1221;
            this.match(QueryLangParser.T__0);
            this.state = 1223;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 155, this.context) ) {
            case 1:
                {
                this.state = 1222;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            this.state = 1242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 1225;
                this.match(QueryLangParser.INT);
                this.state = 1227;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 156, this.context) ) {
                case 1:
                    {
                    this.state = 1226;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                this.state = 1239;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 4) {
                    {
                    {
                    this.state = 1229;
                    this.match(QueryLangParser.T__3);
                    this.state = 1231;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 1230;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    this.state = 1233;
                    this.match(QueryLangParser.INT);
                    this.state = 1235;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 158, this.context) ) {
                    case 1:
                        {
                        this.state = 1234;
                        this.match(QueryLangParser.SPACE);
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1241;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1245;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1244;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1247;
            this.match(QueryLangParser.T__1);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public doubleList(): DoubleListContext {
        let localContext = new DoubleListContext(this.context, this.state);
        this.enterRule(localContext, 180, QueryLangParser.RULE_doubleList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1249;
            this.match(QueryLangParser.T__0);
            this.state = 1251;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 162, this.context) ) {
            case 1:
                {
                this.state = 1250;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            this.state = 1270;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 59) {
                {
                this.state = 1253;
                this.match(QueryLangParser.DOUBLE);
                this.state = 1255;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 163, this.context) ) {
                case 1:
                    {
                    this.state = 1254;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                this.state = 1267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 4) {
                    {
                    {
                    this.state = 1257;
                    this.match(QueryLangParser.T__3);
                    this.state = 1259;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 1258;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    this.state = 1261;
                    this.match(QueryLangParser.DOUBLE);
                    this.state = 1263;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 165, this.context) ) {
                    case 1:
                        {
                        this.state = 1262;
                        this.match(QueryLangParser.SPACE);
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1269;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1273;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1272;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1275;
            this.match(QueryLangParser.T__1);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateList(): DateListContext {
        let localContext = new DateListContext(this.context, this.state);
        this.enterRule(localContext, 182, QueryLangParser.RULE_dateList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1277;
            this.match(QueryLangParser.T__0);
            this.state = 1279;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 169, this.context) ) {
            case 1:
                {
                this.state = 1278;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            this.state = 1298;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 61) {
                {
                this.state = 1281;
                this.match(QueryLangParser.DATE);
                this.state = 1283;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 170, this.context) ) {
                case 1:
                    {
                    this.state = 1282;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                this.state = 1295;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 4) {
                    {
                    {
                    this.state = 1285;
                    this.match(QueryLangParser.T__3);
                    this.state = 1287;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 1286;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    this.state = 1289;
                    this.match(QueryLangParser.DATE);
                    this.state = 1291;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 172, this.context) ) {
                    case 1:
                        {
                        this.state = 1290;
                        this.match(QueryLangParser.SPACE);
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1297;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1301;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1300;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1303;
            this.match(QueryLangParser.T__1);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateTimeList(): DateTimeListContext {
        let localContext = new DateTimeListContext(this.context, this.state);
        this.enterRule(localContext, 184, QueryLangParser.RULE_dateTimeList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1305;
            this.match(QueryLangParser.T__0);
            this.state = 1307;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 176, this.context) ) {
            case 1:
                {
                this.state = 1306;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            this.state = 1326;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 60) {
                {
                this.state = 1309;
                this.match(QueryLangParser.DATETIME);
                this.state = 1311;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 177, this.context) ) {
                case 1:
                    {
                    this.state = 1310;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                this.state = 1323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 4) {
                    {
                    {
                    this.state = 1313;
                    this.match(QueryLangParser.T__3);
                    this.state = 1315;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 1314;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    this.state = 1317;
                    this.match(QueryLangParser.DATETIME);
                    this.state = 1319;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 179, this.context) ) {
                    case 1:
                        {
                        this.state = 1318;
                        this.match(QueryLangParser.SPACE);
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1325;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1329;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1328;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1331;
            this.match(QueryLangParser.T__1);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public versionList(): VersionListContext {
        let localContext = new VersionListContext(this.context, this.state);
        this.enterRule(localContext, 186, QueryLangParser.RULE_versionList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1333;
            this.match(QueryLangParser.T__0);
            this.state = 1335;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 183, this.context) ) {
            case 1:
                {
                this.state = 1334;
                this.match(QueryLangParser.SPACE);
                }
                break;
            }
            this.state = 1354;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 63) {
                {
                this.state = 1337;
                this.match(QueryLangParser.VERSION_NUMBER);
                this.state = 1339;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 184, this.context) ) {
                case 1:
                    {
                    this.state = 1338;
                    this.match(QueryLangParser.SPACE);
                    }
                    break;
                }
                this.state = 1351;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 4) {
                    {
                    {
                    this.state = 1341;
                    this.match(QueryLangParser.T__3);
                    this.state = 1343;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 67) {
                        {
                        this.state = 1342;
                        this.match(QueryLangParser.SPACE);
                        }
                    }

                    this.state = 1345;
                    this.match(QueryLangParser.VERSION_NUMBER);
                    this.state = 1347;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 186, this.context) ) {
                    case 1:
                        {
                        this.state = 1346;
                        this.match(QueryLangParser.SPACE);
                        }
                        break;
                    }
                    }
                    }
                    this.state = 1353;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 1357;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1356;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1359;
            this.match(QueryLangParser.T__1);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stringRange(): StringRangeContext {
        let localContext = new StringRangeContext(this.context, this.state);
        this.enterRule(localContext, 188, QueryLangParser.RULE_stringRange);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1361;
            localContext._leftEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 6)) {
                localContext._leftEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1363;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1362;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1367;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.STRING:
                {
                this.state = 1365;
                this.match(QueryLangParser.STRING);
                }
                break;
            case QueryLangParser.LOGGED_USER_ID:
            case QueryLangParser.LOGGED_USER_FULLNAME:
            case QueryLangParser.LOGGED_USER_USERNAME:
                {
                this.state = 1366;
                this.loggedUserStringAttribute();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 1370;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1369;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1372;
            this.match(QueryLangParser.T__2);
            this.state = 1374;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1373;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1378;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case QueryLangParser.STRING:
                {
                this.state = 1376;
                this.match(QueryLangParser.STRING);
                }
                break;
            case QueryLangParser.LOGGED_USER_ID:
            case QueryLangParser.LOGGED_USER_FULLNAME:
            case QueryLangParser.LOGGED_USER_USERNAME:
                {
                this.state = 1377;
                this.loggedUserStringAttribute();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 1381;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1380;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1383;
            localContext._rightEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 7)) {
                localContext._rightEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public intRange(): IntRangeContext {
        let localContext = new IntRangeContext(this.context, this.state);
        this.enterRule(localContext, 190, QueryLangParser.RULE_intRange);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1385;
            localContext._leftEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 6)) {
                localContext._leftEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1387;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1386;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1389;
            this.match(QueryLangParser.INT);
            this.state = 1391;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1390;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1393;
            this.match(QueryLangParser.T__2);
            this.state = 1395;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1394;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1397;
            this.match(QueryLangParser.INT);
            this.state = 1399;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1398;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1401;
            localContext._rightEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 7)) {
                localContext._rightEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public doubleRange(): DoubleRangeContext {
        let localContext = new DoubleRangeContext(this.context, this.state);
        this.enterRule(localContext, 192, QueryLangParser.RULE_doubleRange);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1403;
            localContext._leftEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 6)) {
                localContext._leftEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1405;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1404;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1407;
            this.match(QueryLangParser.DOUBLE);
            this.state = 1409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1408;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1411;
            this.match(QueryLangParser.T__2);
            this.state = 1413;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1412;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1415;
            this.match(QueryLangParser.DOUBLE);
            this.state = 1417;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1416;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1419;
            localContext._rightEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 7)) {
                localContext._rightEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateRange(): DateRangeContext {
        let localContext = new DateRangeContext(this.context, this.state);
        this.enterRule(localContext, 194, QueryLangParser.RULE_dateRange);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1421;
            localContext._leftEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 6)) {
                localContext._leftEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1423;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1422;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1425;
            this.match(QueryLangParser.DATE);
            this.state = 1427;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1426;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1429;
            this.match(QueryLangParser.T__2);
            this.state = 1431;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1430;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1433;
            this.match(QueryLangParser.DATE);
            this.state = 1435;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1434;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1437;
            localContext._rightEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 7)) {
                localContext._rightEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateTimeRange(): DateTimeRangeContext {
        let localContext = new DateTimeRangeContext(this.context, this.state);
        this.enterRule(localContext, 196, QueryLangParser.RULE_dateTimeRange);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1439;
            localContext._leftEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 6)) {
                localContext._leftEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1441;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1440;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1443;
            this.match(QueryLangParser.DATETIME);
            this.state = 1445;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1444;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1447;
            this.match(QueryLangParser.T__2);
            this.state = 1449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1448;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1451;
            this.match(QueryLangParser.DATETIME);
            this.state = 1453;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1452;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1455;
            localContext._rightEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 7)) {
                localContext._rightEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public versionRange(): VersionRangeContext {
        let localContext = new VersionRangeContext(this.context, this.state);
        this.enterRule(localContext, 198, QueryLangParser.RULE_versionRange);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1457;
            localContext._leftEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 1 || _la === 6)) {
                localContext._leftEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 1459;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1458;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1461;
            this.match(QueryLangParser.VERSION_NUMBER);
            this.state = 1463;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1462;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1465;
            this.match(QueryLangParser.T__2);
            this.state = 1467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1466;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1469;
            this.match(QueryLangParser.VERSION_NUMBER);
            this.state = 1471;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 67) {
                {
                this.state = 1470;
                this.match(QueryLangParser.SPACE);
                }
            }

            this.state = 1473;
            localContext._rightEndpoint = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 2 || _la === 7)) {
                localContext._rightEndpoint = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public loggedUserStringAttribute(): LoggedUserStringAttributeContext {
        let localContext = new LoggedUserStringAttributeContext(this.context, this.state);
        this.enterRule(localContext, 200, QueryLangParser.RULE_loggedUserStringAttribute);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1475;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,72,1478,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,
        72,7,72,2,73,7,73,2,74,7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,
        78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,7,82,2,83,7,83,2,84,7,84,2,
        85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,89,2,90,7,90,2,91,7,
        91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,2,97,7,97,2,
        98,7,98,2,99,7,99,2,100,7,100,1,0,1,0,3,0,205,8,0,1,0,1,0,1,0,3,
        0,210,8,0,1,0,1,0,1,0,3,0,215,8,0,1,0,1,0,1,0,3,0,220,8,0,1,0,3,
        0,223,8,0,1,1,1,1,3,1,227,8,1,1,1,3,1,230,8,1,1,1,3,1,233,8,1,1,
        2,1,2,3,2,237,8,2,1,2,3,2,240,8,2,1,2,3,2,243,8,2,1,3,1,3,3,3,247,
        8,3,1,3,3,3,250,8,3,1,3,3,3,253,8,3,1,4,1,4,3,4,257,8,4,1,4,3,4,
        260,8,4,1,4,3,4,263,8,4,1,5,1,5,1,6,1,6,1,6,1,6,1,6,5,6,272,8,6,
        10,6,12,6,275,9,6,1,7,1,7,1,7,1,7,1,7,5,7,282,8,7,10,7,12,7,285,
        9,7,1,8,1,8,1,8,3,8,290,8,8,3,8,292,8,8,1,8,1,8,3,8,296,8,8,1,8,
        1,8,3,8,300,8,8,1,8,1,8,3,8,304,8,8,3,8,306,8,8,1,9,1,9,3,9,310,
        8,9,1,10,1,10,1,11,1,11,1,11,1,11,1,11,5,11,319,8,11,10,11,12,11,
        322,9,11,1,12,1,12,1,12,1,12,1,12,5,12,329,8,12,10,12,12,12,332,
        9,12,1,13,1,13,1,13,3,13,337,8,13,3,13,339,8,13,1,13,1,13,3,13,343,
        8,13,1,13,1,13,3,13,347,8,13,1,13,1,13,3,13,351,8,13,3,13,353,8,
        13,1,14,1,14,3,14,357,8,14,1,15,1,15,1,16,1,16,1,16,1,16,1,16,5,
        16,366,8,16,10,16,12,16,369,9,16,1,17,1,17,1,17,1,17,1,17,5,17,376,
        8,17,10,17,12,17,379,9,17,1,18,1,18,1,18,3,18,384,8,18,3,18,386,
        8,18,1,18,1,18,3,18,390,8,18,1,18,1,18,3,18,394,8,18,1,18,1,18,3,
        18,398,8,18,3,18,400,8,18,1,19,1,19,3,19,404,8,19,1,20,1,20,1,21,
        1,21,1,21,1,21,1,21,5,21,413,8,21,10,21,12,21,416,9,21,1,22,1,22,
        1,22,1,22,1,22,5,22,423,8,22,10,22,12,22,426,9,22,1,23,1,23,1,23,
        3,23,431,8,23,3,23,433,8,23,1,23,1,23,3,23,437,8,23,1,23,1,23,3,
        23,441,8,23,1,23,1,23,3,23,445,8,23,3,23,447,8,23,1,24,1,24,3,24,
        451,8,24,1,25,1,25,1,25,1,25,3,25,457,8,25,1,25,1,25,3,25,461,8,
        25,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,470,8,26,1,26,3,26,473,
        8,26,1,27,1,27,1,27,1,27,1,27,3,27,480,8,27,1,27,5,27,483,8,27,10,
        27,12,27,486,9,27,1,27,3,27,489,8,27,1,28,1,28,1,28,3,28,494,8,28,
        1,29,1,29,1,30,1,30,1,30,1,30,1,30,3,30,503,8,30,1,30,5,30,506,8,
        30,10,30,12,30,509,9,30,1,30,3,30,512,8,30,1,31,1,31,1,31,3,31,517,
        8,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,
        530,8,32,1,33,1,33,1,33,1,33,1,33,3,33,537,8,33,1,33,5,33,540,8,
        33,10,33,12,33,543,9,33,1,33,3,33,546,8,33,1,34,1,34,1,34,3,34,551,
        8,34,1,35,1,35,1,36,1,36,1,36,1,36,1,36,3,36,560,8,36,1,36,5,36,
        563,8,36,10,36,12,36,566,9,36,1,36,3,36,569,8,36,1,37,1,37,1,37,
        3,37,574,8,37,1,38,1,38,1,39,1,39,1,39,1,39,1,39,3,39,583,8,39,1,
        40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,3,40,596,8,
        40,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,3,41,607,8,41,1,
        42,1,42,1,42,1,42,3,42,613,8,42,1,43,1,43,1,43,1,43,1,43,1,43,1,
        43,1,43,1,43,3,43,624,8,43,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,
        44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,3,44,641,8,44,1,45,1,45,1,
        45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,1,45,3,45,655,8,45,1,
        46,1,46,1,46,1,46,3,46,661,8,46,3,46,663,8,46,1,46,1,46,1,46,1,46,
        1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,3,46,677,8,46,1,47,1,47,
        1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,
        3,47,694,8,47,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,3,48,
        705,8,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,3,49,716,8,
        49,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,3,
        50,730,8,50,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,51,3,51,741,
        8,51,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,
        3,52,755,8,52,1,53,1,53,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,
        1,54,1,54,1,54,1,54,1,54,3,54,772,8,54,1,55,1,55,1,55,1,55,1,55,
        1,55,1,55,1,55,1,55,3,55,783,8,55,1,56,1,56,1,56,1,56,1,56,1,56,
        1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,3,56,800,8,56,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,3,57,817,8,57,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,
        1,58,1,58,1,58,3,58,831,8,58,1,59,1,59,1,59,1,59,1,59,1,59,1,59,
        1,59,1,59,1,59,1,59,1,59,3,59,845,8,59,1,60,1,60,1,60,1,60,1,60,
        1,60,1,60,1,60,1,60,1,60,1,60,1,60,3,60,859,8,60,1,61,1,61,1,61,
        1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,
        1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,
        1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,
        1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,61,3,61,913,8,61,
        1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,
        1,62,1,62,1,62,3,62,931,8,62,1,63,1,63,1,63,1,63,1,63,1,63,1,63,
        1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,3,63,949,8,63,1,64,
        1,64,1,64,1,64,3,64,955,8,64,3,64,957,8,64,1,64,1,64,1,64,1,64,1,
        65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,3,65,975,
        8,65,1,66,1,66,3,66,979,8,66,3,66,981,8,66,1,66,1,66,1,66,1,66,1,
        67,1,67,3,67,989,8,67,3,67,991,8,67,1,67,1,67,1,67,1,67,3,67,997,
        8,67,1,68,1,68,1,68,1,69,1,69,3,69,1004,8,69,3,69,1006,8,69,1,69,
        1,69,1,69,1,69,1,70,1,70,3,70,1014,8,70,3,70,1016,8,70,1,70,1,70,
        1,70,1,70,1,71,1,71,3,71,1024,8,71,3,71,1026,8,71,1,71,1,71,1,71,
        1,71,1,72,1,72,3,72,1034,8,72,3,72,1036,8,72,1,72,1,72,1,72,1,72,
        1,73,1,73,3,73,1044,8,73,3,73,1046,8,73,1,73,1,73,1,73,1,73,1,74,
        1,74,3,74,1054,8,74,3,74,1056,8,74,1,74,1,74,3,74,1060,8,74,1,74,
        1,74,1,75,1,75,3,75,1066,8,75,3,75,1068,8,75,1,75,1,75,3,75,1072,
        8,75,1,75,1,75,3,75,1076,8,75,1,76,1,76,3,76,1080,8,76,3,76,1082,
        8,76,1,76,1,76,3,76,1086,8,76,1,76,1,76,3,76,1090,8,76,1,77,1,77,
        3,77,1094,8,77,3,77,1096,8,77,1,77,1,77,3,77,1100,8,77,1,77,1,77,
        1,78,1,78,3,78,1106,8,78,3,78,1108,8,78,1,78,1,78,3,78,1112,8,78,
        1,78,1,78,1,79,1,79,3,79,1118,8,79,3,79,1120,8,79,1,79,1,79,3,79,
        1124,8,79,1,79,1,79,3,79,1128,8,79,1,80,1,80,3,80,1132,8,80,3,80,
        1134,8,80,1,80,1,80,3,80,1138,8,80,1,80,1,80,3,80,1142,8,80,1,81,
        1,81,3,81,1146,8,81,3,81,1148,8,81,1,81,1,81,3,81,1152,8,81,1,81,
        1,81,1,82,1,82,1,82,1,82,1,82,1,82,1,83,1,83,1,83,1,83,1,83,1,83,
        1,84,1,84,1,84,1,84,1,84,1,84,1,85,1,85,1,85,1,85,1,85,1,85,1,86,
        1,86,1,86,1,86,1,86,1,86,1,87,1,87,1,88,1,88,3,88,1190,8,88,1,88,
        1,88,3,88,1194,8,88,1,88,3,88,1197,8,88,1,88,1,88,3,88,1201,8,88,
        1,88,1,88,3,88,1205,8,88,1,88,3,88,1208,8,88,5,88,1210,8,88,10,88,
        12,88,1213,9,88,3,88,1215,8,88,1,88,3,88,1218,8,88,1,88,1,88,1,89,
        1,89,3,89,1224,8,89,1,89,1,89,3,89,1228,8,89,1,89,1,89,3,89,1232,
        8,89,1,89,1,89,3,89,1236,8,89,5,89,1238,8,89,10,89,12,89,1241,9,
        89,3,89,1243,8,89,1,89,3,89,1246,8,89,1,89,1,89,1,90,1,90,3,90,1252,
        8,90,1,90,1,90,3,90,1256,8,90,1,90,1,90,3,90,1260,8,90,1,90,1,90,
        3,90,1264,8,90,5,90,1266,8,90,10,90,12,90,1269,9,90,3,90,1271,8,
        90,1,90,3,90,1274,8,90,1,90,1,90,1,91,1,91,3,91,1280,8,91,1,91,1,
        91,3,91,1284,8,91,1,91,1,91,3,91,1288,8,91,1,91,1,91,3,91,1292,8,
        91,5,91,1294,8,91,10,91,12,91,1297,9,91,3,91,1299,8,91,1,91,3,91,
        1302,8,91,1,91,1,91,1,92,1,92,3,92,1308,8,92,1,92,1,92,3,92,1312,
        8,92,1,92,1,92,3,92,1316,8,92,1,92,1,92,3,92,1320,8,92,5,92,1322,
        8,92,10,92,12,92,1325,9,92,3,92,1327,8,92,1,92,3,92,1330,8,92,1,
        92,1,92,1,93,1,93,3,93,1336,8,93,1,93,1,93,3,93,1340,8,93,1,93,1,
        93,3,93,1344,8,93,1,93,1,93,3,93,1348,8,93,5,93,1350,8,93,10,93,
        12,93,1353,9,93,3,93,1355,8,93,1,93,3,93,1358,8,93,1,93,1,93,1,94,
        1,94,3,94,1364,8,94,1,94,1,94,3,94,1368,8,94,1,94,3,94,1371,8,94,
        1,94,1,94,3,94,1375,8,94,1,94,1,94,3,94,1379,8,94,1,94,3,94,1382,
        8,94,1,94,1,94,1,95,1,95,3,95,1388,8,95,1,95,1,95,3,95,1392,8,95,
        1,95,1,95,3,95,1396,8,95,1,95,1,95,3,95,1400,8,95,1,95,1,95,1,96,
        1,96,3,96,1406,8,96,1,96,1,96,3,96,1410,8,96,1,96,1,96,3,96,1414,
        8,96,1,96,1,96,3,96,1418,8,96,1,96,1,96,1,97,1,97,3,97,1424,8,97,
        1,97,1,97,3,97,1428,8,97,1,97,1,97,3,97,1432,8,97,1,97,1,97,3,97,
        1436,8,97,1,97,1,97,1,98,1,98,3,98,1442,8,98,1,98,1,98,3,98,1446,
        8,98,1,98,1,98,3,98,1450,8,98,1,98,1,98,3,98,1454,8,98,1,98,1,98,
        1,99,1,99,3,99,1460,8,99,1,99,1,99,3,99,1464,8,99,1,99,1,99,3,99,
        1468,8,99,1,99,1,99,3,99,1472,8,99,1,99,1,99,1,100,1,100,1,100,0,
        0,101,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,
        42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,
        86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,
        122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,
        154,156,158,160,162,164,166,168,170,172,174,176,178,180,182,184,
        186,188,190,192,194,196,198,200,0,20,1,0,26,27,1,0,20,21,1,0,22,
        23,1,0,24,25,1,0,55,56,1,0,28,32,3,0,28,29,33,33,37,42,2,0,28,28,
        43,45,2,0,12,12,14,17,1,0,50,51,1,0,12,13,2,0,57,57,69,69,1,0,12,
        18,1,0,12,17,1,0,58,59,2,0,62,62,72,72,3,0,20,53,55,56,66,66,2,0,
        1,1,6,6,2,0,2,2,7,7,1,0,69,71,1672,0,222,1,0,0,0,2,224,1,0,0,0,4,
        234,1,0,0,0,6,244,1,0,0,0,8,254,1,0,0,0,10,264,1,0,0,0,12,266,1,
        0,0,0,14,276,1,0,0,0,16,305,1,0,0,0,18,307,1,0,0,0,20,311,1,0,0,
        0,22,313,1,0,0,0,24,323,1,0,0,0,26,352,1,0,0,0,28,354,1,0,0,0,30,
        358,1,0,0,0,32,360,1,0,0,0,34,370,1,0,0,0,36,399,1,0,0,0,38,401,
        1,0,0,0,40,405,1,0,0,0,42,407,1,0,0,0,44,417,1,0,0,0,46,446,1,0,
        0,0,48,448,1,0,0,0,50,460,1,0,0,0,52,462,1,0,0,0,54,474,1,0,0,0,
        56,490,1,0,0,0,58,495,1,0,0,0,60,497,1,0,0,0,62,513,1,0,0,0,64,529,
        1,0,0,0,66,531,1,0,0,0,68,547,1,0,0,0,70,552,1,0,0,0,72,554,1,0,
        0,0,74,570,1,0,0,0,76,575,1,0,0,0,78,582,1,0,0,0,80,595,1,0,0,0,
        82,606,1,0,0,0,84,612,1,0,0,0,86,623,1,0,0,0,88,640,1,0,0,0,90,654,
        1,0,0,0,92,676,1,0,0,0,94,693,1,0,0,0,96,704,1,0,0,0,98,715,1,0,
        0,0,100,729,1,0,0,0,102,740,1,0,0,0,104,754,1,0,0,0,106,756,1,0,
        0,0,108,771,1,0,0,0,110,782,1,0,0,0,112,799,1,0,0,0,114,816,1,0,
        0,0,116,830,1,0,0,0,118,844,1,0,0,0,120,858,1,0,0,0,122,912,1,0,
        0,0,124,930,1,0,0,0,126,948,1,0,0,0,128,950,1,0,0,0,130,974,1,0,
        0,0,132,980,1,0,0,0,134,990,1,0,0,0,136,998,1,0,0,0,138,1005,1,0,
        0,0,140,1015,1,0,0,0,142,1025,1,0,0,0,144,1035,1,0,0,0,146,1045,
        1,0,0,0,148,1055,1,0,0,0,150,1067,1,0,0,0,152,1081,1,0,0,0,154,1095,
        1,0,0,0,156,1107,1,0,0,0,158,1119,1,0,0,0,160,1133,1,0,0,0,162,1147,
        1,0,0,0,164,1155,1,0,0,0,166,1161,1,0,0,0,168,1167,1,0,0,0,170,1173,
        1,0,0,0,172,1179,1,0,0,0,174,1185,1,0,0,0,176,1187,1,0,0,0,178,1221,
        1,0,0,0,180,1249,1,0,0,0,182,1277,1,0,0,0,184,1305,1,0,0,0,186,1333,
        1,0,0,0,188,1361,1,0,0,0,190,1385,1,0,0,0,192,1403,1,0,0,0,194,1421,
        1,0,0,0,196,1439,1,0,0,0,198,1457,1,0,0,0,200,1475,1,0,0,0,202,204,
        7,0,0,0,203,205,3,2,1,0,204,203,1,0,0,0,204,205,1,0,0,0,205,206,
        1,0,0,0,206,223,5,0,0,1,207,209,7,1,0,0,208,210,3,4,2,0,209,208,
        1,0,0,0,209,210,1,0,0,0,210,211,1,0,0,0,211,223,5,0,0,1,212,214,
        7,2,0,0,213,215,3,6,3,0,214,213,1,0,0,0,214,215,1,0,0,0,215,216,
        1,0,0,0,216,223,5,0,0,1,217,219,7,3,0,0,218,220,3,8,4,0,219,218,
        1,0,0,0,219,220,1,0,0,0,220,221,1,0,0,0,221,223,5,0,0,1,222,202,
        1,0,0,0,222,207,1,0,0,0,222,212,1,0,0,0,222,217,1,0,0,0,223,1,1,
        0,0,0,224,226,3,50,25,0,225,227,3,10,5,0,226,225,1,0,0,0,226,227,
        1,0,0,0,227,229,1,0,0,0,228,230,3,52,26,0,229,228,1,0,0,0,229,230,
        1,0,0,0,230,232,1,0,0,0,231,233,3,54,27,0,232,231,1,0,0,0,232,233,
        1,0,0,0,233,3,1,0,0,0,234,236,3,50,25,0,235,237,3,20,10,0,236,235,
        1,0,0,0,236,237,1,0,0,0,237,239,1,0,0,0,238,240,3,52,26,0,239,238,
        1,0,0,0,239,240,1,0,0,0,240,242,1,0,0,0,241,243,3,60,30,0,242,241,
        1,0,0,0,242,243,1,0,0,0,243,5,1,0,0,0,244,246,3,50,25,0,245,247,
        3,30,15,0,246,245,1,0,0,0,246,247,1,0,0,0,247,249,1,0,0,0,248,250,
        3,52,26,0,249,248,1,0,0,0,249,250,1,0,0,0,250,252,1,0,0,0,251,253,
        3,66,33,0,252,251,1,0,0,0,252,253,1,0,0,0,253,7,1,0,0,0,254,256,
        3,50,25,0,255,257,3,40,20,0,256,255,1,0,0,0,256,257,1,0,0,0,257,
        259,1,0,0,0,258,260,3,52,26,0,259,258,1,0,0,0,259,260,1,0,0,0,260,
        262,1,0,0,0,261,263,3,72,36,0,262,261,1,0,0,0,262,263,1,0,0,0,263,
        9,1,0,0,0,264,265,3,12,6,0,265,11,1,0,0,0,266,273,3,14,7,0,267,268,
        5,67,0,0,268,269,5,10,0,0,269,270,5,67,0,0,270,272,3,14,7,0,271,
        267,1,0,0,0,272,275,1,0,0,0,273,271,1,0,0,0,273,274,1,0,0,0,274,
        13,1,0,0,0,275,273,1,0,0,0,276,283,3,16,8,0,277,278,5,67,0,0,278,
        279,5,9,0,0,279,280,5,67,0,0,280,282,3,16,8,0,281,277,1,0,0,0,282,
        285,1,0,0,0,283,281,1,0,0,0,283,284,1,0,0,0,284,15,1,0,0,0,285,283,
        1,0,0,0,286,306,3,18,9,0,287,289,5,11,0,0,288,290,5,67,0,0,289,288,
        1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,287,1,0,0,0,291,292,
        1,0,0,0,292,293,1,0,0,0,293,295,5,1,0,0,294,296,5,67,0,0,295,294,
        1,0,0,0,295,296,1,0,0,0,296,297,1,0,0,0,297,299,3,10,5,0,298,300,
        5,67,0,0,299,298,1,0,0,0,299,300,1,0,0,0,300,301,1,0,0,0,301,303,
        5,2,0,0,302,304,5,67,0,0,303,302,1,0,0,0,303,304,1,0,0,0,304,306,
        1,0,0,0,305,286,1,0,0,0,305,291,1,0,0,0,306,17,1,0,0,0,307,309,3,
        78,39,0,308,310,5,67,0,0,309,308,1,0,0,0,309,310,1,0,0,0,310,19,
        1,0,0,0,311,312,3,22,11,0,312,21,1,0,0,0,313,320,3,24,12,0,314,315,
        5,67,0,0,315,316,5,10,0,0,316,317,5,67,0,0,317,319,3,24,12,0,318,
        314,1,0,0,0,319,322,1,0,0,0,320,318,1,0,0,0,320,321,1,0,0,0,321,
        23,1,0,0,0,322,320,1,0,0,0,323,330,3,26,13,0,324,325,5,67,0,0,325,
        326,5,9,0,0,326,327,5,67,0,0,327,329,3,26,13,0,328,324,1,0,0,0,329,
        332,1,0,0,0,330,328,1,0,0,0,330,331,1,0,0,0,331,25,1,0,0,0,332,330,
        1,0,0,0,333,353,3,28,14,0,334,336,5,11,0,0,335,337,5,67,0,0,336,
        335,1,0,0,0,336,337,1,0,0,0,337,339,1,0,0,0,338,334,1,0,0,0,338,
        339,1,0,0,0,339,340,1,0,0,0,340,342,5,1,0,0,341,343,5,67,0,0,342,
        341,1,0,0,0,342,343,1,0,0,0,343,344,1,0,0,0,344,346,3,20,10,0,345,
        347,5,67,0,0,346,345,1,0,0,0,346,347,1,0,0,0,347,348,1,0,0,0,348,
        350,5,2,0,0,349,351,5,67,0,0,350,349,1,0,0,0,350,351,1,0,0,0,351,
        353,1,0,0,0,352,333,1,0,0,0,352,338,1,0,0,0,353,27,1,0,0,0,354,356,
        3,80,40,0,355,357,5,67,0,0,356,355,1,0,0,0,356,357,1,0,0,0,357,29,
        1,0,0,0,358,359,3,32,16,0,359,31,1,0,0,0,360,367,3,34,17,0,361,362,
        5,67,0,0,362,363,5,10,0,0,363,364,5,67,0,0,364,366,3,34,17,0,365,
        361,1,0,0,0,366,369,1,0,0,0,367,365,1,0,0,0,367,368,1,0,0,0,368,
        33,1,0,0,0,369,367,1,0,0,0,370,377,3,36,18,0,371,372,5,67,0,0,372,
        373,5,9,0,0,373,374,5,67,0,0,374,376,3,36,18,0,375,371,1,0,0,0,376,
        379,1,0,0,0,377,375,1,0,0,0,377,378,1,0,0,0,378,35,1,0,0,0,379,377,
        1,0,0,0,380,400,3,38,19,0,381,383,5,11,0,0,382,384,5,67,0,0,383,
        382,1,0,0,0,383,384,1,0,0,0,384,386,1,0,0,0,385,381,1,0,0,0,385,
        386,1,0,0,0,386,387,1,0,0,0,387,389,5,1,0,0,388,390,5,67,0,0,389,
        388,1,0,0,0,389,390,1,0,0,0,390,391,1,0,0,0,391,393,3,30,15,0,392,
        394,5,67,0,0,393,392,1,0,0,0,393,394,1,0,0,0,394,395,1,0,0,0,395,
        397,5,2,0,0,396,398,5,67,0,0,397,396,1,0,0,0,397,398,1,0,0,0,398,
        400,1,0,0,0,399,380,1,0,0,0,399,385,1,0,0,0,400,37,1,0,0,0,401,403,
        3,82,41,0,402,404,5,67,0,0,403,402,1,0,0,0,403,404,1,0,0,0,404,39,
        1,0,0,0,405,406,3,42,21,0,406,41,1,0,0,0,407,414,3,44,22,0,408,409,
        5,67,0,0,409,410,5,10,0,0,410,411,5,67,0,0,411,413,3,44,22,0,412,
        408,1,0,0,0,413,416,1,0,0,0,414,412,1,0,0,0,414,415,1,0,0,0,415,
        43,1,0,0,0,416,414,1,0,0,0,417,424,3,46,23,0,418,419,5,67,0,0,419,
        420,5,9,0,0,420,421,5,67,0,0,421,423,3,46,23,0,422,418,1,0,0,0,423,
        426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,45,1,0,0,0,426,424,
        1,0,0,0,427,447,3,48,24,0,428,430,5,11,0,0,429,431,5,67,0,0,430,
        429,1,0,0,0,430,431,1,0,0,0,431,433,1,0,0,0,432,428,1,0,0,0,432,
        433,1,0,0,0,433,434,1,0,0,0,434,436,5,1,0,0,435,437,5,67,0,0,436,
        435,1,0,0,0,436,437,1,0,0,0,437,438,1,0,0,0,438,440,3,40,20,0,439,
        441,5,67,0,0,440,439,1,0,0,0,440,441,1,0,0,0,441,442,1,0,0,0,442,
        444,5,2,0,0,443,445,5,67,0,0,444,443,1,0,0,0,444,445,1,0,0,0,445,
        447,1,0,0,0,446,427,1,0,0,0,446,432,1,0,0,0,447,47,1,0,0,0,448,450,
        3,84,42,0,449,451,5,67,0,0,450,449,1,0,0,0,450,451,1,0,0,0,451,49,
        1,0,0,0,452,453,5,67,0,0,453,454,5,8,0,0,454,461,5,67,0,0,455,457,
        5,67,0,0,456,455,1,0,0,0,456,457,1,0,0,0,457,458,1,0,0,0,458,459,
        5,3,0,0,459,461,5,67,0,0,460,452,1,0,0,0,460,456,1,0,0,0,461,51,
        1,0,0,0,462,463,5,52,0,0,463,464,5,67,0,0,464,469,5,58,0,0,465,466,
        5,67,0,0,466,467,5,53,0,0,467,468,5,67,0,0,468,470,5,58,0,0,469,
        465,1,0,0,0,469,470,1,0,0,0,470,472,1,0,0,0,471,473,5,67,0,0,472,
        471,1,0,0,0,472,473,1,0,0,0,473,53,1,0,0,0,474,475,5,54,0,0,475,
        476,5,67,0,0,476,484,3,56,28,0,477,479,5,4,0,0,478,480,5,67,0,0,
        479,478,1,0,0,0,479,480,1,0,0,0,480,481,1,0,0,0,481,483,3,56,28,
        0,482,477,1,0,0,0,483,486,1,0,0,0,484,482,1,0,0,0,484,485,1,0,0,
        0,485,488,1,0,0,0,486,484,1,0,0,0,487,489,5,67,0,0,488,487,1,0,0,
        0,488,489,1,0,0,0,489,55,1,0,0,0,490,493,3,58,29,0,491,492,5,67,
        0,0,492,494,7,4,0,0,493,491,1,0,0,0,493,494,1,0,0,0,494,57,1,0,0,
        0,495,496,7,5,0,0,496,59,1,0,0,0,497,498,5,54,0,0,498,499,5,67,0,
        0,499,507,3,62,31,0,500,502,5,4,0,0,501,503,5,67,0,0,502,501,1,0,
        0,0,502,503,1,0,0,0,503,504,1,0,0,0,504,506,3,62,31,0,505,500,1,
        0,0,0,506,509,1,0,0,0,507,505,1,0,0,0,507,508,1,0,0,0,508,511,1,
        0,0,0,509,507,1,0,0,0,510,512,5,67,0,0,511,510,1,0,0,0,511,512,1,
        0,0,0,512,61,1,0,0,0,513,516,3,64,32,0,514,515,5,67,0,0,515,517,
        7,4,0,0,516,514,1,0,0,0,516,517,1,0,0,0,517,63,1,0,0,0,518,530,5,
        28,0,0,519,530,5,33,0,0,520,530,5,34,0,0,521,530,5,29,0,0,522,530,
        5,32,0,0,523,530,5,35,0,0,524,530,3,168,84,0,525,530,3,172,86,0,
        526,530,3,170,85,0,527,530,3,164,82,0,528,530,3,166,83,0,529,518,
        1,0,0,0,529,519,1,0,0,0,529,520,1,0,0,0,529,521,1,0,0,0,529,522,
        1,0,0,0,529,523,1,0,0,0,529,524,1,0,0,0,529,525,1,0,0,0,529,526,
        1,0,0,0,529,527,1,0,0,0,529,528,1,0,0,0,530,65,1,0,0,0,531,532,5,
        54,0,0,532,533,5,67,0,0,533,541,3,68,34,0,534,536,5,4,0,0,535,537,
        5,67,0,0,536,535,1,0,0,0,536,537,1,0,0,0,537,538,1,0,0,0,538,540,
        3,68,34,0,539,534,1,0,0,0,540,543,1,0,0,0,541,539,1,0,0,0,541,542,
        1,0,0,0,542,545,1,0,0,0,543,541,1,0,0,0,544,546,5,67,0,0,545,544,
        1,0,0,0,545,546,1,0,0,0,546,67,1,0,0,0,547,550,3,70,35,0,548,549,
        5,67,0,0,549,551,7,4,0,0,550,548,1,0,0,0,550,551,1,0,0,0,551,69,
        1,0,0,0,552,553,7,6,0,0,553,71,1,0,0,0,554,555,5,54,0,0,555,556,
        5,67,0,0,556,564,3,74,37,0,557,559,5,4,0,0,558,560,5,67,0,0,559,
        558,1,0,0,0,559,560,1,0,0,0,560,561,1,0,0,0,561,563,3,74,37,0,562,
        557,1,0,0,0,563,566,1,0,0,0,564,562,1,0,0,0,564,565,1,0,0,0,565,
        568,1,0,0,0,566,564,1,0,0,0,567,569,5,67,0,0,568,567,1,0,0,0,568,
        569,1,0,0,0,569,73,1,0,0,0,570,573,3,76,38,0,571,572,5,67,0,0,572,
        574,7,4,0,0,573,571,1,0,0,0,573,574,1,0,0,0,574,75,1,0,0,0,575,576,
        7,7,0,0,576,77,1,0,0,0,577,583,3,86,43,0,578,583,3,90,45,0,579,583,
        3,92,46,0,580,583,3,88,44,0,581,583,3,94,47,0,582,577,1,0,0,0,582,
        578,1,0,0,0,582,579,1,0,0,0,582,580,1,0,0,0,582,581,1,0,0,0,583,
        79,1,0,0,0,584,596,3,86,43,0,585,596,3,98,49,0,586,596,3,100,50,
        0,587,596,3,88,44,0,588,596,3,94,47,0,589,596,3,102,51,0,590,596,
        3,126,63,0,591,596,3,128,64,0,592,596,3,130,65,0,593,596,3,122,61,
        0,594,596,3,124,62,0,595,584,1,0,0,0,595,585,1,0,0,0,595,586,1,0,
        0,0,595,587,1,0,0,0,595,588,1,0,0,0,595,589,1,0,0,0,595,590,1,0,
        0,0,595,591,1,0,0,0,595,592,1,0,0,0,595,593,1,0,0,0,595,594,1,0,
        0,0,596,81,1,0,0,0,597,607,3,86,43,0,598,607,3,104,52,0,599,607,
        3,88,44,0,600,607,3,106,53,0,601,607,3,108,54,0,602,607,3,110,55,
        0,603,607,3,96,48,0,604,607,3,112,56,0,605,607,3,114,57,0,606,597,
        1,0,0,0,606,598,1,0,0,0,606,599,1,0,0,0,606,600,1,0,0,0,606,601,
        1,0,0,0,606,602,1,0,0,0,606,603,1,0,0,0,606,604,1,0,0,0,606,605,
        1,0,0,0,607,83,1,0,0,0,608,613,3,86,43,0,609,613,3,116,58,0,610,
        613,3,118,59,0,611,613,3,120,60,0,612,608,1,0,0,0,612,609,1,0,0,
        0,612,610,1,0,0,0,612,611,1,0,0,0,613,85,1,0,0,0,614,615,5,28,0,
        0,615,616,5,67,0,0,616,624,3,132,66,0,617,618,5,28,0,0,618,619,5,
        67,0,0,619,624,3,148,74,0,620,621,5,28,0,0,621,622,5,67,0,0,622,
        624,3,146,73,0,623,614,1,0,0,0,623,617,1,0,0,0,623,620,1,0,0,0,624,
        87,1,0,0,0,625,626,5,29,0,0,626,627,5,67,0,0,627,641,3,134,67,0,
        628,629,5,29,0,0,629,630,5,67,0,0,630,641,3,136,68,0,631,632,5,29,
        0,0,632,633,5,67,0,0,633,641,3,148,74,0,634,635,5,29,0,0,635,636,
        5,67,0,0,636,641,3,156,78,0,637,638,5,29,0,0,638,639,5,67,0,0,639,
        641,3,146,73,0,640,625,1,0,0,0,640,628,1,0,0,0,640,631,1,0,0,0,640,
        634,1,0,0,0,640,637,1,0,0,0,641,89,1,0,0,0,642,643,5,30,0,0,643,
        644,5,67,0,0,644,655,3,134,67,0,645,646,5,30,0,0,646,647,5,67,0,
        0,647,655,3,148,74,0,648,649,5,30,0,0,649,650,5,67,0,0,650,655,3,
        156,78,0,651,652,5,30,0,0,652,653,5,67,0,0,653,655,3,146,73,0,654,
        642,1,0,0,0,654,645,1,0,0,0,654,648,1,0,0,0,654,651,1,0,0,0,655,
        91,1,0,0,0,656,657,5,31,0,0,657,662,5,67,0,0,658,660,5,11,0,0,659,
        661,5,67,0,0,660,659,1,0,0,0,660,661,1,0,0,0,661,663,1,0,0,0,662,
        658,1,0,0,0,662,663,1,0,0,0,663,664,1,0,0,0,664,665,7,8,0,0,665,
        666,5,67,0,0,666,677,5,63,0,0,667,668,5,31,0,0,668,669,5,67,0,0,
        669,677,3,154,77,0,670,671,5,31,0,0,671,672,5,67,0,0,672,677,3,162,
        81,0,673,674,5,31,0,0,674,675,5,67,0,0,675,677,3,146,73,0,676,656,
        1,0,0,0,676,667,1,0,0,0,676,670,1,0,0,0,676,673,1,0,0,0,677,93,1,
        0,0,0,678,679,5,32,0,0,679,680,5,67,0,0,680,694,3,140,70,0,681,682,
        5,32,0,0,682,683,5,67,0,0,683,694,3,142,71,0,684,685,5,32,0,0,685,
        686,5,67,0,0,686,694,3,152,76,0,687,688,5,32,0,0,688,689,5,67,0,
        0,689,694,3,160,80,0,690,691,5,32,0,0,691,692,5,67,0,0,692,694,3,
        146,73,0,693,678,1,0,0,0,693,681,1,0,0,0,693,684,1,0,0,0,693,687,
        1,0,0,0,693,690,1,0,0,0,694,95,1,0,0,0,695,696,5,33,0,0,696,697,
        5,67,0,0,697,705,3,134,67,0,698,699,5,33,0,0,699,700,5,67,0,0,700,
        705,3,148,74,0,701,702,5,33,0,0,702,703,5,67,0,0,703,705,3,146,73,
        0,704,695,1,0,0,0,704,698,1,0,0,0,704,701,1,0,0,0,705,97,1,0,0,0,
        706,707,5,33,0,0,707,708,5,67,0,0,708,716,3,132,66,0,709,710,5,33,
        0,0,710,711,5,67,0,0,711,716,3,148,74,0,712,713,5,33,0,0,713,714,
        5,67,0,0,714,716,3,146,73,0,715,706,1,0,0,0,715,709,1,0,0,0,715,
        712,1,0,0,0,716,99,1,0,0,0,717,718,5,34,0,0,718,719,5,67,0,0,719,
        730,3,134,67,0,720,721,5,34,0,0,721,722,5,67,0,0,722,730,3,148,74,
        0,723,724,5,34,0,0,724,725,5,67,0,0,725,730,3,156,78,0,726,727,5,
        34,0,0,727,728,5,67,0,0,728,730,3,146,73,0,729,717,1,0,0,0,729,720,
        1,0,0,0,729,723,1,0,0,0,729,726,1,0,0,0,730,101,1,0,0,0,731,732,
        5,35,0,0,732,733,5,67,0,0,733,741,3,134,67,0,734,735,5,35,0,0,735,
        736,5,67,0,0,736,741,3,148,74,0,737,738,5,35,0,0,738,739,5,67,0,
        0,739,741,3,146,73,0,740,731,1,0,0,0,740,734,1,0,0,0,740,737,1,0,
        0,0,741,103,1,0,0,0,742,743,5,37,0,0,743,744,5,67,0,0,744,755,3,
        134,67,0,745,746,5,37,0,0,746,747,5,67,0,0,747,755,3,148,74,0,748,
        749,5,37,0,0,749,750,5,67,0,0,750,755,3,156,78,0,751,752,5,37,0,
        0,752,753,5,67,0,0,753,755,3,146,73,0,754,742,1,0,0,0,754,745,1,
        0,0,0,754,748,1,0,0,0,754,751,1,0,0,0,755,105,1,0,0,0,756,757,5,
        38,0,0,757,758,5,67,0,0,758,759,5,12,0,0,759,760,5,67,0,0,760,761,
        7,9,0,0,761,107,1,0,0,0,762,763,5,39,0,0,763,764,5,67,0,0,764,772,
        3,134,67,0,765,766,5,39,0,0,766,767,5,67,0,0,767,772,3,148,74,0,
        768,769,5,39,0,0,769,770,5,67,0,0,770,772,3,146,73,0,771,762,1,0,
        0,0,771,765,1,0,0,0,771,768,1,0,0,0,772,109,1,0,0,0,773,774,5,40,
        0,0,774,775,5,67,0,0,775,783,3,134,67,0,776,777,5,40,0,0,777,778,
        5,67,0,0,778,783,3,148,74,0,779,780,5,40,0,0,780,781,5,67,0,0,781,
        783,3,146,73,0,782,773,1,0,0,0,782,776,1,0,0,0,782,779,1,0,0,0,783,
        111,1,0,0,0,784,785,5,41,0,0,785,786,5,67,0,0,786,800,3,140,70,0,
        787,788,5,41,0,0,788,789,5,67,0,0,789,800,3,142,71,0,790,791,5,41,
        0,0,791,792,5,67,0,0,792,800,3,152,76,0,793,794,5,41,0,0,794,795,
        5,67,0,0,795,800,3,160,80,0,796,797,5,41,0,0,797,798,5,67,0,0,798,
        800,3,146,73,0,799,784,1,0,0,0,799,787,1,0,0,0,799,790,1,0,0,0,799,
        793,1,0,0,0,799,796,1,0,0,0,800,113,1,0,0,0,801,802,5,42,0,0,802,
        803,5,67,0,0,803,817,3,140,70,0,804,805,5,42,0,0,805,806,5,67,0,
        0,806,817,3,142,71,0,807,808,5,42,0,0,808,809,5,67,0,0,809,817,3,
        152,76,0,810,811,5,42,0,0,811,812,5,67,0,0,812,817,3,160,80,0,813,
        814,5,42,0,0,814,815,5,67,0,0,815,817,3,146,73,0,816,801,1,0,0,0,
        816,804,1,0,0,0,816,807,1,0,0,0,816,810,1,0,0,0,816,813,1,0,0,0,
        817,115,1,0,0,0,818,819,5,43,0,0,819,820,5,67,0,0,820,831,3,134,
        67,0,821,822,5,43,0,0,822,823,5,67,0,0,823,831,3,148,74,0,824,825,
        5,43,0,0,825,826,5,67,0,0,826,831,3,156,78,0,827,828,5,43,0,0,828,
        829,5,67,0,0,829,831,3,146,73,0,830,818,1,0,0,0,830,821,1,0,0,0,
        830,824,1,0,0,0,830,827,1,0,0,0,831,117,1,0,0,0,832,833,5,44,0,0,
        833,834,5,67,0,0,834,845,3,134,67,0,835,836,5,44,0,0,836,837,5,67,
        0,0,837,845,3,148,74,0,838,839,5,44,0,0,839,840,5,67,0,0,840,845,
        3,156,78,0,841,842,5,44,0,0,842,843,5,67,0,0,843,845,3,146,73,0,
        844,832,1,0,0,0,844,835,1,0,0,0,844,838,1,0,0,0,844,841,1,0,0,0,
        845,119,1,0,0,0,846,847,5,45,0,0,847,848,5,67,0,0,848,859,3,134,
        67,0,849,850,5,45,0,0,850,851,5,67,0,0,851,859,3,148,74,0,852,853,
        5,45,0,0,853,854,5,67,0,0,854,859,3,156,78,0,855,856,5,45,0,0,856,
        857,5,67,0,0,857,859,3,146,73,0,858,846,1,0,0,0,858,849,1,0,0,0,
        858,852,1,0,0,0,858,855,1,0,0,0,859,121,1,0,0,0,860,861,3,164,82,
        0,861,862,5,67,0,0,862,863,3,134,67,0,863,913,1,0,0,0,864,865,3,
        164,82,0,865,866,5,67,0,0,866,867,3,136,68,0,867,913,1,0,0,0,868,
        869,3,164,82,0,869,870,5,67,0,0,870,871,3,138,69,0,871,913,1,0,0,
        0,872,873,3,164,82,0,873,874,5,67,0,0,874,875,3,140,70,0,875,913,
        1,0,0,0,876,877,3,164,82,0,877,878,5,67,0,0,878,879,3,142,71,0,879,
        913,1,0,0,0,880,881,3,164,82,0,881,882,5,67,0,0,882,883,3,144,72,
        0,883,913,1,0,0,0,884,885,3,164,82,0,885,886,5,67,0,0,886,887,3,
        148,74,0,887,913,1,0,0,0,888,889,3,164,82,0,889,890,5,67,0,0,890,
        891,3,150,75,0,891,913,1,0,0,0,892,893,3,164,82,0,893,894,5,67,0,
        0,894,895,3,152,76,0,895,913,1,0,0,0,896,897,3,164,82,0,897,898,
        5,67,0,0,898,899,3,156,78,0,899,913,1,0,0,0,900,901,3,164,82,0,901,
        902,5,67,0,0,902,903,3,158,79,0,903,913,1,0,0,0,904,905,3,164,82,
        0,905,906,5,67,0,0,906,907,3,160,80,0,907,913,1,0,0,0,908,909,3,
        164,82,0,909,910,5,67,0,0,910,911,3,146,73,0,911,913,1,0,0,0,912,
        860,1,0,0,0,912,864,1,0,0,0,912,868,1,0,0,0,912,872,1,0,0,0,912,
        876,1,0,0,0,912,880,1,0,0,0,912,884,1,0,0,0,912,888,1,0,0,0,912,
        892,1,0,0,0,912,896,1,0,0,0,912,900,1,0,0,0,912,904,1,0,0,0,912,
        908,1,0,0,0,913,123,1,0,0,0,914,915,3,166,83,0,915,916,5,67,0,0,
        916,917,3,134,67,0,917,931,1,0,0,0,918,919,3,166,83,0,919,920,5,
        67,0,0,920,921,3,148,74,0,921,931,1,0,0,0,922,923,3,166,83,0,923,
        924,5,67,0,0,924,925,3,156,78,0,925,931,1,0,0,0,926,927,3,166,83,
        0,927,928,5,67,0,0,928,929,3,146,73,0,929,931,1,0,0,0,930,914,1,
        0,0,0,930,918,1,0,0,0,930,922,1,0,0,0,930,926,1,0,0,0,931,125,1,
        0,0,0,932,933,3,168,84,0,933,934,5,67,0,0,934,935,3,138,69,0,935,
        949,1,0,0,0,936,937,3,168,84,0,937,938,5,67,0,0,938,939,3,150,75,
        0,939,949,1,0,0,0,940,941,3,168,84,0,941,942,5,67,0,0,942,943,3,
        158,79,0,943,949,1,0,0,0,944,945,3,168,84,0,945,946,5,67,0,0,946,
        947,3,146,73,0,947,949,1,0,0,0,948,932,1,0,0,0,948,936,1,0,0,0,948,
        940,1,0,0,0,948,944,1,0,0,0,949,127,1,0,0,0,950,951,3,170,85,0,951,
        956,5,67,0,0,952,954,5,11,0,0,953,955,5,67,0,0,954,953,1,0,0,0,954,
        955,1,0,0,0,955,957,1,0,0,0,956,952,1,0,0,0,956,957,1,0,0,0,957,
        958,1,0,0,0,958,959,5,12,0,0,959,960,5,67,0,0,960,961,7,9,0,0,961,
        129,1,0,0,0,962,963,3,172,86,0,963,964,5,67,0,0,964,965,3,134,67,
        0,965,975,1,0,0,0,966,967,3,172,86,0,967,968,5,67,0,0,968,969,3,
        148,74,0,969,975,1,0,0,0,970,971,3,172,86,0,971,972,5,67,0,0,972,
        973,3,146,73,0,973,975,1,0,0,0,974,962,1,0,0,0,974,966,1,0,0,0,974,
        970,1,0,0,0,975,131,1,0,0,0,976,978,5,11,0,0,977,979,5,67,0,0,978,
        977,1,0,0,0,978,979,1,0,0,0,979,981,1,0,0,0,980,976,1,0,0,0,980,
        981,1,0,0,0,981,982,1,0,0,0,982,983,7,10,0,0,983,984,5,67,0,0,984,
        985,7,11,0,0,985,133,1,0,0,0,986,988,5,11,0,0,987,989,5,67,0,0,988,
        987,1,0,0,0,988,989,1,0,0,0,989,991,1,0,0,0,990,986,1,0,0,0,990,
        991,1,0,0,0,991,992,1,0,0,0,992,993,7,12,0,0,993,996,5,67,0,0,994,
        997,5,57,0,0,995,997,3,200,100,0,996,994,1,0,0,0,996,995,1,0,0,0,
        997,135,1,0,0,0,998,999,3,134,67,0,999,1000,5,65,0,0,1000,137,1,
        0,0,0,1001,1003,5,11,0,0,1002,1004,5,67,0,0,1003,1002,1,0,0,0,1003,
        1004,1,0,0,0,1004,1006,1,0,0,0,1005,1001,1,0,0,0,1005,1006,1,0,0,
        0,1006,1007,1,0,0,0,1007,1008,7,13,0,0,1008,1009,5,67,0,0,1009,1010,
        7,14,0,0,1010,139,1,0,0,0,1011,1013,5,11,0,0,1012,1014,5,67,0,0,
        1013,1012,1,0,0,0,1013,1014,1,0,0,0,1014,1016,1,0,0,0,1015,1011,
        1,0,0,0,1015,1016,1,0,0,0,1016,1017,1,0,0,0,1017,1018,7,13,0,0,1018,
        1019,5,67,0,0,1019,1020,5,61,0,0,1020,141,1,0,0,0,1021,1023,5,11,
        0,0,1022,1024,5,67,0,0,1023,1022,1,0,0,0,1023,1024,1,0,0,0,1024,
        1026,1,0,0,0,1025,1021,1,0,0,0,1025,1026,1,0,0,0,1026,1027,1,0,0,
        0,1027,1028,7,13,0,0,1028,1029,5,67,0,0,1029,1030,5,60,0,0,1030,
        143,1,0,0,0,1031,1033,5,11,0,0,1032,1034,5,67,0,0,1033,1032,1,0,
        0,0,1033,1034,1,0,0,0,1034,1036,1,0,0,0,1035,1031,1,0,0,0,1035,1036,
        1,0,0,0,1036,1037,1,0,0,0,1037,1038,7,10,0,0,1038,1039,5,67,0,0,
        1039,1040,7,15,0,0,1040,145,1,0,0,0,1041,1043,5,11,0,0,1042,1044,
        5,67,0,0,1043,1042,1,0,0,0,1043,1044,1,0,0,0,1044,1046,1,0,0,0,1045,
        1041,1,0,0,0,1045,1046,1,0,0,0,1046,1047,1,0,0,0,1047,1048,7,10,
        0,0,1048,1049,5,67,0,0,1049,1050,5,64,0,0,1050,147,1,0,0,0,1051,
        1053,5,11,0,0,1052,1054,5,67,0,0,1053,1052,1,0,0,0,1053,1054,1,0,
        0,0,1054,1056,1,0,0,0,1055,1051,1,0,0,0,1055,1056,1,0,0,0,1056,1057,
        1,0,0,0,1057,1059,5,19,0,0,1058,1060,5,67,0,0,1059,1058,1,0,0,0,
        1059,1060,1,0,0,0,1060,1061,1,0,0,0,1061,1062,3,176,88,0,1062,149,
        1,0,0,0,1063,1065,5,11,0,0,1064,1066,5,67,0,0,1065,1064,1,0,0,0,
        1065,1066,1,0,0,0,1066,1068,1,0,0,0,1067,1063,1,0,0,0,1067,1068,
        1,0,0,0,1068,1069,1,0,0,0,1069,1071,5,19,0,0,1070,1072,5,67,0,0,
        1071,1070,1,0,0,0,1071,1072,1,0,0,0,1072,1075,1,0,0,0,1073,1076,
        3,178,89,0,1074,1076,3,180,90,0,1075,1073,1,0,0,0,1075,1074,1,0,
        0,0,1076,151,1,0,0,0,1077,1079,5,11,0,0,1078,1080,5,67,0,0,1079,
        1078,1,0,0,0,1079,1080,1,0,0,0,1080,1082,1,0,0,0,1081,1077,1,0,0,
        0,1081,1082,1,0,0,0,1082,1083,1,0,0,0,1083,1085,5,19,0,0,1084,1086,
        5,67,0,0,1085,1084,1,0,0,0,1085,1086,1,0,0,0,1086,1089,1,0,0,0,1087,
        1090,3,182,91,0,1088,1090,3,184,92,0,1089,1087,1,0,0,0,1089,1088,
        1,0,0,0,1090,153,1,0,0,0,1091,1093,5,11,0,0,1092,1094,5,67,0,0,1093,
        1092,1,0,0,0,1093,1094,1,0,0,0,1094,1096,1,0,0,0,1095,1091,1,0,0,
        0,1095,1096,1,0,0,0,1096,1097,1,0,0,0,1097,1099,5,19,0,0,1098,1100,
        5,67,0,0,1099,1098,1,0,0,0,1099,1100,1,0,0,0,1100,1101,1,0,0,0,1101,
        1102,3,186,93,0,1102,155,1,0,0,0,1103,1105,5,11,0,0,1104,1106,5,
        67,0,0,1105,1104,1,0,0,0,1105,1106,1,0,0,0,1106,1108,1,0,0,0,1107,
        1103,1,0,0,0,1107,1108,1,0,0,0,1108,1109,1,0,0,0,1109,1111,5,19,
        0,0,1110,1112,5,67,0,0,1111,1110,1,0,0,0,1111,1112,1,0,0,0,1112,
        1113,1,0,0,0,1113,1114,3,188,94,0,1114,157,1,0,0,0,1115,1117,5,11,
        0,0,1116,1118,5,67,0,0,1117,1116,1,0,0,0,1117,1118,1,0,0,0,1118,
        1120,1,0,0,0,1119,1115,1,0,0,0,1119,1120,1,0,0,0,1120,1121,1,0,0,
        0,1121,1123,5,19,0,0,1122,1124,5,67,0,0,1123,1122,1,0,0,0,1123,1124,
        1,0,0,0,1124,1127,1,0,0,0,1125,1128,3,190,95,0,1126,1128,3,192,96,
        0,1127,1125,1,0,0,0,1127,1126,1,0,0,0,1128,159,1,0,0,0,1129,1131,
        5,11,0,0,1130,1132,5,67,0,0,1131,1130,1,0,0,0,1131,1132,1,0,0,0,
        1132,1134,1,0,0,0,1133,1129,1,0,0,0,1133,1134,1,0,0,0,1134,1135,
        1,0,0,0,1135,1137,5,19,0,0,1136,1138,5,67,0,0,1137,1136,1,0,0,0,
        1137,1138,1,0,0,0,1138,1141,1,0,0,0,1139,1142,3,194,97,0,1140,1142,
        3,196,98,0,1141,1139,1,0,0,0,1141,1140,1,0,0,0,1142,161,1,0,0,0,
        1143,1145,5,11,0,0,1144,1146,5,67,0,0,1145,1144,1,0,0,0,1145,1146,
        1,0,0,0,1146,1148,1,0,0,0,1147,1143,1,0,0,0,1147,1148,1,0,0,0,1148,
        1149,1,0,0,0,1149,1151,5,19,0,0,1150,1152,5,67,0,0,1151,1150,1,0,
        0,0,1151,1152,1,0,0,0,1152,1153,1,0,0,0,1153,1154,3,198,99,0,1154,
        163,1,0,0,0,1155,1156,5,46,0,0,1156,1157,5,5,0,0,1157,1158,3,174,
        87,0,1158,1159,5,5,0,0,1159,1160,5,47,0,0,1160,165,1,0,0,0,1161,
        1162,5,46,0,0,1162,1163,5,5,0,0,1163,1164,3,174,87,0,1164,1165,5,
        5,0,0,1165,1166,5,48,0,0,1166,167,1,0,0,0,1167,1168,5,36,0,0,1168,
        1169,5,5,0,0,1169,1170,3,174,87,0,1170,1171,5,5,0,0,1171,1172,5,
        49,0,0,1172,169,1,0,0,0,1173,1174,5,23,0,0,1174,1175,5,5,0,0,1175,
        1176,3,174,87,0,1176,1177,5,5,0,0,1177,1178,5,38,0,0,1178,171,1,
        0,0,0,1179,1180,5,23,0,0,1180,1181,5,5,0,0,1181,1182,3,174,87,0,
        1182,1183,5,5,0,0,1183,1184,5,39,0,0,1184,173,1,0,0,0,1185,1186,
        7,16,0,0,1186,175,1,0,0,0,1187,1189,5,1,0,0,1188,1190,5,67,0,0,1189,
        1188,1,0,0,0,1189,1190,1,0,0,0,1190,1214,1,0,0,0,1191,1194,5,57,
        0,0,1192,1194,3,200,100,0,1193,1191,1,0,0,0,1193,1192,1,0,0,0,1194,
        1196,1,0,0,0,1195,1197,5,67,0,0,1196,1195,1,0,0,0,1196,1197,1,0,
        0,0,1197,1211,1,0,0,0,1198,1200,5,4,0,0,1199,1201,5,67,0,0,1200,
        1199,1,0,0,0,1200,1201,1,0,0,0,1201,1204,1,0,0,0,1202,1205,5,57,
        0,0,1203,1205,3,200,100,0,1204,1202,1,0,0,0,1204,1203,1,0,0,0,1205,
        1207,1,0,0,0,1206,1208,5,67,0,0,1207,1206,1,0,0,0,1207,1208,1,0,
        0,0,1208,1210,1,0,0,0,1209,1198,1,0,0,0,1210,1213,1,0,0,0,1211,1209,
        1,0,0,0,1211,1212,1,0,0,0,1212,1215,1,0,0,0,1213,1211,1,0,0,0,1214,
        1193,1,0,0,0,1214,1215,1,0,0,0,1215,1217,1,0,0,0,1216,1218,5,67,
        0,0,1217,1216,1,0,0,0,1217,1218,1,0,0,0,1218,1219,1,0,0,0,1219,1220,
        5,2,0,0,1220,177,1,0,0,0,1221,1223,5,1,0,0,1222,1224,5,67,0,0,1223,
        1222,1,0,0,0,1223,1224,1,0,0,0,1224,1242,1,0,0,0,1225,1227,5,58,
        0,0,1226,1228,5,67,0,0,1227,1226,1,0,0,0,1227,1228,1,0,0,0,1228,
        1239,1,0,0,0,1229,1231,5,4,0,0,1230,1232,5,67,0,0,1231,1230,1,0,
        0,0,1231,1232,1,0,0,0,1232,1233,1,0,0,0,1233,1235,5,58,0,0,1234,
        1236,5,67,0,0,1235,1234,1,0,0,0,1235,1236,1,0,0,0,1236,1238,1,0,
        0,0,1237,1229,1,0,0,0,1238,1241,1,0,0,0,1239,1237,1,0,0,0,1239,1240,
        1,0,0,0,1240,1243,1,0,0,0,1241,1239,1,0,0,0,1242,1225,1,0,0,0,1242,
        1243,1,0,0,0,1243,1245,1,0,0,0,1244,1246,5,67,0,0,1245,1244,1,0,
        0,0,1245,1246,1,0,0,0,1246,1247,1,0,0,0,1247,1248,5,2,0,0,1248,179,
        1,0,0,0,1249,1251,5,1,0,0,1250,1252,5,67,0,0,1251,1250,1,0,0,0,1251,
        1252,1,0,0,0,1252,1270,1,0,0,0,1253,1255,5,59,0,0,1254,1256,5,67,
        0,0,1255,1254,1,0,0,0,1255,1256,1,0,0,0,1256,1267,1,0,0,0,1257,1259,
        5,4,0,0,1258,1260,5,67,0,0,1259,1258,1,0,0,0,1259,1260,1,0,0,0,1260,
        1261,1,0,0,0,1261,1263,5,59,0,0,1262,1264,5,67,0,0,1263,1262,1,0,
        0,0,1263,1264,1,0,0,0,1264,1266,1,0,0,0,1265,1257,1,0,0,0,1266,1269,
        1,0,0,0,1267,1265,1,0,0,0,1267,1268,1,0,0,0,1268,1271,1,0,0,0,1269,
        1267,1,0,0,0,1270,1253,1,0,0,0,1270,1271,1,0,0,0,1271,1273,1,0,0,
        0,1272,1274,5,67,0,0,1273,1272,1,0,0,0,1273,1274,1,0,0,0,1274,1275,
        1,0,0,0,1275,1276,5,2,0,0,1276,181,1,0,0,0,1277,1279,5,1,0,0,1278,
        1280,5,67,0,0,1279,1278,1,0,0,0,1279,1280,1,0,0,0,1280,1298,1,0,
        0,0,1281,1283,5,61,0,0,1282,1284,5,67,0,0,1283,1282,1,0,0,0,1283,
        1284,1,0,0,0,1284,1295,1,0,0,0,1285,1287,5,4,0,0,1286,1288,5,67,
        0,0,1287,1286,1,0,0,0,1287,1288,1,0,0,0,1288,1289,1,0,0,0,1289,1291,
        5,61,0,0,1290,1292,5,67,0,0,1291,1290,1,0,0,0,1291,1292,1,0,0,0,
        1292,1294,1,0,0,0,1293,1285,1,0,0,0,1294,1297,1,0,0,0,1295,1293,
        1,0,0,0,1295,1296,1,0,0,0,1296,1299,1,0,0,0,1297,1295,1,0,0,0,1298,
        1281,1,0,0,0,1298,1299,1,0,0,0,1299,1301,1,0,0,0,1300,1302,5,67,
        0,0,1301,1300,1,0,0,0,1301,1302,1,0,0,0,1302,1303,1,0,0,0,1303,1304,
        5,2,0,0,1304,183,1,0,0,0,1305,1307,5,1,0,0,1306,1308,5,67,0,0,1307,
        1306,1,0,0,0,1307,1308,1,0,0,0,1308,1326,1,0,0,0,1309,1311,5,60,
        0,0,1310,1312,5,67,0,0,1311,1310,1,0,0,0,1311,1312,1,0,0,0,1312,
        1323,1,0,0,0,1313,1315,5,4,0,0,1314,1316,5,67,0,0,1315,1314,1,0,
        0,0,1315,1316,1,0,0,0,1316,1317,1,0,0,0,1317,1319,5,60,0,0,1318,
        1320,5,67,0,0,1319,1318,1,0,0,0,1319,1320,1,0,0,0,1320,1322,1,0,
        0,0,1321,1313,1,0,0,0,1322,1325,1,0,0,0,1323,1321,1,0,0,0,1323,1324,
        1,0,0,0,1324,1327,1,0,0,0,1325,1323,1,0,0,0,1326,1309,1,0,0,0,1326,
        1327,1,0,0,0,1327,1329,1,0,0,0,1328,1330,5,67,0,0,1329,1328,1,0,
        0,0,1329,1330,1,0,0,0,1330,1331,1,0,0,0,1331,1332,5,2,0,0,1332,185,
        1,0,0,0,1333,1335,5,1,0,0,1334,1336,5,67,0,0,1335,1334,1,0,0,0,1335,
        1336,1,0,0,0,1336,1354,1,0,0,0,1337,1339,5,63,0,0,1338,1340,5,67,
        0,0,1339,1338,1,0,0,0,1339,1340,1,0,0,0,1340,1351,1,0,0,0,1341,1343,
        5,4,0,0,1342,1344,5,67,0,0,1343,1342,1,0,0,0,1343,1344,1,0,0,0,1344,
        1345,1,0,0,0,1345,1347,5,63,0,0,1346,1348,5,67,0,0,1347,1346,1,0,
        0,0,1347,1348,1,0,0,0,1348,1350,1,0,0,0,1349,1341,1,0,0,0,1350,1353,
        1,0,0,0,1351,1349,1,0,0,0,1351,1352,1,0,0,0,1352,1355,1,0,0,0,1353,
        1351,1,0,0,0,1354,1337,1,0,0,0,1354,1355,1,0,0,0,1355,1357,1,0,0,
        0,1356,1358,5,67,0,0,1357,1356,1,0,0,0,1357,1358,1,0,0,0,1358,1359,
        1,0,0,0,1359,1360,5,2,0,0,1360,187,1,0,0,0,1361,1363,7,17,0,0,1362,
        1364,5,67,0,0,1363,1362,1,0,0,0,1363,1364,1,0,0,0,1364,1367,1,0,
        0,0,1365,1368,5,57,0,0,1366,1368,3,200,100,0,1367,1365,1,0,0,0,1367,
        1366,1,0,0,0,1368,1370,1,0,0,0,1369,1371,5,67,0,0,1370,1369,1,0,
        0,0,1370,1371,1,0,0,0,1371,1372,1,0,0,0,1372,1374,5,3,0,0,1373,1375,
        5,67,0,0,1374,1373,1,0,0,0,1374,1375,1,0,0,0,1375,1378,1,0,0,0,1376,
        1379,5,57,0,0,1377,1379,3,200,100,0,1378,1376,1,0,0,0,1378,1377,
        1,0,0,0,1379,1381,1,0,0,0,1380,1382,5,67,0,0,1381,1380,1,0,0,0,1381,
        1382,1,0,0,0,1382,1383,1,0,0,0,1383,1384,7,18,0,0,1384,189,1,0,0,
        0,1385,1387,7,17,0,0,1386,1388,5,67,0,0,1387,1386,1,0,0,0,1387,1388,
        1,0,0,0,1388,1389,1,0,0,0,1389,1391,5,58,0,0,1390,1392,5,67,0,0,
        1391,1390,1,0,0,0,1391,1392,1,0,0,0,1392,1393,1,0,0,0,1393,1395,
        5,3,0,0,1394,1396,5,67,0,0,1395,1394,1,0,0,0,1395,1396,1,0,0,0,1396,
        1397,1,0,0,0,1397,1399,5,58,0,0,1398,1400,5,67,0,0,1399,1398,1,0,
        0,0,1399,1400,1,0,0,0,1400,1401,1,0,0,0,1401,1402,7,18,0,0,1402,
        191,1,0,0,0,1403,1405,7,17,0,0,1404,1406,5,67,0,0,1405,1404,1,0,
        0,0,1405,1406,1,0,0,0,1406,1407,1,0,0,0,1407,1409,5,59,0,0,1408,
        1410,5,67,0,0,1409,1408,1,0,0,0,1409,1410,1,0,0,0,1410,1411,1,0,
        0,0,1411,1413,5,3,0,0,1412,1414,5,67,0,0,1413,1412,1,0,0,0,1413,
        1414,1,0,0,0,1414,1415,1,0,0,0,1415,1417,5,59,0,0,1416,1418,5,67,
        0,0,1417,1416,1,0,0,0,1417,1418,1,0,0,0,1418,1419,1,0,0,0,1419,1420,
        7,18,0,0,1420,193,1,0,0,0,1421,1423,7,17,0,0,1422,1424,5,67,0,0,
        1423,1422,1,0,0,0,1423,1424,1,0,0,0,1424,1425,1,0,0,0,1425,1427,
        5,61,0,0,1426,1428,5,67,0,0,1427,1426,1,0,0,0,1427,1428,1,0,0,0,
        1428,1429,1,0,0,0,1429,1431,5,3,0,0,1430,1432,5,67,0,0,1431,1430,
        1,0,0,0,1431,1432,1,0,0,0,1432,1433,1,0,0,0,1433,1435,5,61,0,0,1434,
        1436,5,67,0,0,1435,1434,1,0,0,0,1435,1436,1,0,0,0,1436,1437,1,0,
        0,0,1437,1438,7,18,0,0,1438,195,1,0,0,0,1439,1441,7,17,0,0,1440,
        1442,5,67,0,0,1441,1440,1,0,0,0,1441,1442,1,0,0,0,1442,1443,1,0,
        0,0,1443,1445,5,60,0,0,1444,1446,5,67,0,0,1445,1444,1,0,0,0,1445,
        1446,1,0,0,0,1446,1447,1,0,0,0,1447,1449,5,3,0,0,1448,1450,5,67,
        0,0,1449,1448,1,0,0,0,1449,1450,1,0,0,0,1450,1451,1,0,0,0,1451,1453,
        5,60,0,0,1452,1454,5,67,0,0,1453,1452,1,0,0,0,1453,1454,1,0,0,0,
        1454,1455,1,0,0,0,1455,1456,7,18,0,0,1456,197,1,0,0,0,1457,1459,
        7,17,0,0,1458,1460,5,67,0,0,1459,1458,1,0,0,0,1459,1460,1,0,0,0,
        1460,1461,1,0,0,0,1461,1463,5,63,0,0,1462,1464,5,67,0,0,1463,1462,
        1,0,0,0,1463,1464,1,0,0,0,1464,1465,1,0,0,0,1465,1467,5,3,0,0,1466,
        1468,5,67,0,0,1467,1466,1,0,0,0,1467,1468,1,0,0,0,1468,1469,1,0,
        0,0,1469,1471,5,63,0,0,1470,1472,5,67,0,0,1471,1470,1,0,0,0,1471,
        1472,1,0,0,0,1472,1473,1,0,0,0,1473,1474,7,18,0,0,1474,199,1,0,0,
        0,1475,1476,7,19,0,0,1476,201,1,0,0,0,216,204,209,214,219,222,226,
        229,232,236,239,242,246,249,252,256,259,262,273,283,289,291,295,
        299,303,305,309,320,330,336,338,342,346,350,352,356,367,377,383,
        385,389,393,397,399,403,414,424,430,432,436,440,444,446,450,456,
        460,469,472,479,484,488,493,502,507,511,516,529,536,541,545,550,
        559,564,568,573,582,595,606,612,623,640,654,660,662,676,693,704,
        715,729,740,754,771,782,799,816,830,844,858,912,930,948,954,956,
        974,978,980,988,990,996,1003,1005,1013,1015,1023,1025,1033,1035,
        1043,1045,1053,1055,1059,1065,1067,1071,1075,1079,1081,1085,1089,
        1093,1095,1099,1105,1107,1111,1117,1119,1123,1127,1131,1133,1137,
        1141,1145,1147,1151,1189,1193,1196,1200,1204,1207,1211,1214,1217,
        1223,1227,1231,1235,1239,1242,1245,1251,1255,1259,1263,1267,1270,
        1273,1279,1283,1287,1291,1295,1298,1301,1307,1311,1315,1319,1323,
        1326,1329,1335,1339,1343,1347,1351,1354,1357,1363,1367,1370,1374,
        1378,1381,1387,1391,1395,1399,1405,1409,1413,1417,1423,1427,1431,
        1435,1441,1445,1449,1453,1459,1463,1467,1471
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!QueryLangParser.__ATN) {
            QueryLangParser.__ATN = new antlr.ATNDeserializer().deserialize(QueryLangParser._serializedATN);
        }

        return QueryLangParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(QueryLangParser.literalNames, QueryLangParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return QueryLangParser.vocabulary;
    }

    private static readonly decisionsToDFA = QueryLangParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class QueryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_query;
    }
    public override copyFrom(ctx: QueryContext): void {
        super.copyFrom(ctx);
    }
}
export class ProcessQueryContext extends QueryContext {
    public _resource?: Token | null;
    public constructor(ctx: QueryContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EOF, 0)!;
    }
    public PROCESS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS, 0);
    }
    public PROCESSES(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESSES, 0);
    }
    public processConditionsAndPaging(): ProcessConditionsAndPagingContext | null {
        return this.getRuleContext(0, ProcessConditionsAndPagingContext);
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessQuery) {
            return visitor.visitProcessQuery(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CaseQueryContext extends QueryContext {
    public _resource?: Token | null;
    public constructor(ctx: QueryContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EOF, 0)!;
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CASE, 0);
    }
    public CASES(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CASES, 0);
    }
    public caseConditionsAndPaging(): CaseConditionsAndPagingContext | null {
        return this.getRuleContext(0, CaseConditionsAndPagingContext);
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseQuery) {
            return visitor.visitCaseQuery(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TaskQueryContext extends QueryContext {
    public _resource?: Token | null;
    public constructor(ctx: QueryContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EOF, 0)!;
    }
    public TASK(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TASK, 0);
    }
    public TASKS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TASKS, 0);
    }
    public taskConditionsAndPaging(): TaskConditionsAndPagingContext | null {
        return this.getRuleContext(0, TaskConditionsAndPagingContext);
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskQuery) {
            return visitor.visitTaskQuery(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UserQueryContext extends QueryContext {
    public _resource?: Token | null;
    public constructor(ctx: QueryContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EOF, 0)!;
    }
    public USER(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.USER, 0);
    }
    public USERS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.USERS, 0);
    }
    public userConditionsAndPaging(): UserConditionsAndPagingContext | null {
        return this.getRuleContext(0, UserConditionsAndPagingContext);
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserQuery) {
            return visitor.visitUserQuery(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessConditionsAndPagingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public delimeter(): DelimeterContext {
        return this.getRuleContext(0, DelimeterContext)!;
    }
    public processConditions(): ProcessConditionsContext | null {
        return this.getRuleContext(0, ProcessConditionsContext);
    }
    public paging(): PagingContext | null {
        return this.getRuleContext(0, PagingContext);
    }
    public processSorting(): ProcessSortingContext | null {
        return this.getRuleContext(0, ProcessSortingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processConditionsAndPaging;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessConditionsAndPaging) {
            return visitor.visitProcessConditionsAndPaging(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseConditionsAndPagingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public delimeter(): DelimeterContext {
        return this.getRuleContext(0, DelimeterContext)!;
    }
    public caseConditions(): CaseConditionsContext | null {
        return this.getRuleContext(0, CaseConditionsContext);
    }
    public paging(): PagingContext | null {
        return this.getRuleContext(0, PagingContext);
    }
    public caseSorting(): CaseSortingContext | null {
        return this.getRuleContext(0, CaseSortingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseConditionsAndPaging;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseConditionsAndPaging) {
            return visitor.visitCaseConditionsAndPaging(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskConditionsAndPagingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public delimeter(): DelimeterContext {
        return this.getRuleContext(0, DelimeterContext)!;
    }
    public taskConditions(): TaskConditionsContext | null {
        return this.getRuleContext(0, TaskConditionsContext);
    }
    public paging(): PagingContext | null {
        return this.getRuleContext(0, PagingContext);
    }
    public taskSorting(): TaskSortingContext | null {
        return this.getRuleContext(0, TaskSortingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskConditionsAndPaging;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskConditionsAndPaging) {
            return visitor.visitTaskConditionsAndPaging(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserConditionsAndPagingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public delimeter(): DelimeterContext {
        return this.getRuleContext(0, DelimeterContext)!;
    }
    public userConditions(): UserConditionsContext | null {
        return this.getRuleContext(0, UserConditionsContext);
    }
    public paging(): PagingContext | null {
        return this.getRuleContext(0, PagingContext);
    }
    public userSorting(): UserSortingContext | null {
        return this.getRuleContext(0, UserSortingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userConditionsAndPaging;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserConditionsAndPaging) {
            return visitor.visitUserConditionsAndPaging(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessConditionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public processOrExpression(): ProcessOrExpressionContext {
        return this.getRuleContext(0, ProcessOrExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processConditions;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessConditions) {
            return visitor.visitProcessConditions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public processAndExpression(): ProcessAndExpressionContext[];
    public processAndExpression(i: number): ProcessAndExpressionContext | null;
    public processAndExpression(i?: number): ProcessAndExpressionContext[] | ProcessAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ProcessAndExpressionContext);
        }

        return this.getRuleContext(i, ProcessAndExpressionContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.OR);
    	} else {
    		return this.getToken(QueryLangParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processOrExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessOrExpression) {
            return visitor.visitProcessOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public processConditionGroup(): ProcessConditionGroupContext[];
    public processConditionGroup(i: number): ProcessConditionGroupContext | null;
    public processConditionGroup(i?: number): ProcessConditionGroupContext[] | ProcessConditionGroupContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ProcessConditionGroupContext);
        }

        return this.getRuleContext(i, ProcessConditionGroupContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.AND);
    	} else {
    		return this.getToken(QueryLangParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processAndExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessAndExpression) {
            return visitor.visitProcessAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessConditionGroupContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processConditionGroup;
    }
    public override copyFrom(ctx: ProcessConditionGroupContext): void {
        super.copyFrom(ctx);
    }
}
export class ProcessConditionGroupBasicContext extends ProcessConditionGroupContext {
    public constructor(ctx: ProcessConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public processCondition(): ProcessConditionContext {
        return this.getRuleContext(0, ProcessConditionContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessConditionGroupBasic) {
            return visitor.visitProcessConditionGroupBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessConditionGroupParenthesisContext extends ProcessConditionGroupContext {
    public constructor(ctx: ProcessConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public processConditions(): ProcessConditionsContext {
        return this.getRuleContext(0, ProcessConditionsContext)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessConditionGroupParenthesis) {
            return visitor.visitProcessConditionGroupParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public processComparisons(): ProcessComparisonsContext {
        return this.getRuleContext(0, ProcessComparisonsContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processCondition;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessCondition) {
            return visitor.visitProcessCondition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseConditionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public caseOrExpression(): CaseOrExpressionContext {
        return this.getRuleContext(0, CaseOrExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseConditions;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseConditions) {
            return visitor.visitCaseConditions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public caseAndExpression(): CaseAndExpressionContext[];
    public caseAndExpression(i: number): CaseAndExpressionContext | null;
    public caseAndExpression(i?: number): CaseAndExpressionContext[] | CaseAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseAndExpressionContext);
        }

        return this.getRuleContext(i, CaseAndExpressionContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.OR);
    	} else {
    		return this.getToken(QueryLangParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseOrExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseOrExpression) {
            return visitor.visitCaseOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public caseConditionGroup(): CaseConditionGroupContext[];
    public caseConditionGroup(i: number): CaseConditionGroupContext | null;
    public caseConditionGroup(i?: number): CaseConditionGroupContext[] | CaseConditionGroupContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseConditionGroupContext);
        }

        return this.getRuleContext(i, CaseConditionGroupContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.AND);
    	} else {
    		return this.getToken(QueryLangParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseAndExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseAndExpression) {
            return visitor.visitCaseAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseConditionGroupContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseConditionGroup;
    }
    public override copyFrom(ctx: CaseConditionGroupContext): void {
        super.copyFrom(ctx);
    }
}
export class CaseConditionGroupBasicContext extends CaseConditionGroupContext {
    public constructor(ctx: CaseConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public caseCondition(): CaseConditionContext {
        return this.getRuleContext(0, CaseConditionContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseConditionGroupBasic) {
            return visitor.visitCaseConditionGroupBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CaseConditionGroupParenthesisContext extends CaseConditionGroupContext {
    public constructor(ctx: CaseConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public caseConditions(): CaseConditionsContext {
        return this.getRuleContext(0, CaseConditionsContext)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseConditionGroupParenthesis) {
            return visitor.visitCaseConditionGroupParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public caseComparisons(): CaseComparisonsContext {
        return this.getRuleContext(0, CaseComparisonsContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseCondition;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseCondition) {
            return visitor.visitCaseCondition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskConditionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public taskOrExpression(): TaskOrExpressionContext {
        return this.getRuleContext(0, TaskOrExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskConditions;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskConditions) {
            return visitor.visitTaskConditions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public taskAndExpression(): TaskAndExpressionContext[];
    public taskAndExpression(i: number): TaskAndExpressionContext | null;
    public taskAndExpression(i?: number): TaskAndExpressionContext[] | TaskAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TaskAndExpressionContext);
        }

        return this.getRuleContext(i, TaskAndExpressionContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.OR);
    	} else {
    		return this.getToken(QueryLangParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskOrExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskOrExpression) {
            return visitor.visitTaskOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public taskConditionGroup(): TaskConditionGroupContext[];
    public taskConditionGroup(i: number): TaskConditionGroupContext | null;
    public taskConditionGroup(i?: number): TaskConditionGroupContext[] | TaskConditionGroupContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TaskConditionGroupContext);
        }

        return this.getRuleContext(i, TaskConditionGroupContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.AND);
    	} else {
    		return this.getToken(QueryLangParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskAndExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskAndExpression) {
            return visitor.visitTaskAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskConditionGroupContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskConditionGroup;
    }
    public override copyFrom(ctx: TaskConditionGroupContext): void {
        super.copyFrom(ctx);
    }
}
export class TaskConditionGroupBasicContext extends TaskConditionGroupContext {
    public constructor(ctx: TaskConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public taskCondition(): TaskConditionContext {
        return this.getRuleContext(0, TaskConditionContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskConditionGroupBasic) {
            return visitor.visitTaskConditionGroupBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TaskConditionGroupParenthesisContext extends TaskConditionGroupContext {
    public constructor(ctx: TaskConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public taskConditions(): TaskConditionsContext {
        return this.getRuleContext(0, TaskConditionsContext)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskConditionGroupParenthesis) {
            return visitor.visitTaskConditionGroupParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public taskComparisons(): TaskComparisonsContext {
        return this.getRuleContext(0, TaskComparisonsContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskCondition;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskCondition) {
            return visitor.visitTaskCondition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserConditionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userOrExpression(): UserOrExpressionContext {
        return this.getRuleContext(0, UserOrExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userConditions;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserConditions) {
            return visitor.visitUserConditions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserOrExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userAndExpression(): UserAndExpressionContext[];
    public userAndExpression(i: number): UserAndExpressionContext | null;
    public userAndExpression(i?: number): UserAndExpressionContext[] | UserAndExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UserAndExpressionContext);
        }

        return this.getRuleContext(i, UserAndExpressionContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public OR(): antlr.TerminalNode[];
    public OR(i: number): antlr.TerminalNode | null;
    public OR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.OR);
    	} else {
    		return this.getToken(QueryLangParser.OR, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userOrExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserOrExpression) {
            return visitor.visitUserOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserAndExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userConditionGroup(): UserConditionGroupContext[];
    public userConditionGroup(i: number): UserConditionGroupContext | null;
    public userConditionGroup(i?: number): UserConditionGroupContext[] | UserConditionGroupContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UserConditionGroupContext);
        }

        return this.getRuleContext(i, UserConditionGroupContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public AND(): antlr.TerminalNode[];
    public AND(i: number): antlr.TerminalNode | null;
    public AND(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.AND);
    	} else {
    		return this.getToken(QueryLangParser.AND, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userAndExpression;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserAndExpression) {
            return visitor.visitUserAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserConditionGroupContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userConditionGroup;
    }
    public override copyFrom(ctx: UserConditionGroupContext): void {
        super.copyFrom(ctx);
    }
}
export class UserConditionGroupBasicContext extends UserConditionGroupContext {
    public constructor(ctx: UserConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public userCondition(): UserConditionContext {
        return this.getRuleContext(0, UserConditionContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserConditionGroupBasic) {
            return visitor.visitUserConditionGroupBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UserConditionGroupParenthesisContext extends UserConditionGroupContext {
    public constructor(ctx: UserConditionGroupContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public userConditions(): UserConditionsContext {
        return this.getRuleContext(0, UserConditionsContext)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserConditionGroupParenthesis) {
            return visitor.visitUserConditionGroupParenthesis(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userComparisons(): UserComparisonsContext {
        return this.getRuleContext(0, UserComparisonsContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userCondition;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserCondition) {
            return visitor.visitUserCondition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DelimeterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public WHERE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.WHERE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_delimeter;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDelimeter) {
            return visitor.visitDelimeter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PagingContext extends antlr.ParserRuleContext {
    public _pageNum?: Token | null;
    public _pageSize?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAGE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PAGE, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public INT(): antlr.TerminalNode[];
    public INT(i: number): antlr.TerminalNode | null;
    public INT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.INT);
    	} else {
    		return this.getToken(QueryLangParser.INT, i);
    	}
    }
    public SIZE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SIZE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_paging;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitPaging) {
            return visitor.visitPaging(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessSortingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SORT_BY(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SORT_BY, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public processAttributeOrdering(): ProcessAttributeOrderingContext[];
    public processAttributeOrdering(i: number): ProcessAttributeOrderingContext | null;
    public processAttributeOrdering(i?: number): ProcessAttributeOrderingContext[] | ProcessAttributeOrderingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ProcessAttributeOrderingContext);
        }

        return this.getRuleContext(i, ProcessAttributeOrderingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processSorting;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessSorting) {
            return visitor.visitProcessSorting(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessAttributeOrderingContext extends antlr.ParserRuleContext {
    public _ordering?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public processAttribute(): ProcessAttributeContext {
        return this.getRuleContext(0, ProcessAttributeContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public ASC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ASC, 0);
    }
    public DESC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DESC, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processAttributeOrdering;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessAttributeOrdering) {
            return visitor.visitProcessAttributeOrdering(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessAttributeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ID, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.IDENTIFIER, 0);
    }
    public VERSION(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.VERSION, 0);
    }
    public TITLE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TITLE, 0);
    }
    public CREATION_DATE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CREATION_DATE, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processAttribute;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessAttribute) {
            return visitor.visitProcessAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseSortingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SORT_BY(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SORT_BY, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public caseAttributeOrdering(): CaseAttributeOrderingContext[];
    public caseAttributeOrdering(i: number): CaseAttributeOrderingContext | null;
    public caseAttributeOrdering(i?: number): CaseAttributeOrderingContext[] | CaseAttributeOrderingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CaseAttributeOrderingContext);
        }

        return this.getRuleContext(i, CaseAttributeOrderingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseSorting;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseSorting) {
            return visitor.visitCaseSorting(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseAttributeOrderingContext extends antlr.ParserRuleContext {
    public _ordering?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public caseAttribute(): CaseAttributeContext {
        return this.getRuleContext(0, CaseAttributeContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public ASC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ASC, 0);
    }
    public DESC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DESC, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseAttributeOrdering;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseAttributeOrdering) {
            return visitor.visitCaseAttributeOrdering(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseAttributeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ID, 0);
    }
    public PROCESS_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS_ID, 0);
    }
    public PROCESS_IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS_IDENTIFIER, 0);
    }
    public TITLE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TITLE, 0);
    }
    public CREATION_DATE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CREATION_DATE, 0);
    }
    public AUTHOR(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.AUTHOR, 0);
    }
    public places(): PlacesContext | null {
        return this.getRuleContext(0, PlacesContext);
    }
    public tasksUserId(): TasksUserIdContext | null {
        return this.getRuleContext(0, TasksUserIdContext);
    }
    public tasksState(): TasksStateContext | null {
        return this.getRuleContext(0, TasksStateContext);
    }
    public dataValue(): DataValueContext | null {
        return this.getRuleContext(0, DataValueContext);
    }
    public dataOptions(): DataOptionsContext | null {
        return this.getRuleContext(0, DataOptionsContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseAttribute;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseAttribute) {
            return visitor.visitCaseAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskSortingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SORT_BY(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SORT_BY, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public taskAttributeOrdering(): TaskAttributeOrderingContext[];
    public taskAttributeOrdering(i: number): TaskAttributeOrderingContext | null;
    public taskAttributeOrdering(i?: number): TaskAttributeOrderingContext[] | TaskAttributeOrderingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TaskAttributeOrderingContext);
        }

        return this.getRuleContext(i, TaskAttributeOrderingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskSorting;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskSorting) {
            return visitor.visitTaskSorting(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskAttributeOrderingContext extends antlr.ParserRuleContext {
    public _ordering?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public taskAttribute(): TaskAttributeContext {
        return this.getRuleContext(0, TaskAttributeContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public ASC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ASC, 0);
    }
    public DESC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DESC, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskAttributeOrdering;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskAttributeOrdering) {
            return visitor.visitTaskAttributeOrdering(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskAttributeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ID, 0);
    }
    public TRANSITION_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TRANSITION_ID, 0);
    }
    public TITLE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TITLE, 0);
    }
    public STATE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.STATE, 0);
    }
    public USER_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.USER_ID, 0);
    }
    public CASE_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CASE_ID, 0);
    }
    public PROCESS_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS_ID, 0);
    }
    public LAST_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0);
    }
    public LAST_FINISH(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LAST_FINISH, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskAttribute;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskAttribute) {
            return visitor.visitTaskAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserSortingContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SORT_BY(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SORT_BY, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public userAttributeOrdering(): UserAttributeOrderingContext[];
    public userAttributeOrdering(i: number): UserAttributeOrderingContext | null;
    public userAttributeOrdering(i?: number): UserAttributeOrderingContext[] | UserAttributeOrderingContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UserAttributeOrderingContext);
        }

        return this.getRuleContext(i, UserAttributeOrderingContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userSorting;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserSorting) {
            return visitor.visitUserSorting(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserAttributeOrderingContext extends antlr.ParserRuleContext {
    public _ordering?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public userAttribute(): UserAttributeContext {
        return this.getRuleContext(0, UserAttributeContext)!;
    }
    public SPACE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SPACE, 0);
    }
    public ASC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ASC, 0);
    }
    public DESC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DESC, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userAttributeOrdering;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserAttributeOrdering) {
            return visitor.visitUserAttributeOrdering(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserAttributeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ID, 0);
    }
    public NAME(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NAME, 0);
    }
    public SURNAME(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SURNAME, 0);
    }
    public EMAIL(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EMAIL, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userAttribute;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserAttribute) {
            return visitor.visitUserAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessComparisonsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public idComparison(): IdComparisonContext | null {
        return this.getRuleContext(0, IdComparisonContext);
    }
    public identifierComparison(): IdentifierComparisonContext | null {
        return this.getRuleContext(0, IdentifierComparisonContext);
    }
    public versionComparison(): VersionComparisonContext | null {
        return this.getRuleContext(0, VersionComparisonContext);
    }
    public titleComparison(): TitleComparisonContext | null {
        return this.getRuleContext(0, TitleComparisonContext);
    }
    public creationDateComparison(): CreationDateComparisonContext | null {
        return this.getRuleContext(0, CreationDateComparisonContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processComparisons;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessComparisons) {
            return visitor.visitProcessComparisons(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseComparisonsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public idComparison(): IdComparisonContext | null {
        return this.getRuleContext(0, IdComparisonContext);
    }
    public processIdObjIdComparison(): ProcessIdObjIdComparisonContext | null {
        return this.getRuleContext(0, ProcessIdObjIdComparisonContext);
    }
    public processIdentifierComparison(): ProcessIdentifierComparisonContext | null {
        return this.getRuleContext(0, ProcessIdentifierComparisonContext);
    }
    public titleComparison(): TitleComparisonContext | null {
        return this.getRuleContext(0, TitleComparisonContext);
    }
    public creationDateComparison(): CreationDateComparisonContext | null {
        return this.getRuleContext(0, CreationDateComparisonContext);
    }
    public authorComparison(): AuthorComparisonContext | null {
        return this.getRuleContext(0, AuthorComparisonContext);
    }
    public placesComparison(): PlacesComparisonContext | null {
        return this.getRuleContext(0, PlacesComparisonContext);
    }
    public tasksStateComparison(): TasksStateComparisonContext | null {
        return this.getRuleContext(0, TasksStateComparisonContext);
    }
    public tasksUserIdComparison(): TasksUserIdComparisonContext | null {
        return this.getRuleContext(0, TasksUserIdComparisonContext);
    }
    public dataValueComparison(): DataValueComparisonContext | null {
        return this.getRuleContext(0, DataValueComparisonContext);
    }
    public dataOptionsComparison(): DataOptionsComparisonContext | null {
        return this.getRuleContext(0, DataOptionsComparisonContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseComparisons;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseComparisons) {
            return visitor.visitCaseComparisons(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TaskComparisonsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public idComparison(): IdComparisonContext | null {
        return this.getRuleContext(0, IdComparisonContext);
    }
    public transitionIdComparison(): TransitionIdComparisonContext | null {
        return this.getRuleContext(0, TransitionIdComparisonContext);
    }
    public titleComparison(): TitleComparisonContext | null {
        return this.getRuleContext(0, TitleComparisonContext);
    }
    public stateComparison(): StateComparisonContext | null {
        return this.getRuleContext(0, StateComparisonContext);
    }
    public userIdComparison(): UserIdComparisonContext | null {
        return this.getRuleContext(0, UserIdComparisonContext);
    }
    public caseIdComparison(): CaseIdComparisonContext | null {
        return this.getRuleContext(0, CaseIdComparisonContext);
    }
    public processIdComparison(): ProcessIdComparisonContext | null {
        return this.getRuleContext(0, ProcessIdComparisonContext);
    }
    public lastAssignComparison(): LastAssignComparisonContext | null {
        return this.getRuleContext(0, LastAssignComparisonContext);
    }
    public lastFinishComparison(): LastFinishComparisonContext | null {
        return this.getRuleContext(0, LastFinishComparisonContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_taskComparisons;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTaskComparisons) {
            return visitor.visitTaskComparisons(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserComparisonsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public idComparison(): IdComparisonContext | null {
        return this.getRuleContext(0, IdComparisonContext);
    }
    public nameComparison(): NameComparisonContext | null {
        return this.getRuleContext(0, NameComparisonContext);
    }
    public surnameComparison(): SurnameComparisonContext | null {
        return this.getRuleContext(0, SurnameComparisonContext);
    }
    public emailComparison(): EmailComparisonContext | null {
        return this.getRuleContext(0, EmailComparisonContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userComparisons;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserComparisons) {
            return visitor.visitUserComparisons(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_idComparison;
    }
    public override copyFrom(ctx: IdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class IdBasicContext extends IdComparisonContext {
    public constructor(ctx: IdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public objectIdComparison(): ObjectIdComparisonContext {
        return this.getRuleContext(0, ObjectIdComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdBasic) {
            return visitor.visitIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdListContext extends IdComparisonContext {
    public constructor(ctx: IdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdList) {
            return visitor.visitIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdNullContext extends IdComparisonContext {
    public constructor(ctx: IdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdNull) {
            return visitor.visitIdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TitleComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_titleComparison;
    }
    public override copyFrom(ctx: TitleComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class TitleBasicContext extends TitleComparisonContext {
    public constructor(ctx: TitleComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TITLE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTitleBasic) {
            return visitor.visitTitleBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TitleLikeContext extends TitleComparisonContext {
    public constructor(ctx: TitleComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TITLE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringLikeComparison(): StringLikeComparisonContext {
        return this.getRuleContext(0, StringLikeComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTitleLike) {
            return visitor.visitTitleLike(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TitleListContext extends TitleComparisonContext {
    public constructor(ctx: TitleComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TITLE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTitleList) {
            return visitor.visitTitleList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TitleRangeContext extends TitleComparisonContext {
    public constructor(ctx: TitleComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TITLE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTitleRange) {
            return visitor.visitTitleRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TitleNullContext extends TitleComparisonContext {
    public constructor(ctx: TitleComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TITLE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TITLE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTitleNull) {
            return visitor.visitTitleNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdentifierComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_identifierComparison;
    }
    public override copyFrom(ctx: IdentifierComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class IdentifierBasicContext extends IdentifierComparisonContext {
    public constructor(ctx: IdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdentifierBasic) {
            return visitor.visitIdentifierBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentifierListContext extends IdentifierComparisonContext {
    public constructor(ctx: IdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdentifierList) {
            return visitor.visitIdentifierList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentifierRangeContext extends IdentifierComparisonContext {
    public constructor(ctx: IdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdentifierRange) {
            return visitor.visitIdentifierRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentifierNullContext extends IdentifierComparisonContext {
    public constructor(ctx: IdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIdentifierNull) {
            return visitor.visitIdentifierNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VersionComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_versionComparison;
    }
    public override copyFrom(ctx: VersionComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class VersionBasicContext extends VersionComparisonContext {
    public _op?: Token | null;
    public constructor(ctx: VersionComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VERSION(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.VERSION, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public VERSION_NUMBER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.VERSION_NUMBER, 0)!;
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GT, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LTE, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GTE, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitVersionBasic) {
            return visitor.visitVersionBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class VersionListCmpContext extends VersionComparisonContext {
    public constructor(ctx: VersionComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VERSION(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.VERSION, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListVersionComparison(): InListVersionComparisonContext {
        return this.getRuleContext(0, InListVersionComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitVersionListCmp) {
            return visitor.visitVersionListCmp(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class VersionRangeCmpContext extends VersionComparisonContext {
    public constructor(ctx: VersionComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VERSION(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.VERSION, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeVersionComparison(): InRangeVersionComparisonContext {
        return this.getRuleContext(0, InRangeVersionComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitVersionRangeCmp) {
            return visitor.visitVersionRangeCmp(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class VersionNullContext extends VersionComparisonContext {
    public constructor(ctx: VersionComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VERSION(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.VERSION, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitVersionNull) {
            return visitor.visitVersionNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CreationDateComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_creationDateComparison;
    }
    public override copyFrom(ctx: CreationDateComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class CdDateBasicContext extends CreationDateComparisonContext {
    public constructor(ctx: CreationDateComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CREATION_DATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CREATION_DATE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateComparison(): DateComparisonContext {
        return this.getRuleContext(0, DateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCdDateBasic) {
            return visitor.visitCdDateBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CdDateTimeBasicContext extends CreationDateComparisonContext {
    public constructor(ctx: CreationDateComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CREATION_DATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CREATION_DATE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateTimeComparison(): DateTimeComparisonContext {
        return this.getRuleContext(0, DateTimeComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCdDateTimeBasic) {
            return visitor.visitCdDateTimeBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CdDateListContext extends CreationDateComparisonContext {
    public constructor(ctx: CreationDateComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CREATION_DATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CREATION_DATE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListDateComparison(): InListDateComparisonContext {
        return this.getRuleContext(0, InListDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCdDateList) {
            return visitor.visitCdDateList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CdDateRangeContext extends CreationDateComparisonContext {
    public constructor(ctx: CreationDateComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CREATION_DATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CREATION_DATE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeDateComparison(): InRangeDateComparisonContext {
        return this.getRuleContext(0, InRangeDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCdDateRange) {
            return visitor.visitCdDateRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CdNullContext extends CreationDateComparisonContext {
    public constructor(ctx: CreationDateComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CREATION_DATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CREATION_DATE, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCdNull) {
            return visitor.visitCdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessIdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processIdComparison;
    }
    public override copyFrom(ctx: ProcessIdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class ProcessIdBasicContext extends ProcessIdComparisonContext {
    public constructor(ctx: ProcessIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdBasic) {
            return visitor.visitProcessIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdListContext extends ProcessIdComparisonContext {
    public constructor(ctx: ProcessIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdList) {
            return visitor.visitProcessIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdNullContext extends ProcessIdComparisonContext {
    public constructor(ctx: ProcessIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdNull) {
            return visitor.visitProcessIdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessIdObjIdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processIdObjIdComparison;
    }
    public override copyFrom(ctx: ProcessIdObjIdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class ProcessIdObjIdBasicContext extends ProcessIdObjIdComparisonContext {
    public constructor(ctx: ProcessIdObjIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public objectIdComparison(): ObjectIdComparisonContext {
        return this.getRuleContext(0, ObjectIdComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdObjIdBasic) {
            return visitor.visitProcessIdObjIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdObjIdListContext extends ProcessIdObjIdComparisonContext {
    public constructor(ctx: ProcessIdObjIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdObjIdList) {
            return visitor.visitProcessIdObjIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdObjNullContext extends ProcessIdObjIdComparisonContext {
    public constructor(ctx: ProcessIdObjIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdObjNull) {
            return visitor.visitProcessIdObjNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ProcessIdentifierComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_processIdentifierComparison;
    }
    public override copyFrom(ctx: ProcessIdentifierComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class ProcessIdentifierBasicContext extends ProcessIdentifierComparisonContext {
    public constructor(ctx: ProcessIdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdentifierBasic) {
            return visitor.visitProcessIdentifierBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdentifierListContext extends ProcessIdentifierComparisonContext {
    public constructor(ctx: ProcessIdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdentifierList) {
            return visitor.visitProcessIdentifierList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdentifierRangeContext extends ProcessIdentifierComparisonContext {
    public constructor(ctx: ProcessIdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdentifierRange) {
            return visitor.visitProcessIdentifierRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ProcessIdentifierNullContext extends ProcessIdentifierComparisonContext {
    public constructor(ctx: ProcessIdentifierComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public PROCESS_IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PROCESS_IDENTIFIER, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitProcessIdentifierNull) {
            return visitor.visitProcessIdentifierNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AuthorComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_authorComparison;
    }
    public override copyFrom(ctx: AuthorComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class AuthorBasicContext extends AuthorComparisonContext {
    public constructor(ctx: AuthorComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.AUTHOR, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitAuthorBasic) {
            return visitor.visitAuthorBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AuthorListContext extends AuthorComparisonContext {
    public constructor(ctx: AuthorComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.AUTHOR, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitAuthorList) {
            return visitor.visitAuthorList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AuthorNullContext extends AuthorComparisonContext {
    public constructor(ctx: AuthorComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public AUTHOR(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.AUTHOR, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitAuthorNull) {
            return visitor.visitAuthorNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TransitionIdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_transitionIdComparison;
    }
    public override copyFrom(ctx: TransitionIdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class TransitionIdBasicContext extends TransitionIdComparisonContext {
    public constructor(ctx: TransitionIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TRANSITION_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TRANSITION_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTransitionIdBasic) {
            return visitor.visitTransitionIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TransitionIdListContext extends TransitionIdComparisonContext {
    public constructor(ctx: TransitionIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TRANSITION_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TRANSITION_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTransitionIdList) {
            return visitor.visitTransitionIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TransitionIdRangeContext extends TransitionIdComparisonContext {
    public constructor(ctx: TransitionIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TRANSITION_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TRANSITION_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTransitionIdRange) {
            return visitor.visitTransitionIdRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TransitionIdNullContext extends TransitionIdComparisonContext {
    public constructor(ctx: TransitionIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TRANSITION_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TRANSITION_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTransitionIdNull) {
            return visitor.visitTransitionIdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StateComparisonContext extends antlr.ParserRuleContext {
    public _state?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.STATE, 0)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public EQ(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EQ, 0)!;
    }
    public ENABLED(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ENABLED, 0);
    }
    public DISABLED(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DISABLED, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_stateComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitStateComparison) {
            return visitor.visitStateComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UserIdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_userIdComparison;
    }
    public override copyFrom(ctx: UserIdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class UserIdBasicContext extends UserIdComparisonContext {
    public constructor(ctx: UserIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public USER_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.USER_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserIdBasic) {
            return visitor.visitUserIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UserIdListContext extends UserIdComparisonContext {
    public constructor(ctx: UserIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public USER_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.USER_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserIdList) {
            return visitor.visitUserIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UserIdNullContext extends UserIdComparisonContext {
    public constructor(ctx: UserIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public USER_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.USER_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitUserIdNull) {
            return visitor.visitUserIdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CaseIdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_caseIdComparison;
    }
    public override copyFrom(ctx: CaseIdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class CaseIdBasicContext extends CaseIdComparisonContext {
    public constructor(ctx: CaseIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CASE_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CASE_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseIdBasic) {
            return visitor.visitCaseIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CaseIdListContext extends CaseIdComparisonContext {
    public constructor(ctx: CaseIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CASE_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CASE_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseIdList) {
            return visitor.visitCaseIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CaseIdNullContext extends CaseIdComparisonContext {
    public constructor(ctx: CaseIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CASE_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.CASE_ID, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitCaseIdNull) {
            return visitor.visitCaseIdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LastAssignComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_lastAssignComparison;
    }
    public override copyFrom(ctx: LastAssignComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class LaDateBasicContext extends LastAssignComparisonContext {
    public constructor(ctx: LastAssignComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_ASSIGN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateComparison(): DateComparisonContext {
        return this.getRuleContext(0, DateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLaDateBasic) {
            return visitor.visitLaDateBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LaDateTimeBasicContext extends LastAssignComparisonContext {
    public constructor(ctx: LastAssignComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_ASSIGN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateTimeComparison(): DateTimeComparisonContext {
        return this.getRuleContext(0, DateTimeComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLaDateTimeBasic) {
            return visitor.visitLaDateTimeBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LaDateListContext extends LastAssignComparisonContext {
    public constructor(ctx: LastAssignComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_ASSIGN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListDateComparison(): InListDateComparisonContext {
        return this.getRuleContext(0, InListDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLaDateList) {
            return visitor.visitLaDateList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LaDateRangeContext extends LastAssignComparisonContext {
    public constructor(ctx: LastAssignComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_ASSIGN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeDateComparison(): InRangeDateComparisonContext {
        return this.getRuleContext(0, InRangeDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLaDateRange) {
            return visitor.visitLaDateRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LaNullContext extends LastAssignComparisonContext {
    public constructor(ctx: LastAssignComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_ASSIGN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLaNull) {
            return visitor.visitLaNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LastFinishComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_lastFinishComparison;
    }
    public override copyFrom(ctx: LastFinishComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class LfDateBasicContext extends LastFinishComparisonContext {
    public constructor(ctx: LastFinishComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_FINISH(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_FINISH, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateComparison(): DateComparisonContext {
        return this.getRuleContext(0, DateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLfDateBasic) {
            return visitor.visitLfDateBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LfDateTimeBasicContext extends LastFinishComparisonContext {
    public constructor(ctx: LastFinishComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_FINISH(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_FINISH, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateTimeComparison(): DateTimeComparisonContext {
        return this.getRuleContext(0, DateTimeComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLfDateTimeBasic) {
            return visitor.visitLfDateTimeBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LfDateListContext extends LastFinishComparisonContext {
    public constructor(ctx: LastFinishComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_FINISH(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_FINISH, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListDateComparison(): InListDateComparisonContext {
        return this.getRuleContext(0, InListDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLfDateList) {
            return visitor.visitLfDateList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LfDateRangeContext extends LastFinishComparisonContext {
    public constructor(ctx: LastFinishComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_FINISH(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_FINISH, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeDateComparison(): InRangeDateComparisonContext {
        return this.getRuleContext(0, InRangeDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLfDateRange) {
            return visitor.visitLfDateRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LfNullContext extends LastFinishComparisonContext {
    public constructor(ctx: LastFinishComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LAST_FINISH(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LAST_FINISH, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLfNull) {
            return visitor.visitLfNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NameComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_nameComparison;
    }
    public override copyFrom(ctx: NameComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class NameBasicContext extends NameComparisonContext {
    public constructor(ctx: NameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.NAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitNameBasic) {
            return visitor.visitNameBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NameListContext extends NameComparisonContext {
    public constructor(ctx: NameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.NAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitNameList) {
            return visitor.visitNameList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NameRangeContext extends NameComparisonContext {
    public constructor(ctx: NameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.NAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitNameRange) {
            return visitor.visitNameRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NameNullContext extends NameComparisonContext {
    public constructor(ctx: NameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.NAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitNameNull) {
            return visitor.visitNameNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SurnameComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_surnameComparison;
    }
    public override copyFrom(ctx: SurnameComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class SurnameBasicContext extends SurnameComparisonContext {
    public constructor(ctx: SurnameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public SURNAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SURNAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitSurnameBasic) {
            return visitor.visitSurnameBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SurnameListContext extends SurnameComparisonContext {
    public constructor(ctx: SurnameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public SURNAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SURNAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitSurnameList) {
            return visitor.visitSurnameList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SurnameRangeContext extends SurnameComparisonContext {
    public constructor(ctx: SurnameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public SURNAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SURNAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitSurnameRange) {
            return visitor.visitSurnameRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class SurnameNullContext extends SurnameComparisonContext {
    public constructor(ctx: SurnameComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public SURNAME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SURNAME, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitSurnameNull) {
            return visitor.visitSurnameNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class EmailComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_emailComparison;
    }
    public override copyFrom(ctx: EmailComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class EmailBasicContext extends EmailComparisonContext {
    public constructor(ctx: EmailComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EMAIL(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EMAIL, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitEmailBasic) {
            return visitor.visitEmailBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class EmailListContext extends EmailComparisonContext {
    public constructor(ctx: EmailComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EMAIL(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EMAIL, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitEmailList) {
            return visitor.visitEmailList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class EmailRangeContext extends EmailComparisonContext {
    public constructor(ctx: EmailComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EMAIL(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EMAIL, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitEmailRange) {
            return visitor.visitEmailRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class EmailNullContext extends EmailComparisonContext {
    public constructor(ctx: EmailComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public EMAIL(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EMAIL, 0)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitEmailNull) {
            return visitor.visitEmailNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DataValueComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dataValueComparison;
    }
    public override copyFrom(ctx: DataValueComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class DataStringContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataString) {
            return visitor.visitDataString(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataStringLikeContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringLikeComparison(): StringLikeComparisonContext {
        return this.getRuleContext(0, StringLikeComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataStringLike) {
            return visitor.visitDataStringLike(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataNumberContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public numberComparison(): NumberComparisonContext {
        return this.getRuleContext(0, NumberComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataNumber) {
            return visitor.visitDataNumber(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataDateContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateComparison(): DateComparisonContext {
        return this.getRuleContext(0, DateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataDate) {
            return visitor.visitDataDate(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataDatetimeContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public dateTimeComparison(): DateTimeComparisonContext {
        return this.getRuleContext(0, DateTimeComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataDatetime) {
            return visitor.visitDataDatetime(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataBooleanContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public booleanComparison(): BooleanComparisonContext {
        return this.getRuleContext(0, BooleanComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataBoolean) {
            return visitor.visitDataBoolean(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataStringListContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataStringList) {
            return visitor.visitDataStringList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataNumberListContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListNumberComparison(): InListNumberComparisonContext {
        return this.getRuleContext(0, InListNumberComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataNumberList) {
            return visitor.visitDataNumberList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataDateListContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListDateComparison(): InListDateComparisonContext {
        return this.getRuleContext(0, InListDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataDateList) {
            return visitor.visitDataDateList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataStringRangeContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataStringRange) {
            return visitor.visitDataStringRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataNumberRangeContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeNumberComparison(): InRangeNumberComparisonContext {
        return this.getRuleContext(0, InRangeNumberComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataNumberRange) {
            return visitor.visitDataNumberRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataDateRangeContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeDateComparison(): InRangeDateComparisonContext {
        return this.getRuleContext(0, InRangeDateComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataDateRange) {
            return visitor.visitDataDateRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataNullContext extends DataValueComparisonContext {
    public constructor(ctx: DataValueComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataValue(): DataValueContext {
        return this.getRuleContext(0, DataValueContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataNull) {
            return visitor.visitDataNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DataOptionsComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dataOptionsComparison;
    }
    public override copyFrom(ctx: DataOptionsComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class DataOptionsBasicContext extends DataOptionsComparisonContext {
    public constructor(ctx: DataOptionsComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataOptions(): DataOptionsContext {
        return this.getRuleContext(0, DataOptionsContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataOptionsBasic) {
            return visitor.visitDataOptionsBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataOptionsListContext extends DataOptionsComparisonContext {
    public constructor(ctx: DataOptionsComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataOptions(): DataOptionsContext {
        return this.getRuleContext(0, DataOptionsContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataOptionsList) {
            return visitor.visitDataOptionsList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataOptionsRangeContext extends DataOptionsComparisonContext {
    public constructor(ctx: DataOptionsComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataOptions(): DataOptionsContext {
        return this.getRuleContext(0, DataOptionsContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeStringComparison(): InRangeStringComparisonContext {
        return this.getRuleContext(0, InRangeStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataOptionsRange) {
            return visitor.visitDataOptionsRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataOptionsNullContext extends DataOptionsComparisonContext {
    public constructor(ctx: DataOptionsComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public dataOptions(): DataOptionsContext {
        return this.getRuleContext(0, DataOptionsContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataOptionsNull) {
            return visitor.visitDataOptionsNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PlacesComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_placesComparison;
    }
    public override copyFrom(ctx: PlacesComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class PlacesBasicContext extends PlacesComparisonContext {
    public constructor(ctx: PlacesComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public places(): PlacesContext {
        return this.getRuleContext(0, PlacesContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public numberComparison(): NumberComparisonContext {
        return this.getRuleContext(0, NumberComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitPlacesBasic) {
            return visitor.visitPlacesBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PlacesListContext extends PlacesComparisonContext {
    public constructor(ctx: PlacesComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public places(): PlacesContext {
        return this.getRuleContext(0, PlacesContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListNumberComparison(): InListNumberComparisonContext {
        return this.getRuleContext(0, InListNumberComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitPlacesList) {
            return visitor.visitPlacesList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PlacesRangeContext extends PlacesComparisonContext {
    public constructor(ctx: PlacesComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public places(): PlacesContext {
        return this.getRuleContext(0, PlacesContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inRangeNumberComparison(): InRangeNumberComparisonContext {
        return this.getRuleContext(0, InRangeNumberComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitPlacesRange) {
            return visitor.visitPlacesRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PlacesNullContext extends PlacesComparisonContext {
    public constructor(ctx: PlacesComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public places(): PlacesContext {
        return this.getRuleContext(0, PlacesContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitPlacesNull) {
            return visitor.visitPlacesNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TasksStateComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public _state?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public tasksState(): TasksStateContext {
        return this.getRuleContext(0, TasksStateContext)!;
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public EQ(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.EQ, 0)!;
    }
    public ENABLED(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ENABLED, 0);
    }
    public DISABLED(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DISABLED, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_tasksStateComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTasksStateComparison) {
            return visitor.visitTasksStateComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TasksUserIdComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_tasksUserIdComparison;
    }
    public override copyFrom(ctx: TasksUserIdComparisonContext): void {
        super.copyFrom(ctx);
    }
}
export class TasksUserIdBasicContext extends TasksUserIdComparisonContext {
    public constructor(ctx: TasksUserIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public tasksUserId(): TasksUserIdContext {
        return this.getRuleContext(0, TasksUserIdContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTasksUserIdBasic) {
            return visitor.visitTasksUserIdBasic(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TasksUserIdListContext extends TasksUserIdComparisonContext {
    public constructor(ctx: TasksUserIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public tasksUserId(): TasksUserIdContext {
        return this.getRuleContext(0, TasksUserIdContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public inListStringComparison(): InListStringComparisonContext {
        return this.getRuleContext(0, InListStringComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTasksUserIdList) {
            return visitor.visitTasksUserIdList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TasksUserIdNullContext extends TasksUserIdComparisonContext {
    public constructor(ctx: TasksUserIdComparisonContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public tasksUserId(): TasksUserIdContext {
        return this.getRuleContext(0, TasksUserIdContext)!;
    }
    public SPACE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.SPACE, 0)!;
    }
    public nullComparison(): NullComparisonContext {
        return this.getRuleContext(0, NullComparisonContext)!;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTasksUserIdNull) {
            return visitor.visitTasksUserIdNull(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ObjectIdComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.STRING, 0);
    }
    public LOGGED_USER_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LOGGED_USER_ID, 0);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_objectIdComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitObjectIdComparison) {
            return visitor.visitObjectIdComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public CONTAINS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CONTAINS, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GT, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LTE, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GTE, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.STRING, 0);
    }
    public loggedUserStringAttribute(): LoggedUserStringAttributeContext | null {
        return this.getRuleContext(0, LoggedUserStringAttributeContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_stringComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitStringComparison) {
            return visitor.visitStringComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringLikeComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stringComparison(): StringComparisonContext {
        return this.getRuleContext(0, StringComparisonContext)!;
    }
    public LIKE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.LIKE, 0)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_stringLikeComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitStringLikeComparison) {
            return visitor.visitStringLikeComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NumberComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public _number_?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GT, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LTE, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GTE, 0);
    }
    public INT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.INT, 0);
    }
    public DOUBLE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DOUBLE, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_numberComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitNumberComparison) {
            return visitor.visitNumberComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public DATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.DATE, 0)!;
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GT, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LTE, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GTE, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dateComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDateComparison) {
            return visitor.visitDateComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateTimeComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public DATETIME(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.DATETIME, 0)!;
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LT, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GT, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LTE, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.GTE, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dateTimeComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDateTimeComparison) {
            return visitor.visitDateTimeComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BooleanComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.BOOLEAN, 0);
    }
    public LOGGED_USER_ANONYMOUS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LOGGED_USER_ANONYMOUS, 0);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_booleanComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitBooleanComparison) {
            return visitor.visitBooleanComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class NullComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public NULL(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.NULL, 0)!;
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NEQ, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_nullComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitNullComparison) {
            return visitor.visitNullComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InListStringComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stringList(): StringListContext {
        return this.getRuleContext(0, StringListContext)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inListStringComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInListStringComparison) {
            return visitor.visitInListStringComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InListNumberComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public intList(): IntListContext | null {
        return this.getRuleContext(0, IntListContext);
    }
    public doubleList(): DoubleListContext | null {
        return this.getRuleContext(0, DoubleListContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inListNumberComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInListNumberComparison) {
            return visitor.visitInListNumberComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InListDateComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public dateList(): DateListContext | null {
        return this.getRuleContext(0, DateListContext);
    }
    public dateTimeList(): DateTimeListContext | null {
        return this.getRuleContext(0, DateTimeListContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inListDateComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInListDateComparison) {
            return visitor.visitInListDateComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InListVersionComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public versionList(): VersionListContext {
        return this.getRuleContext(0, VersionListContext)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inListVersionComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInListVersionComparison) {
            return visitor.visitInListVersionComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InRangeStringComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stringRange(): StringRangeContext {
        return this.getRuleContext(0, StringRangeContext)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inRangeStringComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInRangeStringComparison) {
            return visitor.visitInRangeStringComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InRangeNumberComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public intRange(): IntRangeContext | null {
        return this.getRuleContext(0, IntRangeContext);
    }
    public doubleRange(): DoubleRangeContext | null {
        return this.getRuleContext(0, DoubleRangeContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inRangeNumberComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInRangeNumberComparison) {
            return visitor.visitInRangeNumberComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InRangeDateComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public dateRange(): DateRangeContext | null {
        return this.getRuleContext(0, DateRangeContext);
    }
    public dateTimeRange(): DateTimeRangeContext | null {
        return this.getRuleContext(0, DateTimeRangeContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inRangeDateComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInRangeDateComparison) {
            return visitor.visitInRangeDateComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InRangeVersionComparisonContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public versionRange(): VersionRangeContext {
        return this.getRuleContext(0, VersionRangeContext)!;
    }
    public IN(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.IN, 0)!;
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NOT, 0);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_inRangeVersionComparison;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitInRangeVersionComparison) {
            return visitor.visitInRangeVersionComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DataValueContext extends antlr.ParserRuleContext {
    public _fieldId?: JavaIdContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DATA(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.DATA, 0)!;
    }
    public VALUE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.VALUE, 0)!;
    }
    public javaId(): JavaIdContext {
        return this.getRuleContext(0, JavaIdContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dataValue;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataValue) {
            return visitor.visitDataValue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DataOptionsContext extends antlr.ParserRuleContext {
    public _fieldId?: JavaIdContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DATA(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.DATA, 0)!;
    }
    public OPTIONS(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.OPTIONS, 0)!;
    }
    public javaId(): JavaIdContext {
        return this.getRuleContext(0, JavaIdContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dataOptions;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDataOptions) {
            return visitor.visitDataOptions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PlacesContext extends antlr.ParserRuleContext {
    public _placeId?: JavaIdContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PLACES(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.PLACES, 0)!;
    }
    public MARKING(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.MARKING, 0)!;
    }
    public javaId(): JavaIdContext {
        return this.getRuleContext(0, JavaIdContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_places;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitPlaces) {
            return visitor.visitPlaces(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TasksStateContext extends antlr.ParserRuleContext {
    public _taskId?: JavaIdContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TASKS(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TASKS, 0)!;
    }
    public STATE(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.STATE, 0)!;
    }
    public javaId(): JavaIdContext {
        return this.getRuleContext(0, JavaIdContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_tasksState;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTasksState) {
            return visitor.visitTasksState(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TasksUserIdContext extends antlr.ParserRuleContext {
    public _taskId?: JavaIdContext;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TASKS(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.TASKS, 0)!;
    }
    public USER_ID(): antlr.TerminalNode {
        return this.getToken(QueryLangParser.USER_ID, 0)!;
    }
    public javaId(): JavaIdContext {
        return this.getRuleContext(0, JavaIdContext)!;
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_tasksUserId;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitTasksUserId) {
            return visitor.visitTasksUserId(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class JavaIdContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public JAVA_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.JAVA_ID, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ID, 0);
    }
    public TITLE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TITLE, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.IDENTIFIER, 0);
    }
    public VERSION(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.VERSION, 0);
    }
    public CREATION_DATE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CREATION_DATE, 0);
    }
    public PROCESS_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS_ID, 0);
    }
    public PROCESS_IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS_IDENTIFIER, 0);
    }
    public AUTHOR(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.AUTHOR, 0);
    }
    public PLACES(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PLACES, 0);
    }
    public TRANSITION_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TRANSITION_ID, 0);
    }
    public STATE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.STATE, 0);
    }
    public USER_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.USER_ID, 0);
    }
    public CASE_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CASE_ID, 0);
    }
    public LAST_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LAST_ASSIGN, 0);
    }
    public LAST_FINISH(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LAST_FINISH, 0);
    }
    public NAME(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.NAME, 0);
    }
    public SURNAME(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SURNAME, 0);
    }
    public EMAIL(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.EMAIL, 0);
    }
    public DATA(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DATA, 0);
    }
    public VALUE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.VALUE, 0);
    }
    public OPTIONS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.OPTIONS, 0);
    }
    public MARKING(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.MARKING, 0);
    }
    public ENABLED(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ENABLED, 0);
    }
    public DISABLED(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DISABLED, 0);
    }
    public PAGE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PAGE, 0);
    }
    public SIZE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.SIZE, 0);
    }
    public ASC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.ASC, 0);
    }
    public DESC(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.DESC, 0);
    }
    public CASE(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CASE, 0);
    }
    public CASES(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.CASES, 0);
    }
    public TASK(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TASK, 0);
    }
    public TASKS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.TASKS, 0);
    }
    public USER(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.USER, 0);
    }
    public USERS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.USERS, 0);
    }
    public PROCESS(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESS, 0);
    }
    public PROCESSES(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.PROCESSES, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_javaId;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitJavaId) {
            return visitor.visitJavaId(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.STRING);
    	} else {
    		return this.getToken(QueryLangParser.STRING, i);
    	}
    }
    public loggedUserStringAttribute(): LoggedUserStringAttributeContext[];
    public loggedUserStringAttribute(i: number): LoggedUserStringAttributeContext | null;
    public loggedUserStringAttribute(i?: number): LoggedUserStringAttributeContext[] | LoggedUserStringAttributeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LoggedUserStringAttributeContext);
        }

        return this.getRuleContext(i, LoggedUserStringAttributeContext);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_stringList;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitStringList) {
            return visitor.visitStringList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IntListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public INT(): antlr.TerminalNode[];
    public INT(i: number): antlr.TerminalNode | null;
    public INT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.INT);
    	} else {
    		return this.getToken(QueryLangParser.INT, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_intList;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIntList) {
            return visitor.visitIntList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DoubleListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public DOUBLE(): antlr.TerminalNode[];
    public DOUBLE(i: number): antlr.TerminalNode | null;
    public DOUBLE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.DOUBLE);
    	} else {
    		return this.getToken(QueryLangParser.DOUBLE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_doubleList;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDoubleList) {
            return visitor.visitDoubleList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public DATE(): antlr.TerminalNode[];
    public DATE(i: number): antlr.TerminalNode | null;
    public DATE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.DATE);
    	} else {
    		return this.getToken(QueryLangParser.DATE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dateList;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDateList) {
            return visitor.visitDateList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateTimeListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public DATETIME(): antlr.TerminalNode[];
    public DATETIME(i: number): antlr.TerminalNode | null;
    public DATETIME(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.DATETIME);
    	} else {
    		return this.getToken(QueryLangParser.DATETIME, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dateTimeList;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDateTimeList) {
            return visitor.visitDateTimeList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VersionListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public VERSION_NUMBER(): antlr.TerminalNode[];
    public VERSION_NUMBER(i: number): antlr.TerminalNode | null;
    public VERSION_NUMBER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.VERSION_NUMBER);
    	} else {
    		return this.getToken(QueryLangParser.VERSION_NUMBER, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_versionList;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitVersionList) {
            return visitor.visitVersionList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringRangeContext extends antlr.ParserRuleContext {
    public _leftEndpoint?: Token | null;
    public _rightEndpoint?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.STRING);
    	} else {
    		return this.getToken(QueryLangParser.STRING, i);
    	}
    }
    public loggedUserStringAttribute(): LoggedUserStringAttributeContext[];
    public loggedUserStringAttribute(i: number): LoggedUserStringAttributeContext | null;
    public loggedUserStringAttribute(i?: number): LoggedUserStringAttributeContext[] | LoggedUserStringAttributeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LoggedUserStringAttributeContext);
        }

        return this.getRuleContext(i, LoggedUserStringAttributeContext);
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_stringRange;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitStringRange) {
            return visitor.visitStringRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IntRangeContext extends antlr.ParserRuleContext {
    public _leftEndpoint?: Token | null;
    public _rightEndpoint?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INT(): antlr.TerminalNode[];
    public INT(i: number): antlr.TerminalNode | null;
    public INT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.INT);
    	} else {
    		return this.getToken(QueryLangParser.INT, i);
    	}
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_intRange;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitIntRange) {
            return visitor.visitIntRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DoubleRangeContext extends antlr.ParserRuleContext {
    public _leftEndpoint?: Token | null;
    public _rightEndpoint?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOUBLE(): antlr.TerminalNode[];
    public DOUBLE(i: number): antlr.TerminalNode | null;
    public DOUBLE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.DOUBLE);
    	} else {
    		return this.getToken(QueryLangParser.DOUBLE, i);
    	}
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_doubleRange;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDoubleRange) {
            return visitor.visitDoubleRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateRangeContext extends antlr.ParserRuleContext {
    public _leftEndpoint?: Token | null;
    public _rightEndpoint?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DATE(): antlr.TerminalNode[];
    public DATE(i: number): antlr.TerminalNode | null;
    public DATE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.DATE);
    	} else {
    		return this.getToken(QueryLangParser.DATE, i);
    	}
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dateRange;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDateRange) {
            return visitor.visitDateRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateTimeRangeContext extends antlr.ParserRuleContext {
    public _leftEndpoint?: Token | null;
    public _rightEndpoint?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DATETIME(): antlr.TerminalNode[];
    public DATETIME(i: number): antlr.TerminalNode | null;
    public DATETIME(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.DATETIME);
    	} else {
    		return this.getToken(QueryLangParser.DATETIME, i);
    	}
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_dateTimeRange;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitDateTimeRange) {
            return visitor.visitDateTimeRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VersionRangeContext extends antlr.ParserRuleContext {
    public _leftEndpoint?: Token | null;
    public _rightEndpoint?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VERSION_NUMBER(): antlr.TerminalNode[];
    public VERSION_NUMBER(i: number): antlr.TerminalNode | null;
    public VERSION_NUMBER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.VERSION_NUMBER);
    	} else {
    		return this.getToken(QueryLangParser.VERSION_NUMBER, i);
    	}
    }
    public SPACE(): antlr.TerminalNode[];
    public SPACE(i: number): antlr.TerminalNode | null;
    public SPACE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(QueryLangParser.SPACE);
    	} else {
    		return this.getToken(QueryLangParser.SPACE, i);
    	}
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_versionRange;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitVersionRange) {
            return visitor.visitVersionRange(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LoggedUserStringAttributeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LOGGED_USER_ID(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LOGGED_USER_ID, 0);
    }
    public LOGGED_USER_USERNAME(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LOGGED_USER_USERNAME, 0);
    }
    public LOGGED_USER_FULLNAME(): antlr.TerminalNode | null {
        return this.getToken(QueryLangParser.LOGGED_USER_FULLNAME, 0);
    }
    public override get ruleIndex(): number {
        return QueryLangParser.RULE_loggedUserStringAttribute;
    }
    public override accept<Result>(visitor: QueryLangVisitor<Result>): Result | null {
        if (visitor.visitLoggedUserStringAttribute) {
            return visitor.visitLoggedUserStringAttribute(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
