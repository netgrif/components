import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {Query} from '../query/query';
import {ElementaryPredicate} from '../predicate/elementary-predicate';
import {SearchInputType} from './search-input-type';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, forkJoin, Observable, of, ReplaySubject} from 'rxjs';
import {debounceTime, defaultIfEmpty, map} from 'rxjs/operators';
import {OperatorTemplatePart} from '../operator-template-part';
import {IncrementingCounter} from '../../../utility/incrementing-counter';
import {ConfigurationInput} from '../configuration-input';
import {CategoryGeneratorMetadata, CategoryMetadataConfiguration} from '../persistance/generator-metadata';
import {Categories} from './categories';
import {OperatorService} from '../../operator-service/operator.service';
import {Operators} from '../operator/operators';
import {ofVoid} from '../../../utility/of-void';
import {FilterTextSegment} from '../persistance/filter-text-segment';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../../moment/time-formats';

/**
 * The top level of abstraction in search query generation. Represents a set of indexed fields that can be searched.
 * Encapsulates the the state and logic of the query construction process.
 *
 * As opposed to {@link Operator}s Categories are not stateless and shouldn't be shared.
 * A single Category instance is capable of holding the state of one {@link EditablePredicate},
 * or can be used as a builder to form an unlimited amount of [ElementaryPredicates]{@link ElementaryPredicate}.
 *
 * You can use {@link CategoryFactory} to get instances of Category classes.
 * Alternatively you can use the [clone()]{@Link Category#clone} method to duplicate an existing instance.
 *
 * If you want to make your own Category class you have to make sure that the constructor takes {@link OperatorService} as it's first
 * argument and {@link LoggerService} as it's second argument. Alternatively you can make your own implementation of the
 * {@link CategoryFactory} so, that your style of constructors is supported.
 *
 * @typeparam T type of objects the category expects to generate queries from
 */
export abstract class Category<T> {

    /**
     * The {@link CategoryMetadataConfiguration} key for this Category's {@link Operator}
     */
    protected static readonly OPERATOR_METADATA = 'operator';

    /**
     * Contains the `FormControl` object that is used to drive the operator selection.
     *
     * The category can subscribe to it if it wishes to react to the selection change by the user.
     */
    protected _operatorFormControl: FormControl;

    /**
     * Stores the `FormControl` objects that are pushed into the observable when the number of operands changes.
     */
    protected _operandsFormControls: Array<FormControl>;

    /**
     * Contains the `FormControl` objects that can be used to input search arguments.
     */
    protected _operandsFormControls$: ReplaySubject<Array<FormControl> | undefined>;

    /**
     * Contains the operator template parts that make up the operands GUI.
     */
    protected _operatorTemplate$: BehaviorSubject<Array<OperatorTemplatePart> | undefined>;

    /**
     * Generates IDs for template parts supplied to ng for.
     */
    protected _trackByIdGenerator: IncrementingCounter;

    /**
     * Emit a new `Predicate` if the `Category` is in a state that it can be created.
     * Emits `undefined` if the `Category` is not in such state.
     */
    protected _generatedPredicate$: BehaviorSubject<ElementaryPredicate | undefined>;

    /**
     * Utility variable that can be used as value for the [configurationInputs$]{@link Category#configurationInputs$} `Observable`.
     */
    protected readonly _OPERATOR_INPUT: ConfigurationInput;

