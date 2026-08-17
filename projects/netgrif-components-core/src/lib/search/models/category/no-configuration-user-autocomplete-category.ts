import {NoConfigurationAutocompleteCategory} from './no-configuration-autocomplete-category';
import {UserAutocomplete} from './user-autocomplete';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {OperatorService} from '../../operator-service/operator.service';
import {OptionalDependencies} from '../../category-factory/optional-dependencies';
import {Observable, of, Subject} from 'rxjs';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {Query} from '../query/query';
import {FormControl} from '@angular/forms';
import {ResourceTypeQueryPrefix} from "./resource-type-query-prefix";
import {take} from "rxjs/operators";
import {SimpleExpression} from "../../../pfql/model/simple-expression";
import {IsNull} from "../operator/is-null";

export abstract class NoConfigurationUserAutocompleteCategory extends NoConfigurationAutocompleteCategory<string> {

    private _userAutocomplete: UserAutocomplete;

    protected constructor(pfqlKeywords: Array<string>, allowedOperators: Array<Operator<any>>,
                          translationPath: string, log: LoggerService, operatorService: OperatorService,
                          private _className, protected _optionalDependencies: OptionalDependencies,
                          resourceTypePrefix: ResourceTypeQueryPrefix) {
        super(pfqlKeywords, allowedOperators, translationPath, log, operatorService, resourceTypePrefix);
        this._userAutocomplete = new UserAutocomplete(this._optionalDependencies);
    }

    protected createOptions(): void {
    }

    filterOptions(userInput: Observable<string | SearchAutocompleteOption<Array<string>>>):
        Observable<Array<SearchAutocompleteOption<Array<string>>>> {

        return this._userAutocomplete.filterOptions(userInput);
    }

    protected generateQuery(userInput: Array<Array<string>>): Query {
        if (this.selectedOperator.numberOfOperands > 1) {
            throw new Error(`Only unary or none operators are currently supported by the ${this._className} implementation`);
        }
        if (this.isSelectedOperator(IsNull)) {
            return (this.selectedOperator as IsNull).createQuery(this.pfqlKeywords)
                .ensurePrefixAndGet(this._resourceTypePrefix);
        } else {
            return this.selectedOperator.createQuery(this.pfqlKeywords, Array.isArray(userInput[0]) ? userInput[0] : userInput, false)
                .ensurePrefixAndGet(this._resourceTypePrefix);
        }
    }

    protected serializeOperandValue(valueFormControl: FormControl): any {
        return this._userAutocomplete.serializeOperandValue(valueFormControl);
    }

    protected deserializeOperandValue(savedOption: SearchAutocompleteOption<Array<string>>):
        Observable<SearchAutocompleteOption<Array<string>>> {
        return this._userAutocomplete.deserializeOperandValue(savedOption);
    }

    public override loadFromPfqlExpression(expression: SimpleExpression): Observable<void> {
        if (!this.selectOperatorFromPfqlExpression(expression)) {
            return of(undefined);
        }
        if (!expression.operandValue) {
            this._generatedPredicate$.next(this.generatePredicate([]))
            return of(undefined);
        }
        const isDone$ = new Subject<void>();
        const optionToBeSelected$ = this._userAutocomplete.getOptionFromExpressionValue$(expression.operandValue);
        optionToBeSelected$.pipe(take(1)).subscribe({
            next: optionToBeSelected => {
                this.setOperands([optionToBeSelected] as any);
                isDone$.next();
                isDone$.complete();
            },
            error: error => {
                isDone$.next();
                isDone$.complete();
            }
        });
        return isDone$.asObservable();
    }
}
