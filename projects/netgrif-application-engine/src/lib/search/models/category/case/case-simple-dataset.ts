import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Query} from '../../query/query';
import {Operator} from '../../operator/operator';
import {Equals} from '../../operator/equals';
import {EqualsDate} from '../../operator/equals-date';
import {EqualsDateTime} from '../../operator/equals-date-time';
import {Substring} from '../../operator/substring';
import {CaseProcess} from './case-process';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationCategory} from '../no-configuration-category';

/**
 * This class aims to be a simpler more limited version of the {@link CaseDataset} {@link Category} implementation.
 *
 * It can only generate "equality" queries for a single field. The category must be configured before it can be used to generate queries.
 *
 * See [configure]{@link CaseSimpleDataset#configure} for more information.
 */
export class CaseSimpleDataset extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.dataset';

    protected _fieldId: string;
    protected _fieldType: string;
    protected _netIds: Array<string>;

    protected _processCategory: CaseProcess;

    constructor(protected _operators: OperatorService,
                logger: LoggerService,
                protected _optionalDependencies: OptionalDependencies) {
        super(undefined,
            undefined,
            `${CaseSimpleDataset._i18n}.name`,
            undefined,
            logger);

        this._processCategory = _optionalDependencies.categoryFactory.getWithDefaultOperator(CaseProcess) as CaseProcess;
    }

    get inputPlaceholder(): string {
        return '';
    }

    public configure(fieldId: string, fieldType: string, netIds: Array<string>): void {
        if (!fieldId || !fieldType || !netIds || netIds.length === 0) {
            this._log.error('CaseSimpleDataset must be configured with defined values and a non-empty array');
            return;
        }
        this._fieldId = fieldId;
        this._fieldType = fieldType;
        this._netIds = netIds;
    }

    protected get elasticKeywords(): Array<string> {
        if (!this._fieldId) {
            return [];
        } else {
            return [`dataSet.${this._fieldId}.value`];
        }
    }

    public get selectedOperator(): Operator<any> {
        switch (this._fieldType) {
            case 'number':
                return this._operators.getOperator(Equals);
            case 'boolean':
                return this._operators.getOperator(Equals);
            case 'user':
                return this._operators.getOperator(Equals);
            case 'date':
                return this._operators.getOperator(EqualsDate);
            case 'dateTime':
                return this._operators.getOperator(EqualsDateTime);
            default:
                return this._operators.getOperator(Substring);
        }
    }

    protected generateQuery(userInput: Array<unknown>): Query {
        const valueQuery = this.selectedOperator.createQuery(this.elasticKeywords, userInput);
        const netsQuery = Query.combineQueries(
            this._netIds.map(id => this._processCategory.generatePredicate([id]).query),
            BooleanOperator.OR
        );
        return Query.combineQueries([valueQuery, netsQuery], BooleanOperator.AND);
    }

    duplicate(): CaseSimpleDataset {
        return new CaseSimpleDataset(this._operators, this._log, this._optionalDependencies);
    }
}