    /**
     * The constructor fills the values of all protected fields and then calls the [initializeCategory()]{@link Category#initializeCategory}
     * method. If you want to override the category creation behavior override that method.
     *
     * @param _elasticKeywords Elasticsearch keywords that should be queried by queries generated with this category
     * @param _allowedOperators Operators that can be used to generated queries on the above keywords
     * @param translationPath path to the translation string
     * @param _inputType input field type that should be used to enter operator arguments for this category
     * @param _log used to record information about incorrect use of this class
     * @param _operatorService used to resolve serialized operators during deserialization
     */
    protected constructor(protected readonly _elasticKeywords: Array<string>,
                          protected readonly _allowedOperators: Array<Operator<any>>,
                          public readonly translationPath: string,
                          protected readonly _inputType: SearchInputType,
                          protected _log: LoggerService,
                          protected _operatorService: OperatorService) {
        this._OPERATOR_INPUT = new ConfigurationInput(
            SearchInputType.OPERATOR,
            'search.operator.name',
            false,
            new Map<string, Array<unknown>>(),
            () => {
                throw new Error('ConfigurationInput of type OPERATOR is a placeholder!'
                    + ' Use operator related methods from the Category class instead.');
            }
        );

        this._operatorFormControl = this._OPERATOR_INPUT.formControl;
        this._operandsFormControls$ = new ReplaySubject<Array<FormControl> | undefined>(1);
        this._operatorTemplate$ = new BehaviorSubject<Array<OperatorTemplatePart> | undefined>(undefined);
        this._operandsFormControls = [];
        this._trackByIdGenerator = new IncrementingCounter();
        this._generatedPredicate$ = new BehaviorSubject<ElementaryPredicate | undefined>(undefined);
        this.initializeCategory();

        this.operandsFormControls$.pipe(
            map(formControls => {
                if (!formControls) {
                    return undefined;
                }

                const parts = this.selectedOperator.getOperatorNameTemplate();
                const fcs = [...formControls];
                let first = true;
                return parts.map(part => {
                    const template = new OperatorTemplatePart(part ? part : fcs.shift() as FormControl,
                        this._trackByIdGenerator.next(),
                        part ? undefined : first);
                    if (!part) {
                        first = false;
                    }
                    return template;
                });
            })
        ).subscribe(template => {
            this._operatorTemplate$.next(template);
        });
    }

    /**
     * Cleans up the internal state of the object before its destruction.
     *
     * The developer must call this method at an appropriate moment, as this object cannot hook into the Angular lifecycle.
     */
    public destroy(): void {
        this._operandsFormControls$.complete();
        this._operatorTemplate$.complete();
        this._generatedPredicate$.complete();
    }

    /**
     * Configuration input represent the steps that are necessary to configure the category.
     * The last input must always be of type [OPERATOR]{@link SearchInputType#OPERATOR}.
     * Selecting the operator completes the configuration of the category and the arguments inputs
     * (based on category input type and operator arity) are displayed.
     *
     * Beware that while most categories always return the same constant it must not always be the case.
     *
     * @returns the required input type for configuration steps of this category
     */
    public abstract get configurationInputs$(): Observable<Array<ConfigurationInput>>;

    /**
     * If you use the `Category` class as a sort of PredicateBuilder, then you want to use the
     * [generatePredicate()]{@link Category#generatePredicate} method instead.
     *
     * This stream publishes either a new `Predicate` object or `undefined` based on changes to the `FormControls` that are
     * managed by this class. If (based on user input) the `Category` reaches a state when construction of a `Predicate` is possible
     * it will emit this `Predicate`. If it reaches a state when the `Predicate` can not longer be created `undefined` is emitted.
     */
    public get generatedPredicate$(): Observable<ElementaryPredicate | undefined> {
        return this._generatedPredicate$.asObservable();
    }

    /**
     * Returns the {@link Predicate} currently generated by the Category.
     *
     * For more information see [generatedPredicate$]{@link Category#generatedPredicate$}.
     */
    public get generatedPredicate(): ElementaryPredicate | undefined {
        return this._generatedPredicate$.getValue();
    }

    /**
     * Beware that while most categories always return the same constant it is not a requirement.
     * An example for such behavior is the {@link CaseDataset} category, where the argument input type depends
     * on the selected data field type.
     *
     * @returns the required input type for arguments for this category
     */
    public get inputType(): SearchInputType {
        return this._inputType;
    }

    /**
     * @returns the set of Operators that can be used with this category. Iteration order determines the display order.
     */
    public get allowedOperators(): Array<Operator<any>> {
        const result = [];
        result.push(...this._allowedOperators);
        return result;
    }

