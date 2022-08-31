import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchInputType} from '../models/category/search-input-type';
import {Observable, Subscription} from 'rxjs';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'ncc-abstract-search-operand-input',
    template: ''
})
export abstract class AbstractSearchOperandInputComponent implements OnInit, OnDestroy {

    /**
     * Whether the contents displayed in this component can be edited by the user or not.
     *
     * Defaults to `true`
     */
    @Input() editable = true;
    @Input() inputFormControl: FormControl;
    @Input() inputType: SearchInputType;
    @Input() first: boolean;
    /**
     * Only if the input is of type [AUTOCOMPLETE{@link SearchInputType#AUTOCOMPLETE}
     */
    @Input() filterOptionsFunction: (userInput: Observable<string>) => Observable<Array<SearchAutocompleteOption<unknown>>>;

    protected _inputConfirmed = false;

    private _filteredOptions$: Observable<Array<SearchAutocompleteOption<unknown>>>;

    private _autocompleteChange: Subscription;

    private _initialExpansion = true;

    public renderSelection = (selection: SearchAutocompleteOption<unknown>) => this._renderSelection(selection);

    ngOnInit(): void {
        if (this.inputType === SearchInputType.AUTOCOMPLETE) {
            this._autocompleteChange = this.inputFormControl.valueChanges.subscribe(val => {
                setTimeout(() => {
                    this._inputConfirmed = !!val && (typeof val !== 'string');
                });
            });
        }

        if (this.isInputValueSet()) {
            this._inputConfirmed = true;
        }
    }

    ngOnDestroy(): void {
        if (this._autocompleteChange && !this._autocompleteChange.closed) {
            this._autocompleteChange.unsubscribe();
        }
    }

    public get filteredOptions$(): Observable<Array<SearchAutocompleteOption<unknown>>> {
        if (!this._filteredOptions$) {
            this._filteredOptions$ = this.filterOptionsFunction(this.inputFormControl.valueChanges.pipe(debounceTime(600)));
        }
        return this._filteredOptions$;
    }

    public get isInputFilled(): boolean {
        if (!this._inputConfirmed) {
            return false;
        }

        return this.isInputValueSet();
    }

    @ViewChild('operandInput')
    public set categoryInput(input: ElementRef<HTMLInputElement>) {
        if (input) {
            if (!this.first && this._initialExpansion) {
                this._initialExpansion = false;
                return;
            }
            this._initialExpansion = false;

            if (!this.isInputFilled) {
                setTimeout(() => {
                    input.nativeElement.focus();
                });
            }
        }
    }

    public confirmInput(): void {
        this._inputConfirmed = true;
    }

    public editInput(): void {
        if (!this.editable) {
            return;
        }

        this._inputConfirmed = false;
    }

    /**
     * Autocomplete `displayWith` function
     * @param selection the selected option
     */
    protected _renderSelection(selection: SearchAutocompleteOption<unknown>): string {
        return selection ? selection.text : '';
    }

    protected isInputValueSet(): boolean {
        if (this.inputType === SearchInputType.AUTOCOMPLETE) {
            return !!this.inputFormControl.value
                && (typeof this.inputFormControl.value !== 'string');
        }
        if (this.inputType === SearchInputType.TEXT) {
            return this.inputFormControl.value !== undefined
                && this.inputFormControl.value !== null
                && this.inputFormControl.value.length > 0;
        }
        return this.inputFormControl.value !== undefined
            && this.inputFormControl.value !== null;
    }
}
