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
import {BehaviorSubject, Observable, of, ReplaySubject, Subscription} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {hasContent} from '../../../../utility/pagination/page-has-content';
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
import {SearchIndex} from '../../search-index';
import {Type} from '@angular/core';
import {Categories} from '../categories';
import {FormControl} from '@angular/forms';
import moment, {Moment} from 'moment';
import {CategoryMetadataConfiguration} from '../../persistance/generator-metadata';
import {MoreThanEqual} from '../../operator/more-than-equal';
import {LessThanEqual} from '../../operator/less-than-equal';
import {MoreThanEqualDate} from '../../operator/more-than-equal-date';
import {LessThanEqualDate} from '../../operator/less-than-equal-date';
import {MoreThanEqualDateTime} from '../../operator/more-than-equal-date-time';
import {LessThanEqualDateTime} from '../../operator/less-than-equal-date-time';
import {FilterTextSegment} from '../../persistance/filter-text-segment';
import {UserAutocomplete} from '../user-autocomplete';

interface Datafield {
    netIdentifier: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends Category<Datafield> implements AutocompleteOptions {

    private static readonly _i18n = 'search.category.case.dataset';
    protected static DISABLED_TYPES = ['button', 'taskRef', 'caseRef', 'filter'];
    protected static readonly DATAFIELD_METADATA = 'datafield';
    private static readonly AUTOCOMPLETE_ICON = 'account_circle';

    protected readonly _DATAFIELD_INPUT: ConfigurationInput;

    protected _processCategory: CaseProcess;

    protected _configurationInputs$: BehaviorSubject<Array<ConfigurationInput>>;

    protected _datafieldOptions: Map<string, Array<Datafield>>;

    private _datafieldOptionsInitialized$: ReplaySubject<void>;
    private _allowedNetsSub: Subscription;
    private _userAutocomplete: UserAutocomplete;

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

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(undefined,
            undefined,
            `${CaseDataset._i18n}.name`,
            undefined,
            logger,
            operators);

        this._processCategory = this._optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();

        this._datafieldOptions = new Map<string, Array<Datafield>>();
        this._userAutocomplete = new UserAutocomplete(this._optionalDependencies);
        this.createDatafieldOptions();

        this._DATAFIELD_INPUT = new ConfigurationInput(
            SearchInputType.AUTOCOMPLETE,
            'search.category.case.dataset.placeholder.field',
            true,
            this._datafieldOptions,
            (mapKeys, newValue) => {
                return mapKeys.map(serializedMapKey => DatafieldMapKey.parse(serializedMapKey))
                    .filter(mapKey => mapKey.title.toLocaleLowerCase().startsWith(newValue));
            }
        );

        this._configurationInputs$ = new BehaviorSubject<Array<ConfigurationInput>>([this._DATAFIELD_INPUT]);

        this._DATAFIELD_INPUT.valueChanges$().subscribe(newValue => {
            if (newValue === undefined || typeof newValue === 'string') {
                this._configurationInputs$.next([this._DATAFIELD_INPUT]);
            } else if (this._configurationInputs$.getValue().length === 1) {
                this._configurationInputs$.next([this._DATAFIELD_INPUT, this._OPERATOR_INPUT]);
            }
            this._operatorFormControl.setValue(undefined);
        });
    }

