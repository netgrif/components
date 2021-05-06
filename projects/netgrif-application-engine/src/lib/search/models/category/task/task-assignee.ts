import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {Observable, of} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {hasContent} from '../../../../utility/pagination/page-has-content';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';
import {IsNull} from '../../operator/is-null';
import {Categories} from '../categories';
import {FormControl} from '@angular/forms';
import {UserAutocomplete} from '../user-autocomplete';


export class TaskAssignee extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.assignee';
    private static readonly ICON = 'account_circle';

    private _userAutocomplete: UserAutocomplete;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals), operators.getOperator(IsNull)],
            `${TaskAssignee._i18n}.name`,
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
            throw new Error('Only unary operators are currently supported by the TaskAssignee implementation');
        }
        return this.selectedOperator.createQuery(this.elasticKeywords, userInput[0], false);
    }

    get inputPlaceholder(): string {
        return `${TaskAssignee._i18n}.placeholder`;
    }

    duplicate(): TaskAssignee {
        return new TaskAssignee(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_ASSIGNEE;
    }

    protected serializeOperandValue(valueFormControl: FormControl): any {
        const autocompleteValue = valueFormControl.value as SearchAutocompleteOption<Array<string>>;
        return {text: autocompleteValue.text, value: autocompleteValue.value};
    }

    protected deserializeOperandValue(savedOption: SearchAutocompleteOption<Array<string>>):
        Observable<SearchAutocompleteOption<Array<string>>> {
        return of({...savedOption, icon: TaskAssignee.ICON});
    }
}
