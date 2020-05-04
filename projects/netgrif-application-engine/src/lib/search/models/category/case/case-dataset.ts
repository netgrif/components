import {AutocompleteCategory} from '../autocomplete-category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Operator} from '../../operator/operator';
import {Query} from '../../query/query';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {SearchInputType} from '../search-input-type';
import {DatafieldMapKey} from '../../datafield-map-key';
import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {BooleanOperator} from '../../boolean-operator';
import {CaseProcess} from './case-process';
import {EqualsDate} from '../../operator/equals-date';
import {Substring} from '../../operator/substring';

interface Datafield {
    netId: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends AutocompleteCategory<Datafield> {

    // TODO 4.5.2020 - user and boolean fields are supported, but were skipped for now
    protected static DISABLED_TYPES = ['button', 'file', 'user', 'boolean'];

    protected _selectedDatafields: Array<Datafield>;

    protected _processCategory: CaseProcess;

    public static FieldTypeToInputType(fieldType: string): SearchInputType {
        switch (fieldType) {
            case 'date':
                return SearchInputType.DATE;
            default:
                return SearchInputType.TEXT;
        }
    }

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(undefined,
            undefined,
            'search.category.case.dataset',
            logger);
        this._processCategory = this._optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();
    }

    public get inputType(): SearchInputType {
        if (!this._selectedDatafields) {
            return SearchInputType.AUTOCOMPLETE;
        } else {
            return CaseDataset.FieldTypeToInputType(this._selectedDatafields[0].fieldType);
        }
    }

    public get allowedOperators(): Array<Operator<any>> {
        if (!this._selectedDatafields) {
            return [];
        }
        switch (this._selectedDatafields[0].fieldType) {
            // TODO 4.5.2020 - Operators should match the options from old frontend
            case 'date':
                return [this._operators.getOperator(EqualsDate)];
            default:
                return [this._operators.getOperator(Substring)];
        }
    }

    public get options(): Array<SearchAutocompleteOption> {
        const result = [];

        if (!this._selectedDatafields) {
            for (const serializedKey of this._optionsMap.keys()) {
                const mapKey = DatafieldMapKey.parse(serializedKey);
                result.push({
                    text: mapKey.title,
                    value: mapKey.toSerializedForm(),
                    icon: mapKey.icon
                });
            }
        }

        return result;
    }

    public get hasSelectedDatafields(): boolean {
        return !!this._selectedDatafields;
    }

    public reset() {
        super.reset();
        this._selectedDatafields = undefined;
    }

    protected get elasticKeywords(): Array<string> {
        if (!this._selectedDatafields) {
            return [];
        } else {
            return this._selectedDatafields.map(datafield => `dataSet.${datafield.fieldId}.value`);
        }
    }

    protected generateQuery(userInput: Array<unknown>): Query {
        const queries = this._selectedDatafields.map(datafield => {
            const valueQuery = this._selectedOperator.createQuery(this.elasticKeywords, userInput);
            const netQuery = this._processCategory.generatePredicate([datafield.netId]).query;
            return Query.combineQueries([valueQuery, netQuery], BooleanOperator.AND);
        });
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    protected createOptions(): void {
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                petriNet.immediateData
                    .filter(immediateData => {
                        return immediateData.title !== undefined
                            && immediateData.title.trim().length > 0
                            && !CaseDataset.DISABLED_TYPES.includes(immediateData.type);
                    })
                    .forEach(immediateData => {
                        this.addToMap(DatafieldMapKey.serializedForm(immediateData.type, immediateData.title), {
                            netId: petriNet.stringId,
                            fieldId: immediateData.stringId,
                            fieldType: immediateData.type,
                        });
                    });
            });
        });
    }

    public selectDatafields(datafieldMapKey: string, selectDefaultOperator = true): void {
        if (!this._optionsMap.has(datafieldMapKey)) {
            this._log.warn(`The provided 'datafieldMapKey' does not exist.`);
            return;
        }
        this._selectedDatafields = this._optionsMap.get(datafieldMapKey);
        if (selectDefaultOperator) {
            this.selectDefaultOperator();
        }
    }
}
