import {ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchInputType} from '../models/category/search-input-type';
import {Observable, Subscription} from 'rxjs';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {debounceTime} from 'rxjs/operators';


export class AbstractSearchOperandInputComponent implements OnInit, OnDestroy {

    @Input() inputFormControl: FormControl;
    @Input() inputType: SearchInputType;
    /**
     * Only if the input is of type [AUTOCOMPLETE{@link SearchInputType#AUTOCOMPLETE}
     */
    @Input() filterOptionsFunction: (userInput: Observable<string>) => Observable<Array<SearchAutocompleteOption<unknown>>>;

    protected _inputConfirmed = false;

    private _filteredOptions$: Observable<Array<SearchAutocompleteOption<unknown>>>;

    private _autocompleteChange: Subscription;

    public renderSelection = (selection: SearchAutocompleteOption<unknown>) => this._renderSelection(selection);

    ngOnInit(): void {
        if (this.inputType === SearchInputType.AUTOCOMPLETE) {
            this._autocompleteChange = this.inputFormControl.valueChanges.subscribe(val => {
                setTimeout(() => {
                    this._inputConfirmed = !!val && (typeof val !== 'string');
                });
            });
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

    @ViewChild('operandInput')
    public set categoryInput(input: ElementRef<HTMLInputElement>) {
        if (input) {
            setTimeout(() => {
                input.nativeElement.focus();
            });
        }
    }

    public confirmInput(): void {
        this._inputConfirmed = true;
    }

    public editInput(): void {
        this._inputConfirmed = false;
    }

    /**
     * Autocomplete `displayWith` function
     * @param selection the selected option
     */
    protected _renderSelection(selection: SearchAutocompleteOption<unknown>): string {
        return selection ? selection.text : '';
    }
}