    /**
     * @returns the currently selected operator or `undefined` if no operator is selected.
     */
    public get selectedOperator(): Operator<any> {
        return this._operatorFormControl.value;
    }

    /**
     * @returns an array of `FormControl` objects that contains as many controls as is the arity of the selected operator.
     * Calling this method multiple times will return the same `FormControl` instances.
     * When no operator is selected `undefined` is emitted.
     */
    public get operandsFormControls$(): Observable<Array<FormControl> | undefined> {
        return this._operandsFormControls$.asObservable();
    }

    /**
     * A new value is emitted whenever the selected operator changes. `undefined` is emitted if no operator is selected.
     *
     * @returns [operators template]{@link Operator#getOperatorNameTemplate} in processed form fit for GUI rendering
     */
    public get operatorTemplate$(): Observable<Array<OperatorTemplatePart> | undefined> {
        return this._operatorTemplate$.asObservable();
    }

    /**
     * @returns whether the category is fully configured and represents a valid predicate or not
     */
    public get providesPredicate(): boolean {
        return !!this._generatedPredicate$.getValue();
    }

    /**
     * @returns the set of Elasticsearch keywords that should be queried by queries generated with this category.
     * The method can be overridden if the keywords are not static and change based on some additional selection (eg. Data fields)
     */
    protected get elasticKeywords(): Array<string> {
        const result = [];
        result.push(...this._elasticKeywords);
        return result;
    }

    /**
     * @returns the arity of the selected operator. Throws an error if no operator is selected.
     */
    protected get selectedOperatorArity(): number {
        if (!this.isOperatorSelected()) {
            throw new Error('An operator mus be selected before its arity can be resolved!');
        }
        return this.selectedOperator.numberOfOperands;
    }

    /**
     * Changes the state of the Category. Category can create queries when an {@link Operator} is selected.
     *
     * This method is useful if you want to use the Category class as predicate builder.
     *
     * @param operatorIndex index in the [allowedOperators]{@link Category#allowedOperators} array of the {@link Operator} that
     * should be selected
     */
    public selectOperator(operatorIndex: number): void {
        const operators = this.allowedOperators;
        if (operatorIndex < 0 || operatorIndex >= operators.length) {
            this._log.warn(`The provided 'operatorIndex' is out of range.`);
            return;
        }
        this._operatorFormControl.setValue(operators[operatorIndex]);
    }

    /**
     * Changes the state of the Category and generates a query if all necessary operands were set.
     *
     * If you are using the category as a builder. Consider using the [generatePredicate()]{@link Category#generatePredicate}
     * method instead.
     *
     * @param userInput values entered by the user. The length of the array should match the
     * [arity]{@link Operator#_numberOfOperands} of the selected Operator.
     */
    public setOperands(userInput: Array<T>): void {
        const range = Math.min(userInput.length, this._operandsFormControls.length);
        if (range < userInput.length) {
            this._log.warn(`${userInput.length} operands are being set, but only ${range} inputs are available!`
                + ' Extra operands will be ignored.');
        }
        for (let i = 0; i < range; i++) {
            this._operandsFormControls[i].setValue(userInput[i]);
        }
        if (range !== 0) {
            this.operandValueChanges(range - 1);
        }
    }

    /**
     * Resets the state of the Category, deselecting any selected category and removing other state
     * information if the Category defines them.
     *
     * This method can be used to reset the state of the category after each predicate constructed,
     * effectively turning the category instance into a predicate builder.
     */
    public reset(): void {
        this.clearOperatorSelection();
        this._operandsFormControls.forEach(fc => {
            fc.setValue(undefined);
        });
    }

    /**
     * Calls the [createQuery]{@link Operator#createQuery} method on the selected Operator.
     *
     * Throws an Error if no Operator is selected.
     *
     * Override this method if the query should be generated in some other way.
     * @param userInput values entered by the user. The length of the array should match the
     * [arity]{@link Operator#_numberOfOperands} of the selected Operator.
     * @returns the Query generated by the selected Operator
     */
    protected generateQuery(userInput: Array<T>): Query {
        if (!this.isOperatorSelected()) {
            throw new Error('Category cannot generate a Query if no Operator is selected');
        }
        return this._operatorFormControl.value.createQuery(this._elasticKeywords, userInput as unknown as Array<string>);
    }

