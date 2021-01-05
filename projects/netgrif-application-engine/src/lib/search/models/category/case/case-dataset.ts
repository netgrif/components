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
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {hasContent} from '../../../../utility/pagination/page-has-content';
import {FormControl} from '@angular/forms';

interface Datafield {
    netId: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends AutocompleteCategory<Datafield> {

    private static readonly _i18n = 'search.category.case.dataset';
    // TODO 4.5.2020 - only button, file and file list fields are truly unsupported, dateTime is implemented but lacks elastic support
    protected static DISABLED_TYPES = ['button', 'file', 'dateTime', 'fileList'];

    private _searchingUsers = false;

    protected _processCategory: CaseProcess;

    protected _configurationInputs$: BehaviorSubject<Array<SearchInputType>>;

    protected _datafieldFormControl: FormControl;
    protected _operatorFormControl: FormControl;

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

        this._configurationInputs$ = new BehaviorSubject<Array<SearchInputType>>([SearchInputType.AUTOCOMPLETE]);

        this._datafieldFormControl = new FormControl();
        this._operatorFormControl = new FormControl();

        this._datafieldFormControl.valueChanges.subscribe(newValue => {
            if (newValue === undefined) {
                this._configurationInputs$.next([SearchInputType.AUTOCOMPLETE]);
            } else if (this._configurationInputs$.getValue().length === 1) {
                this._configurationInputs$.next([SearchInputType.AUTOCOMPLETE, SearchInputType.OPERATOR]);
            }
        });
    }

    get configurationInputs$(): Observable<Array<SearchInputType>> {
        return this._configurationInputs$.asObservable();
    }

    public get inputType(): SearchInputType {
        if (!this.hasSelectedDatafields) {
            throw new Error('Input type of arguments cannot be determined before selecting a data field in during the configuration.');
        }
        return CaseDataset.FieldTypeToInputType(this._selectedDatafields[0].fieldType);
    }

    public get allowedOperators(): Array<Operator<any>> {
        if (!this.hasSelectedDatafields) {
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

        if (!this.hasSelectedDatafields) {
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
        return !!this._datafieldFormControl.value;
    }

    protected get _selectedDatafields(): Array<Datafield> {
        return this._datafieldFormControl.value;
    }

    public reset() {
        super.reset();
        this._datafieldFormControl.setValue(undefined);
        this._operatorFormControl.setValue(undefined);
    }

    protected get elasticKeywords(): Array<string> {
        if (!this.hasSelectedDatafields) {
            return [];
        } else {
            return this._selectedDatafields.map(datafield => `dataSet.${datafield.fieldId}.value`);
        }
    }

    getActiveInputFormControl(inputIndex: number): FormControl {
        if (inputIndex >= this._configurationInputs$.value.length || inputIndex < 0) {
            throw new Error(`The requested input index '${inputIndex}' is illegal. FormControl can only be obtained for inputs withing the`
                + ` provided configurationInputs array`);
        }
        if (inputIndex === 0) {
            return this._datafieldFormControl;
        }
        if (inputIndex === 1) {
            return this._operatorFormControl;
        }
    }

    get inputPlaceholder(): string {
        if (!this.hasSelectedDatafields) {
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
        if (!this.hasSelectedDatafields) {
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
            filter(page => hasContent(page)),
            map(users => users.content.map(
                user => ({text: user.fullName, value: [user.id], icon: 'account_circle'})
            ))
        );
    }

    public selectDatafields(datafieldMapKey: string, selectDefaultOperator = true): void {
        if (!this._optionsMap.has(datafieldMapKey)) {
            this._log.warn(`The provided 'datafieldMapKey' does not exist.`);
            return;
        }
        this._datafieldFormControl.setValue(this._optionsMap.get(datafieldMapKey));
        if (selectDefaultOperator) {
            this.selectDefaultOperator();
        }
    }
}
