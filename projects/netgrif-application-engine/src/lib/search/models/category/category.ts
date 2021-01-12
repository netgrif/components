import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {Query} from '../query/query';
import {ElementaryPredicate} from '../predicate/elementary-predicate';
import {SearchInputType} from './search-input-type';
import {FormControl} from '@angular/forms';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {debounceTime, map} from 'rxjs/operators';
import {OperatorTemplatePart} from '../operator-template-part';

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
    protected _operandsFormControls$: ReplaySubject<Array<FormControl>>;

    /**
     * The constructor fills the values of all protected fields and then calls the [initializeCategory()]{@link Category#initializeCategory}
     * method. If you want to override the category creation behavior override that method.
     *
     * @param _elasticKeywords Elasticsearch keywords that should be queried by queries generated with this category
     * @param _allowedOperators Operators that can be used to generated queries on the above keywords
     * @param translationPath path to the translation string
     * @param _inputType input field type that should be used to enter operator arguments for this category
     * @param _log used to record information about incorrect use of this class
     */
    protected constructor(protected readonly _elasticKeywords: Array<string>,
                          protected readonly _allowedOperators: Array<Operator<any>>,
                          public readonly translationPath: string,
                          protected readonly _inputType: SearchInputType,
                          protected _log: LoggerService) {
        this._operatorFormControl = new FormControl();
        this._operandsFormControls$ = new ReplaySubject<Array<FormControl>>(1);
        this._operandsFormControls = [];
        this.initializeCategory();
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
    public abstract get configurationInputs$(): Observable<Array<SearchInputType>>;

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
        return this.operandsFormControls$.pipe(
            map(formControls => {
                if (!formControls) {
                    return undefined;
                }

                const parts = this.selectedOperator.getOperatorNameTemplate();
                const fcs = [...formControls];
                return parts.map(part => new OperatorTemplatePart(part ? part : fcs.shift()));
            })
        );
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
     * @param inputIndex the input index for which the form control should be returned.
     * @returns the FormControl object for the input at the given index.
     */
    public abstract getActiveInputFormControl(inputIndex: number): FormControl;

    /**
     * @param inputIndex the input index for which the stream of filtered autocomplete configuration options should be returned.
     * @returns the stream of filtered autocomplete configuration options at the given index.
     */
    public abstract getFilteredAutocompleteConfigurationOptions(inputIndex: number): Observable<Array<SearchAutocompleteOption>>;

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
     * Resets the state of the Category, deselecting any selected category and removing other state
     * information if the Category defines them.
     *
     * This method can be used to reset the state of the category after each predicate constructed,
     * effectively turning the category instance into a predicate builder.
     */
    public reset(): void {
        this.clearOperatorSelection();
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
            if (!newOperator) {
                this._operandsFormControls$.next(undefined);
                return;
            }

            this._operandsFormControls.forEach(fc => {
                fc.setValue(undefined);
            });

            if (newOperator.numberOfOperands > this._operandsFormControls.length) {
                while (this._operandsFormControls.length < newOperator.numberOfOperands) {
                    const fc = new FormControl();
                    fc.valueChanges.subscribe(v => {
                        this.operandValueChanges(v);
                    });
                    this._operandsFormControls.push(fc);
                }
            }

            this._operandsFormControls$.next(this._operandsFormControls.slice(0, newOperator.numberOfOperands));
        });
    }

    /**
     * The method that is (by default) called whenever an operand `FormControl` changes its value.
     *
     * @param newValue the newly selected value
     */
    protected abstract operandValueChanges(newValue: any): void;
}