    /**
     * Calls the [generateQuery]{@link Category#generateQuery} method and creates an {@link ElementaryPredicate} with the result.
     * @param userInput values entered by the user. The length of the array should match the
     * [arity]{@link Operator#_numberOfOperands} of the selected Operator.
     * @returns Predicate with {@link Query} generated by this object's [generateQuery]{@link Category#generateQuery} method
     */
    public generatePredicate(userInput: Array<T>): ElementaryPredicate {
        return new ElementaryPredicate(this.generateQuery(userInput));
    }

    /**
     * Selects the default operator that should be used for query generation, when no Operator selection is provided to the user.
     *
     * The default implementation selects the first operator in the [_allowedOperators]{@link Category#allowedOperators} array.
     *
     * See [selectOperator()]{@link Category#selectOperator} for more information.
     */
    public selectDefaultOperator(): void {
        this.selectOperator(0);
    }

    /**
     * @returns the translation string path for the text that should be displayed in the input placeholder
     */
    public abstract get inputPlaceholder(): string;

    /**
     * @returns whether the category text should be rendered with bold text when selected
     */
    public abstract get displayBold(): boolean;

    /**
     * @returns whether an operator is currently selected or not.
     */
    public isOperatorSelected(): boolean {
        return !!this._operatorFormControl.value;
    }

    /**
     * Deselects the currently selected operator (if any)
     */
    public clearOperatorSelection(): void {
        this._operatorFormControl.setValue(undefined);
    }

    /**
     * Creates a duplicate of the current category object. Note that a duplicate is NOT a clone.
     * The state of the returned category is not necessarily the same as the state of this category.
     *
     * @returns a category instance of the same type as this category in its initial state.
     */
    public abstract duplicate(): Category<T>;

    /**
     * Provides the necessary information for the serialisation of this category's state.
     *
     * Not every state must be preservable. The default library implementation supports only the preservation of the final state when the
     * Category is generating a predicate object.
     *
     * @returns an object containing all the necessary information for the reconstruction of this category's state,
     * barring information about allowed nets. Returns `undefined` if the category is not in a state that generates a predicate.
     * See [providesPredicate()]{@link Category#providesPredicate}.
     */
    public createMetadata(): CategoryGeneratorMetadata | undefined {
        if (!this.providesPredicate) {
            return undefined;
        }
        return {
            category: this.serializeClass(),
            configuration: this.createMetadataConfiguration(),
            values: this.createMetadataValues()
        };
    }

    /**
     * Restores the saved state contained in the provided metadata.
     *
     * @param metadata the metadata created by calling the [createMetadata()]{@link Category#createMetadata} method
     *
     * @returns an Observable. When the Observable emits the category has finished restoring its state.
     */
    public loadFromMetadata(metadata: CategoryGeneratorMetadata): Observable<void> {
        const result$ = new ReplaySubject<void>(1);
        this.loadConfigurationFromMetadata(metadata.configuration).subscribe(() => {
            this.loadValuesFromMetadata(metadata.values).subscribe(() => {
                result$.next();
                result$.complete();
            });
        });
        return result$.asObservable();
    }

