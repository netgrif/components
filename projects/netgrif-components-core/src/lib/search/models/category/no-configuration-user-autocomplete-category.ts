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

export abstract class NoConfigurationUserAutocompleteCategory extends NoConfigurationAutocompleteCategory<string> {

    private _userAutocomplete: UserAutocomplete;

    protected constructor(elasticKeywords: Array<string>, allowedOperators: Array<Operator<any>>,
                          translationPath: string, log: LoggerService, operatorService: OperatorService,
                          private _className, protected _optionalDependencies: OptionalDependencies) {
        super(elasticKeywords, allowedOperators, translationPath, log, operatorService);
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
        return this.selectedOperator.createQuery(this.elasticKeywords, Array.isArray(userInput[0]) ? userInput[0] : userInput, false);
    }

    protected serializeOperandValue(valueFormControl: FormControl): any {
        return this._userAutocomplete.serializeOperandValue(valueFormControl);
    }

    protected deserializeOperandValue(savedOption: SearchAutocompleteOption<Array<string>>):
        Observable<SearchAutocompleteOption<Array<string>>> {
        return this._userAutocomplete.deserializeOperandValue(savedOption);
    }
}
