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
import {debounceTime, filter, map, startWith, switchMap} from 'rxjs/operators';
import {hasContent} from '../../../../utility/pagination/page-has-content';
import {FormControl} from '@angular/forms';
import {Category} from '../category';
import {NotEquals} from '../../operator/not-equals';
import {MoreThan} from '../../operator/more-than';
import {LessThan} from '../../operator/less-than';
import {InRange} from '../../operator/in-range';
import {IsNull} from '../../operator/is-null';
import {Like} from '../../operator/like';
import {NotEqualsDate} from '../../operator/not-equals-date';
import {MoreThanDate} from '../../operator/more-than-date';
import {LessThanDate} from '../../operator/less-than-date';
import {InRangeDate} from '../../operator/in-range-date';
import {MoreThanDateTime} from '../../operator/more-than-date-time';
import {LessThanDateTime} from '../../operator/less-than-date-time';
import {InRangeDateTime} from '../../operator/in-range-date-time';
import {AutocompleteOptions} from '../autocomplete-options';
import {ConfigurationInput} from '../../configuration-input';

interface Datafield {
    netId: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends Category<Datafield> implements AutocompleteOptions {

    private static readonly _i18n = 'search.category.case.dataset';
    // TODO 4.5.2020 - only button, file and file list fields are truly unsupported, dateTime is implemented but lacks elastic support
    protected static DISABLED_TYPES = ['button', 'file', 'dateTime', 'fileList', 'enumeration_map', 'multichoice_map'];

    private _searchingUsers = false;

    protected readonly _DATAFIELD_INPUT: ConfigurationInput =
        new ConfigurationInput(SearchInputType.AUTOCOMPLETE, 'search.category.case.dataset.placeholder.field');

    protected _processCategory: CaseProcess;

    protected _configurationInputs$: BehaviorSubject<Array<ConfigurationInput>>;

    protected _datafieldFormControl: FormControl;

    protected _filteredConfigurationOptions$: Observable<Array<SearchAutocompleteOption<string>>>;

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

        this._configurationInputs$ = new BehaviorSubject<Array<ConfigurationInput>>([this._DATAFIELD_INPUT]);

        this._datafieldFormControl = new FormControl();

        this._datafieldOptions = new Map<string, Array<Datafield>>();
        this.createDatafieldOptions();

        this._datafieldFormControl.valueChanges.subscribe(newValue => {
            if (newValue === undefined || typeof newValue === 'string') {
                this._configurationInputs$.next([this._DATAFIELD_INPUT]);
            } else if (this._configurationInputs$.getValue().length === 1) {
                this._configurationInputs$.next([this._DATAFIELD_INPUT, this._OPERATOR_INPUT]);
            }
            this._operatorFormControl.setValue(undefined);
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

    get configurationInputs$(): Observable<Array<ConfigurationInput>> {
        return this._configurationInputs$.asObservable();
    }

    public get inputType(): SearchInputType {
        if (!this.hasSelectedDatafields) {
            throw new Error('Input type of arguments cannot be determined before selecting a data field during the configuration.');
        }
        return CaseDataset.FieldTypeToInputType(this._selectedDatafields[0].fieldType);
    }

    public get allowedOperators(): Array<Operator<any>> {
        if (!this.hasSelectedDatafields) {
            return [];
        }
        switch (this._selectedDatafields[0].fieldType) {
            case 'number':
                return [
                    this._operators.getOperator(Equals),
                    this._operators.getOperator(NotEquals),
                    this._operators.getOperator(MoreThan),
                    this._operators.getOperator(LessThan),
                    this._operators.getOperator(InRange),
                    this._operators.getOperator(IsNull)
                ];
            case 'boolean':
                return [this._operators.getOperator(Equals), this._operators.getOperator(NotEquals)];
            case 'user':
                // Angular JS frontend used these operators for enumeration, multichoice and file as well
                return [
                    this._operators.getOperator(Equals),
                    this._operators.getOperator(NotEquals),
                    this._operators.getOperator(IsNull),
                    this._operators.getOperator(Like)
                ];
            case 'date':
                return [
                    this._operators.getOperator(EqualsDate),
                    this._operators.getOperator(NotEqualsDate),
                    this._operators.getOperator(MoreThanDate),
                    this._operators.getOperator(LessThanDate),
                    this._operators.getOperator(InRangeDate),
                    this._operators.getOperator(IsNull)
                ];
            case 'dateTime':
                return [
                    this._operators.getOperator(EqualsDateTime),
                    this._operators.getOperator(MoreThanDateTime),
                    this._operators.getOperator(LessThanDateTime),
                    this._operators.getOperator(InRangeDateTime),
                    this._operators.getOperator(IsNull)
                ];
            default:
                return [
                    this._operators.getOperator(Substring),
                    this._operators.getOperator(Equals),
                    this._operators.getOperator(NotEquals),
                    this._operators.getOperator(MoreThan),
                    this._operators.getOperator(LessThan),
                    this._operators.getOperator(InRange),
                    this._operators.getOperator(IsNull),
                    this._operators.getOperator(Like)
                ];
        }
    }

    /**
     * @returns `CaseDataset` category is not displayed in bold for better readability
     */
    get displayBold(): boolean {
        return false;
    }

    public get hasSelectedDatafields(): boolean {
        return !!this._datafieldFormControl.value && typeof this._datafieldFormControl.value !== 'string';
    }

    protected get _selectedDatafields(): Array<Datafield> {
        return this._datafieldOptions.get(this._datafieldFormControl.value.value);
    }

    public reset() {
        super.reset();
        this._datafieldFormControl.setValue('');
    }

    duplicate(): CaseDataset {
        return new CaseDataset(this._operators, this._log, this._optionalDependencies);
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

    getFilteredAutocompleteConfigurationOptions(inputIndex: number): Observable<Array<SearchAutocompleteOption<string>>> {
        this.checkAutocompleteConfigurationIndex(inputIndex);
        return this._filteredConfigurationOptions$;
    }

    isAutocompleteConfigurationSelected(inputIndex: number): boolean {
        this.checkAutocompleteConfigurationIndex(inputIndex);
        return !!this._datafieldFormControl.value && (typeof this._datafieldFormControl.value !== 'string');
    }

    isAutocompleteConfigurationDisplayBold(inputIndex: number): boolean {
        this.checkAutocompleteConfigurationIndex(inputIndex);
        return true;
    }

    getAutocompleteConfigurationSelectedOptionTranslatePath(inputIndex: number): string {
        this.checkAutocompleteConfigurationIndex(inputIndex);
        return this._datafieldFormControl.value.text;
    }

    clearAutocompleteConfigurationInput(inputIndex: number): void {
        this.checkAutocompleteConfigurationIndex(inputIndex);
        this._datafieldFormControl.setValue(undefined);
    }

    get inputPlaceholder(): string {
        if (!this.hasSelectedDatafields) {
            return `${CaseDataset._i18n}.placeholder.field`;
        }
        return `${CaseDataset._i18n}.placeholder.value`;
    }

    protected generateQuery(userInput: Array<unknown>): Query {
        const queryGenerationStrategy = this.selectedOperator === this._operators.getOperator(IsNull) ?
            (d, _) => this.isNullOperatorQueryGenerationStrategy(d) :
            (d, ui) => this.standardQueryGenerationStrategy(d, ui);

        const queries = this._selectedDatafields.map(datafield => queryGenerationStrategy(datafield, userInput));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    protected standardQueryGenerationStrategy(datafield: Datafield, userInput: Array<unknown>): Query {
        const valueQuery = this.selectedOperator.createQuery(this.elasticKeywords, userInput);
        const netQuery = this.generateNetConstraint(datafield);
        return Query.combineQueries([valueQuery, netQuery], BooleanOperator.AND);
    }

    protected isNullOperatorQueryGenerationStrategy(datafield: Datafield): Query {
        const constraint = this.generateNetConstraint(datafield);
        return (this._operators.getOperator(IsNull) as IsNull).createQueryWithConstraint(this.elasticKeywords, constraint);
    }

    protected generateNetConstraint(datafield: Datafield): Query {
        return this._processCategory.generatePredicate([[datafield.netId]]).query;
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

    filterOptions(userInput: Observable<string | SearchAutocompleteOption<Array<string>>>):
        Observable<Array<SearchAutocompleteOption<Array<string>>>> {

        if (!this.hasSelectedDatafields) {
            throw new Error('The category must be fully configured before attempting to get autocomplete options!');
        }
        if (this.inputType !== SearchInputType.AUTOCOMPLETE) {
            throw new Error('Cannot filter options of non-autocomplete operands');
        }

        return userInput.pipe(
            startWith(''),
            debounceTime(600),
            switchMap(input => {
                if (typeof input === 'string') {
                    return this._optionalDependencies.userResourceService.search({fulltext: input}).pipe(
                        map(page => {
                            if (hasContent(page)) {
                                return page.content.map(
                                    user => ({text: user.fullName, value: [user.id], icon: 'account_circle'})
                                );
                            }
                            return [];
                        })
                    );
                } else {
                    return of([input]);
                }
            })
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

    protected isOperandValueSelected(newValue: any): boolean {
        if (!this.isOperatorSelected()) {
            return false;
        }
        let inputType: SearchInputType;
        try {
            inputType = this.inputType;
        } catch (e) {
            return false;
        }

        switch (inputType) {
            case SearchInputType.NUMBER:
                return typeof newValue === 'number';
            case SearchInputType.BOOLEAN:
                return typeof newValue === 'boolean';
            case SearchInputType.AUTOCOMPLETE:
                return !(!newValue || typeof newValue === 'string');
            default:
                return !!newValue;
        }
    }

    /**
     * Performs a transformation of the `FormControl` value before passing it into the selected `Operator` for query generation.
     * It is mostly useful only for AutocompleteCategories, where the selected value of the FormControl is an object.
     *
     * @param value the FormControlValue
     * @returns If the selected data field has input type `AUTOCOMPLETE` then returns the {@link SearchAutocompleteOption} `value`
     * attribute. Otherwise performs an identity operation.
     */
    protected transformCategoryValue(value: any): any {
        if (this.inputType === SearchInputType.AUTOCOMPLETE) {
            return (value as SearchAutocompleteOption<Array<number>>).value;
        }
        return value;
    }

    /**
     * Checks whether the input ath the given index is an autocomplete configuration and throws an error if not.
     * @param index the checked index
     */
    private checkAutocompleteConfigurationIndex(index: number): void {
        if (index !== 0) {
            throw new Error(`Illegal inputIndex '${index}'. This category doesn't have an autocomplete input at that index!`);
        }
    }
}
