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
import {CaseDataset} from './case-dataset';
import {DatafieldMapKey} from '../../datafield-map-key';
import {Categories} from '../categories';
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";
import {FieldTypeResource} from "../../../../task-content/model/field-type-resource";

/**
 * This class aims to be a simpler more limited version of the {@link CaseDataset} {@link Category} implementation.
 *
 * It can only generate "equality" queries for a single field. The category must be configured before it can be used to generate queries.
 *
 * This category cannot be serialized. If you want to preserve this category's state convert it to {@link CaseDataset}
 * with the [transformToCaseDataset()]{@link CaseSimpleDataset#transformToCaseDataset} method and serialize the result.
 *
 * See [configure]{@link CaseSimpleDataset#configure} for more information.
 */
export class CaseSimpleDataset extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.dataset';

    protected _fieldId: string;
    protected _fieldType: string;
    protected _netIdentifiers: Array<string>;
    protected _pfqlKeyword: string;

    protected _processCategory: CaseProcess;

    constructor(operators: OperatorService,
                logger: LoggerService,
                protected _optionalDependencies: OptionalDependencies) {
        super(undefined,
            undefined,
            `${CaseSimpleDataset._i18n}.name`,
            undefined,
            logger,
            operators,
            ResourceTypeQueryPrefix.CASES);

        this._processCategory = _optionalDependencies.categoryFactory.getWithDefaultOperator(CaseProcess) as CaseProcess;
    }

    destroy() {
        super.destroy();
        this._processCategory.destroy();
    }

    get inputPlaceholder(): string {
        return '';
    }

    public configure(fieldId: string, fieldType: string, netIdentifiers: Array<string>): void {
        if (!fieldId || !fieldType || !netIdentifiers || netIdentifiers.length === 0) {
            this._log.error('CaseSimpleDataset must be configured with defined values and a non-empty array');
            return;
        }
        this._fieldId = fieldId;
        this._fieldType = fieldType;
        this._netIdentifiers = netIdentifiers;
        this._pfqlKeyword = `data.${fieldId}.value`
    }

    protected get pfqlKeywords(): Array<string> {
        if (!this._fieldId) {
            return [];
        } else {
            return [this._pfqlKeyword];
        }
    }

    public get selectedOperator(): Operator<any> {
        switch (this._fieldType) {
            case FieldTypeResource.NUMBER.valueOf():
                return this._operatorService.getOperator(Equals);
            case FieldTypeResource.BOOLEAN.valueOf():
                return this._operatorService.getOperator(Equals);
            case FieldTypeResource.USER.valueOf():
                return this._operatorService.getOperator(Equals);
            case FieldTypeResource.DATE.valueOf():
                return this._operatorService.getOperator(EqualsDate);
            case FieldTypeResource.DATE_TIME.valueOf():
                return this._operatorService.getOperator(EqualsDateTime);
            default:
                return this._operatorService.getOperator(Substring);
        }
    }

    duplicate(): CaseSimpleDataset {
        return new CaseSimpleDataset(this._operatorService, this._log, this._optionalDependencies);
    }

    /**
     * Creates a {@link CaseDataset} instance and configures it so, that the query it generates targets
     * the selected field, uses the default operator and its operands are what the user provided.
     *
     * @param fieldType the type of the field that should be targeted by the transformed Category
     * @param fieldTitle the title of the field that should be targeted by the transformed Category
     * @param userInput the operands for the queried field
     * @returns a new {@link CaseDataset} configured with the provided values
     */
    public transformToCaseDataset(fieldType: string, fieldTitle: string, userInput: Array<any>): CaseDataset {
        const result = this._optionalDependencies.categoryFactory.get(CaseDataset) as CaseDataset;
        result.selectDatafields(DatafieldMapKey.serializedForm(fieldType, fieldTitle));
        result.setOperands(userInput);
        return result;
    }

    protected generateQuery(userInput: Array<unknown>): Query {
        const valueQuery = this.selectedOperator.createQuery(this.pfqlKeywords, userInput);
        const netsQuery = Query.combineQueries(
            this._netIdentifiers.map(id => this._processCategory.generatePredicate([[id]]).query),
            BooleanOperator.OR
        );
        return Query.combineQueries([valueQuery, netsQuery], BooleanOperator.AND).ensurePrefixAndGet(ResourceTypeQueryPrefix.CASES);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_SIMPLE_DATASET;
    }
}
