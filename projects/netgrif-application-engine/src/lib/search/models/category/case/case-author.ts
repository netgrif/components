import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {Observable} from 'rxjs';
import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {UserAutocomplete} from '../user-autocomplete';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {FormControl} from '@angular/forms';
import {Query} from '../../query/query';

export class CaseAuthor extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.case.author';

    private _userAutocomplete: UserAutocomplete;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['author'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseAuthor._i18n}.name`,
            logger,
            operators);
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
            throw new Error('Only unary operators are currently supported by the CaseAuthor implementation');
        }
        return this.selectedOperator.createQuery(this.elasticKeywords, userInput[0], false);
    }

    get inputPlaceholder(): string {
        return `${CaseAuthor._i18n}.placeholder`;
    }

    duplicate(): CaseAuthor {
        return new CaseAuthor(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_AUTHOR;
    }

    protected serializeOperandValue(valueFormControl: FormControl): any {
        return this._userAutocomplete.serializeOperandValue(valueFormControl);
    }

    protected deserializeOperandValue(savedOption: SearchAutocompleteOption<Array<string>>):
        Observable<SearchAutocompleteOption<Array<string>>> {
        return this._userAutocomplete.deserializeOperandValue(savedOption);
    }
}
