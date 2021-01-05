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
import {filter, map, startWith, tap} from 'rxjs/operators';
import {hasContent} from '../../../../utility/pagination/page-has-content';
import {FormControl} from '@angular/forms';
import {Category} from '../category';

interface Datafield {
    netId: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends Category<Datafield> {

    private static readonly _i18n = 'search.category.case.dataset';
    // TODO 4.5.2020 - only button, file and file list fields are truly unsupported, dateTime is implemented but lacks elastic support
    protected static DISABLED_TYPES = ['button', 'file', 'dateTime', 'fileList'];

    private _searchingUsers = false;

    protected _processCategory: CaseProcess;

    protected _configurationInputs$: BehaviorSubject<Array<SearchInputType>>;

    protected _datafieldFormControl: FormControl;
    protected _operatorFormControl: FormControl;

    protected _filteredConfigurationOptions$: Observable<Array<SearchAutocompleteOption>>;

    protected _datafieldOptions: Map<string, Array<Datafield>>;

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
            undefined,
            logger);

        this._processCategory = this._optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();

        this._configurationInputs$ = new BehaviorSubject<Array<SearchInputType>>([SearchInputType.AUTOCOMPLETE]);

        this._datafieldFormControl = new FormControl();
        this._operatorFormControl = new FormControl();

        this._datafieldOptions = new Map<string, Array<Datafield>>();
        this.createDatafieldOptions();

        this._datafieldFormControl.valueChanges.subscribe(newValue => {
            if (newValue === undefined) {
                this._configurationInputs$.next([SearchInputType.AUTOCOMPLETE]);
            } else if (this._configurationInputs$.getValue().length === 1) {
                this._configurationInputs$.next([SearchInputType.AUTOCOMPLETE, SearchInputType.OPERATOR]);
            }
        });

        this._filteredConfigurationOptions$ = this._datafieldFormControl.valueChanges.pipe(
            startWith(''),
            filter(newValue => typeof newValue === 'string'),
            map(newValue => {
                return Array.from(this._datafieldOptions.keys())
                    .map(serializedMapKey => DatafieldMapKey.parse(serializedMapKey))
                    .filter(mapKey => mapKey.title.toLocaleLowerCase().startsWith(newValue))
                    .map(mapKey => ({
                        text: mapKey.title,
                        value: mapKey.toSerializedForm(),
                        icon: mapKey.icon
                    }));
            })
        );
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

    public get hasSelectedDatafields(): boolean {
        return !!this._datafieldFormControl.value;
    }

    protected get _selectedDatafields(): Array<Datafield> {
        return this._datafieldFormControl.value;
    }

    public reset() {
        super.reset();
        this._datafieldFormControl.setValue('');
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

    getFilteredAutocompleteConfigurationOptions(inputIndex: number): Observable<Array<SearchAutocompleteOption>> {
        if (inputIndex !== 0) {
            throw new Error(`Illegal inputIndex '${inputIndex}'. This category doesn't have an autocomplete input at that index!`);
        }
        return this._filteredConfigurationOptions$;
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

    protected createDatafieldOptions(): void {
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                petriNet.immediateData
                    .filter(immediateData => {
                        return immediateData.title !== undefined
                            && immediateData.title.trim().length > 0
                            && !CaseDataset.DISABLED_TYPES.includes(immediateData.type);
                    })
                    .forEach(immediateData => {
                        this.addToDatafieldOptionsMap(DatafieldMapKey.serializedForm(immediateData.type, immediateData.title), {
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
            // TODO
            throw new Error('TODO');
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
        if (!this._datafieldOptions.has(datafieldMapKey)) {
            this._log.warn(`The provided 'datafieldMapKey' does not exist.`);
            return;
        }
        this._datafieldFormControl.setValue(this._datafieldOptions.get(datafieldMapKey));
        if (selectDefaultOperator) {
            this.selectDefaultOperator();
        }
    }

    /**
     * Adds a new entry or pushes value into an existing entry.
     * When a new entry is created, it is created as an Array of one element.
     * @param key where in the map should the value be added
     * @param value the value that should be added to the map
     */
    protected addToDatafieldOptionsMap(key: string, value: Datafield): void {
        if (this._datafieldOptions.has(key)) {
            this._datafieldOptions.get(key).push(value);
        } else {
            this._datafieldOptions.set(key, [value]);
        }
    }
}