    /**
     * This method is calle in the constructor. Apart from calling this method, the constructor only creates instances to fill the protected
     * fields of this class.
     *
     * The default implementation manages creation of operand `FormControl` instances and manages subscriptions to them.
     *
     * You can override this method to change the initialization of your category without having to rewrite the base
     * constructor from scratch.
     */
    protected initializeCategory(): void {
        this._operatorFormControl.valueChanges.subscribe((newOperator: Operator<any>) => {
            this._operandsFormControls.forEach(fc => {
                fc.setValue(undefined);
            });

            if (!newOperator) {
                // undefined is next-ed into the stream. Marked as code smell by sonar when explicitly stated
                this._operandsFormControls$.next();
                if (this._operandsFormControls.length === 0) {
                    this._generatedPredicate$.next(undefined);
                }
                return;
            }

            if (newOperator.numberOfOperands > this._operandsFormControls.length) {
                while (this._operandsFormControls.length < newOperator.numberOfOperands) {
                    const fc = new FormControl();
                    const currentLength = this._operandsFormControls.length;
                    fc.valueChanges.pipe(debounceTime(600)).subscribe(() => {
                        this.operandValueChanges(currentLength);
                    });
                    this._operandsFormControls.push(fc);
                }
            }

            this._operandsFormControls$.next(this._operandsFormControls.slice(0, newOperator.numberOfOperands));

            if (newOperator.numberOfOperands === 0) {
                this._generatedPredicate$.next(this.generatePredicate([]));
            }
        });
    }

    /**
     * The method that is (by default) called whenever an operand `FormControl` changes its value.
     *
     * @param operandIndex the index of the operand that changed its value
     */
    protected operandValueChanges(operandIndex: number): void {
        if (!this.isOperatorSelected()) {
            this._generatedPredicate$.next(undefined);
            return;
        }
        if (operandIndex >= this.selectedOperatorArity) {
            return;
        }

        for (let i = 0; i < this.selectedOperatorArity; i++) {
            if (!this.isOperandValueSelected(this._operandsFormControls[i].value)) {
                if (this._generatedPredicate$.getValue()) {
                    this._generatedPredicate$.next(undefined);
                }
                return;
            }
        }

        this._generatedPredicate$.next(this.generatePredicate(this._operandsFormControls.map(fc => this.transformCategoryValue(fc.value))));
    }

    /**
     * @returns the category class in a serializable form
     *
     * @deprecated in 5.6.0 - Category serialisation should be done by utilising the {@link CategoryResolverService} instead
     */
    abstract serializeClass(): Categories | string;

    /**
     * The default implementation serializes only the operator.
     * If the category contains additional configuration, this method must be extended.
     *
     * @returns an object containing all the necessary information for the reconstruction of the configuration of this category instance
     */
    protected createMetadataConfiguration(): CategoryMetadataConfiguration {
        return {
            [Category.OPERATOR_METADATA]: this.selectedOperator.serialize()
        };
    }

    /**
     * The default implementation returns the value of all operand form control objects up to the current number of operands.
     * To serialize value of each operand the [serializeOperandValue()]{@link Category#serializeOperandValue} method is used.
     *
     * If the values used by this category are not serializable, then either this method, or the `serializeOperandValue` method,
     * must be overridden.
     *
     * @returns an array containing values input by the user in a serializable form
     */
    protected createMetadataValues(): Array<unknown> {
        const result = [];
        for (let i = 0; i < this.selectedOperatorArity; i++) {
            result.push(this.serializeOperandValue(this._operandsFormControls[i]));
        }
        return result;
    }

    /**
     * @param valueFormControl FormControl object of one operand
     * @returns the value of the operand in a serialized form. The default implementation returns the FormControls `value` attribute.
     */
    protected serializeOperandValue(valueFormControl: FormControl): unknown {
        return valueFormControl.value;
    }

    /**
     * Restored the saved configuration from the metadata created by the
     * [createMetadataConfiguration()]{@link Category#createMetadataConfiguration} method.
     *
     * The default implementation restores only the saved operator.
     *
     * If the Category overrides the serialization method, it must override this method as well.
     *
     * @param configuration the serialized configuration
     *
     * @returns an Observable. When the Observable emits the category has finished loading its configuration.
     */
    protected loadConfigurationFromMetadata(configuration: CategoryMetadataConfiguration): Observable<void> {
        const resolvedOperator = this._operatorService.getFromMetadata(configuration[Category.OPERATOR_METADATA] as Operators | string);
        this.selectOperator(this.allowedOperators.findIndex(op => op === resolvedOperator));
        return ofVoid();
    }

