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
import {EqualsDateTime} from '../../operator/equals-date-time';
import {Equals} from '../../operator/equals';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

interface Datafield {
    netId: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends AutocompleteCategory<Datafield> {

    private static readonly _i18n = 'search.category.case.dataset';
    // TODO 4.5.2020 - only button and file fields are truly unsupported, dateTime is implemented but lacks elastic support
    protected static DISABLED_TYPES = ['button', 'file', 'dateTime'];

    private _searchingUsers = false;

    protected _selectedDatafields: Array<Datafield>;

    protected _processCategory: CaseProcess;

    public static FieldTypeToInputType(fieldType: string): SearchInputType {
        switch (fieldType) {
            case 'date':
                return SearchInputType.DATE;
            case 'dateTime':
                return SearchInputType.DATE_TIME;
            case 'number':
                return SearchInputType.NUMBER;
            case 'boolean':
                return SearchInputType.BOOLEAN;
            case 'user':
                return SearchInputType.AUTOCOMPLETE;
            default:
                return SearchInputType.TEXT;
        }
    }

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(undefined,
            undefined,
            `${CaseDataset._i18n}.name`,
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
            case 'number':
                return [this._operators.getOperator(Equals)];
            case 'boolean':
                return [this._operators.getOperator(Equals)];
            case 'user':
                return [this._operators.getOperator(Equals)];
            case 'date':
                return [this._operators.getOperator(EqualsDate)];
            case 'dateTime':
                return [this._operators.getOperator(EqualsDateTime)];
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

    get inputPlaceholder(): string {
        if (!this._selectedDatafields) {
            return `${CaseDataset._i18n}.placeholder.field`;
        }
        return `${CaseDataset._i18n}.placeholder.value`;
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

    filterOptions(userInput: string): Observable<Array<SearchAutocompleteOption>> {
        if (!this._selectedDatafields) {
            return super.filterOptions(userInput);
        }
        if (this._selectedDatafields[0].fieldType !== 'user' || this._searchingUsers) {
            return of([]);
        }
        this._searchingUsers = true;
        // TODO 13.5.2020 - Endpoint searches for substrings in name and surname separately, won't match "Name Surname" string to any result
        //  User search should possibly be delegated to elastic in the future
        return this._optionalDependencies.userResourceService.search({fulltext: userInput}).pipe(
            tap(() => {
                this._searchingUsers = false;
            }),
            filter(result => Array.isArray(result)),
            map(users => users.map(
                user => ({text: user.fullName, value: [user.id], icon: 'account_circle'})
            ))
        );
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
