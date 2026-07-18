import {NoConfigurationAutocompleteCategory} from './no-configuration-autocomplete-category';
import {UserAutocomplete} from './user-autocomplete';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {OperatorService} from '../../operator-service/operator.service';
import {OptionalDependencies} from '../../category-factory/optional-dependencies';
import {Observable} from 'rxjs';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {Query} from '../query/query';
import {FormControl} from '@angular/forms';
import {ResourceTypeQueryPrefix} from "./resource-type-query-prefix";

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
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error(`Only unary operators are currently supported by the ${this._className} implementation`);
        }
        return this.selectedOperator.createQuery(this.pfqlKeywords, Array.isArray(userInput[0]) ? userInput[0] : userInput, false)
            .addPrefixAndGet(this._resourceTypePrefix);
    }

    protected serializeOperandValue(valueFormControl: FormControl): any {
        return this._userAutocomplete.serializeOperandValue(valueFormControl);
    }

    protected deserializeOperandValue(savedOption: SearchAutocompleteOption<Array<string>>):
        Observable<SearchAutocompleteOption<Array<string>>> {
        return this._userAutocomplete.deserializeOperandValue(savedOption);
    }
}