    /**
     * The default implementation sets the provided values into this Category's operand form controls.
     *
     * An operator must be set before calling this method! Otherwise an error will be thrown.
     *
     * If the number of values doesn't match the arity of the selected operator an error will be thrown!
     *
     * If this Category overrides the [serializeOperandValue()]{@link Category#serializeOperandValue}, it must also
     * override its deserialization counterpart - [deserializeOperandValue()]{@link #Category#deserializeOperandValue}!
     *
     * @param values the serialized values that should be loaded into this Category instance
     *
     * @returns an Observable. When the Observable emits the category has finished loading its values.
     */
    protected loadValuesFromMetadata(values: Array<unknown>): Observable<void> {
        if (!this.isOperatorSelected()) {
            throw new Error('An operator must be selected before Category values can be resolved from metadata!');
        }
        if (this.selectedOperatorArity !== values.length) {
            throw new Error(`The arity of the selected operator (${this.selectedOperatorArity
            }) doesn't match the number of the provided values (${values.length})!`);
        }
        const deserializedValuesObservables = values.map(v => this.deserializeOperandValue(v));
        const result$ = new ReplaySubject<void>(1);
        forkJoin(deserializedValuesObservables).pipe(defaultIfEmpty([] as Array<any>)).subscribe(deserializedValues => {
            this.setOperands(deserializedValues);
            result$.next();
            result$.complete();
        });
        return result$.asObservable();
    }

    /**
     * @param value the serialized output of the [serializeOperandValue()]{@link Category#serializeOperandValue} method
     * @returns an `Observable` that emits the deserialized value, that can be set as FormControl value and then completes
     *
     * This method may throw na error if the value cannot be deserialized.
     */
    protected deserializeOperandValue(value: unknown): Observable<any> {
        return of(value);
    }

    /**
     * @param newValue the value of the `FormControl` object that we want to test
     * @returns `true` if the newly selected value is a valid value, `false` otherwise.
     */
    protected abstract isOperandValueSelected(newValue: any): boolean;

    /**
     * Performs a transformation of the `FormControl` value before passing it into the selected `Operator` for query generation.
     * It is mostly useful only for AutocompleteCategories, where the selected value of the FormControl is an object.
     *
     * The default implementation performs an identity transformation - returns the input.
     * @param value the FormControlValue
     * @returns the value used for query generation
     */
    protected transformCategoryValue(value: any): T {
        return value;
    }

    /**
     * @returns an Array containing text segments representing the content of the predicate generated by this category
     */
    public createFilterTextSegments(): Array<FilterTextSegment> {
        if (!this.providesPredicate) {
            return [];
        }
        return [
            {segment: this.translationPath, bold: this.displayBold},
            ...this.createConfigurationFilterTextSegments(),
            ...this.createOperatorFilterTextSegments()
        ];
    }

    /**
     * @returns an Array containing text segments representing the configuration inputs of this category
     */
    protected abstract createConfigurationFilterTextSegments(): Array<FilterTextSegment>;

    /**
     * @returns an Array containing text segments representing the operators with operands of this category
     */
    protected createOperatorFilterTextSegments(): Array<FilterTextSegment> {
        const result: Array<FilterTextSegment> = [];
        let operandIndex = 0;
        for (const segment of this.selectedOperator.getOperatorNameTemplate()) {
            if (segment === Operator.INPUT_PLACEHOLDER) {
                result.push(this.createOperandFilterTextSegment(operandIndex));
                operandIndex++;
            } else {
                result.push({segment});
            }
        }
        return result;
    }

    /**
     * @returns filter text segment representing the operand value at the specified index
     */
    protected createOperandFilterTextSegment(operandIndex: number): FilterTextSegment {
        let segment;
        const operand = this._operandsFormControls[operandIndex].value;
        switch (this.inputType) {
            case SearchInputType.AUTOCOMPLETE:
                segment = operand.text;
                break;
            case SearchInputType.DATE:
                segment = operand.format(DATE_FORMAT_STRING);
                break;
            case SearchInputType.DATE_TIME:
                segment = operand.format(DATE_TIME_FORMAT_STRING);
                break;
            default:
                segment = operand;
                break;
        }
        return {segment, bold: true};
    }
}