    destroy() {
        super.destroy();
        this._configurationInputs$.complete();
        this._datafieldOptionsInitialized$.complete();
        if (this._allowedNetsSub && !this._allowedNetsSub.closed) {
            this._allowedNetsSub.unsubscribe();
        }
        this._processCategory.destroy();
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

    /**
     * The allowed operators are dependant on the selected data field.
     *
     * Beware that if you want to change the order of the allowed operators, then you must also update the
     * [selectDefaultOperator()]{@link Category#selectDefaultOperator} method, so that default operator for each data field type matches
     * the default operator of the {@link CaseSimpleDataset} search category. Otherwise the transition of header search into the search GUI
     * won't work properly.
     */
    public get allowedOperators(): Array<Operator<any>> {
        if (!this.hasSelectedDatafields) {
            return [];
        }
        switch (this._selectedDatafields[0].fieldType) {
            case 'number':
                return [
                    this._operatorService.getOperator(Equals),
                    this._operatorService.getOperator(NotEquals),
                    this._operatorService.getOperator(MoreThan),
                    this._operatorService.getOperator(MoreThanEqual),
                    this._operatorService.getOperator(LessThan),
                    this._operatorService.getOperator(LessThanEqual),
                    this._operatorService.getOperator(InRange),
                    this._operatorService.getOperator(IsNull)
                ];
            case 'boolean':
                return [
                    this._operatorService.getOperator(Equals),
                    this._operatorService.getOperator(NotEquals)
                ];
            case 'user':
            case 'userList':
                return [
                    this._operatorService.getOperator(Equals),
                    this._operatorService.getOperator(NotEquals),
                    this._operatorService.getOperator(IsNull)
                ];
            case 'date':
                return [
                    this._operatorService.getOperator(EqualsDate),
                    this._operatorService.getOperator(NotEqualsDate),
                    this._operatorService.getOperator(MoreThanDate),
                    this._operatorService.getOperator(MoreThanEqualDate),
                    this._operatorService.getOperator(LessThanDate),
                    this._operatorService.getOperator(LessThanEqualDate),
                    this._operatorService.getOperator(InRangeDate),
                    this._operatorService.getOperator(IsNull)
                ];
            case 'dateTime':
                return [
                    this._operatorService.getOperator(EqualsDateTime),
                    this._operatorService.getOperator(MoreThanDateTime),
                    this._operatorService.getOperator(MoreThanEqualDateTime),
                    this._operatorService.getOperator(LessThanDateTime),
                    this._operatorService.getOperator(LessThanEqualDateTime),
                    this._operatorService.getOperator(InRangeDateTime),
                    this._operatorService.getOperator(IsNull)
                ];
            default:
                return [
                    this._operatorService.getOperator(Substring),
                    this._operatorService.getOperator(Equals),
                    this._operatorService.getOperator(NotEquals),
                    this._operatorService.getOperator(IsNull),
                    this._operatorService.getOperator(Like)
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
        return this._DATAFIELD_INPUT.isOptionSelected;
    }

    protected get _selectedDatafields(): Array<Datafield> {
        return this._datafieldOptions.get(this._DATAFIELD_INPUT.formControl.value.value);
    }

    public reset() {
        super.reset();
        this._DATAFIELD_INPUT.clear();
    }

    duplicate(): CaseDataset {
        return new CaseDataset(this._operatorService, this._log, this._optionalDependencies);
    }

    protected get elasticKeywords(): Array<string> {
        if (!this.hasSelectedDatafields) {
            return [];
        } else {
            return this._selectedDatafields.map(datafield => this.resolveElasticKeyword(datafield));
        }
    }

    protected resolveElasticKeyword(datafield: Datafield): string {
        const resolver = this._optionalDependencies.searchIndexResolver;
        switch (datafield.fieldType) {
            case 'number':
                return resolver.getIndex(datafield.fieldId, SearchIndex.NUMBER);
            case 'date':
            case 'dateTime':
                return resolver.getIndex(datafield.fieldId, SearchIndex.TIMESTAMP);
            case 'boolean':
                return resolver.getIndex(datafield.fieldId, SearchIndex.BOOLEAN);
            case 'file':
            case 'fileList':
                return resolver.getIndex(datafield.fieldId, SearchIndex.FILE_NAME,
                    this.isSelectedOperator(Equals) || this.isSelectedOperator(NotEquals) || this.isSelectedOperator(Substring));
            case 'user':
            case 'userList':
                return resolver.getIndex(datafield.fieldId, SearchIndex.USER_ID);
            default:
                return resolver.getIndex(datafield.fieldId, SearchIndex.FULLTEXT,
                    this.isSelectedOperator(Equals) || this.isSelectedOperator(NotEquals) || this.isSelectedOperator(Substring));
        }
    }

    get inputPlaceholder(): string {
        if (!this.hasSelectedDatafields) {
            return `${CaseDataset._i18n}.placeholder.field`;
        }
        return `${CaseDataset._i18n}.placeholder.value`;
    }

    protected get datafieldOptionsInitialized$(): Observable<void> {
        return this._datafieldOptionsInitialized$.asObservable();
    }

    protected generateQuery(userInput: Array<unknown>): Query {
        let queryGenerationStrategy;
        if (this.isSelectedOperator(IsNull)) {
            queryGenerationStrategy = (d, _) => this.isNullOperatorQueryGenerationStrategy(d);
        } else if (this.inputType === SearchInputType.AUTOCOMPLETE) {
            queryGenerationStrategy = (d, ui) => this.standardQueryGenerationStrategy(d, ui[0], false);
        } else {
            queryGenerationStrategy = (d, ui) => this.standardQueryGenerationStrategy(d, ui);
        }

        const queries = this._selectedDatafields.map(datafield => queryGenerationStrategy(datafield, userInput));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    protected standardQueryGenerationStrategy(datafield: Datafield, userInput: Array<unknown>, escapeInput = true): Query {
        const valueQuery = this.selectedOperator.createQuery(this.elasticKeywords, userInput, escapeInput);
        const netQuery = this.generateNetConstraint(datafield);
        return Query.combineQueries([valueQuery, netQuery], BooleanOperator.AND);
    }

    protected isNullOperatorQueryGenerationStrategy(datafield: Datafield): Query {
        const constraint = this.generateNetConstraint(datafield);
        return (this._operatorService.getOperator(IsNull) as IsNull).createQueryWithConstraint(this.elasticKeywords, constraint);
    }

    protected generateNetConstraint(datafield: Datafield): Query {
        return this._processCategory.generatePredicate([[datafield.netIdentifier]]).query;
    }

    protected createDatafieldOptions(): void {
        this._datafieldOptionsInitialized$ = new ReplaySubject<void>(1);
        this._allowedNetsSub = this._optionalDependencies.allowedNetsService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                petriNet.immediateData
                    .filter(immediateData => {
                        return immediateData.title !== undefined
                            && immediateData.title.trim().length > 0
                            && !CaseDataset.DISABLED_TYPES.includes(immediateData.type);
                    })
                    .forEach(immediateData => {
                        let type = immediateData.type;

                        // for search purposes, enumeration and multichoice maps are equivalent to their simpler counterparts
                        if (type === 'enumeration_map') {
                            type = 'enumeration';
                        } else if (type === 'multichoice_map') {
                            type = 'multichoice';
                        }

                        this.addToDatafieldOptionsMap(DatafieldMapKey.serializedForm(immediateData.type, immediateData.title), {
                            netIdentifier: petriNet.identifier,
                            fieldId: immediateData.stringId,
                            fieldType: immediateData.type,
                        });
                    });
            });
            this._datafieldOptionsInitialized$.next();
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

        return this._userAutocomplete.filterOptions(userInput);
    }

    public selectDatafields(datafieldMapKey: string, selectDefaultOperator = true): void {
        if (!this._datafieldOptions.has(datafieldMapKey)) {
            this._log.warn(`The provided 'datafieldMapKey' (${datafieldMapKey}) does not exist.`);
            return;
        }
        this._DATAFIELD_INPUT.formControl.setValue(DatafieldMapKey.parse(datafieldMapKey));
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

    serializeClass(): Categories | string {
        return Categories.CASE_DATASET;
    }

    protected serializeOperandValue(valueFormControl: FormControl): unknown {
        switch (this.inputType) {
            case SearchInputType.AUTOCOMPLETE:
                return this._userAutocomplete.serializeOperandValue(valueFormControl);
            case SearchInputType.DATE:
            case SearchInputType.DATE_TIME:
                return (valueFormControl.value as Moment).valueOf();
            default:
                return super.serializeOperandValue(valueFormControl);
        }
    }

    protected createMetadataConfiguration(): CategoryMetadataConfiguration {
        const config = super.createMetadataConfiguration();
        config[CaseDataset.DATAFIELD_METADATA] = (this._DATAFIELD_INPUT.formControl.value as DatafieldMapKey).toSerializedForm();
        return config;
    }

    protected loadConfigurationFromMetadata(configuration: CategoryMetadataConfiguration): Observable<void> {
        const result$ = new ReplaySubject<void>(1);
        this.datafieldOptionsInitialized$.subscribe(() => {
            const serializedMapKey = configuration[CaseDataset.DATAFIELD_METADATA] as string;
            this.selectDatafields(serializedMapKey, false);
            if (!this.hasSelectedDatafields) {
                throw new Error(`Searched data fields cannot be restored from the provided configuration (${serializedMapKey
                }). Make sure, that the correct allowed nets are provided in this view.`);
            }
            super.loadConfigurationFromMetadata(configuration).subscribe(() => {
                result$.next();
                result$.complete();
            });
        });
        return result$.asObservable();
    }

    protected deserializeOperandValue(value: unknown): Observable<any> {
        switch (this.inputType) {
            case SearchInputType.AUTOCOMPLETE:
                return this._userAutocomplete.deserializeOperandValue(value as SearchAutocompleteOption<Array<string>>);
            case SearchInputType.DATE:
            case SearchInputType.DATE_TIME:
                return of(moment(value as string));
            default:
                return super.deserializeOperandValue(value);
        }
    }

    protected createConfigurationFilterTextSegments(): Array<FilterTextSegment> {
        return [{segment: this._configurationInputs$.value[0].formControl.value.text, bold: true}];
    }
}
