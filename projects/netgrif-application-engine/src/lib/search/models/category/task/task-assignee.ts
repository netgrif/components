import {AutocompleteCategory} from '../autocomplete-category';
import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';


export class TaskAssignee extends AutocompleteCategory<number> {

    private static readonly _i18n = 'search.category.task.assignee';

    private _searchingUsers = false;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [operators.getOperator(Equals)],
            `${TaskAssignee._i18n}.name`,
            logger);
    }

    protected createOptions(): void {}

    filterOptions(userInput: string): Observable<Array<SearchAutocompleteOption>> {
        if (this._searchingUsers) {
            return of([]);
        }
        this._searchingUsers = true;
        // TODO 13.5.2020 - Endpoint searches for substrings in name and surname separately, won't match "Name Surname" string to any result
        //  User search should possibly be delegated to elastic in the future
        return this._optionalDependencies.userResourceService.search({fulltext: userInput}).pipe(
            tap(() => {
                this._searchingUsers = false;
            }),
            filter(result => Array.isArray(result)),
            map(users => users.map(
                user => ({text: user.fullName, value: [user.id], icon: 'account_circle'})
            ))
        );
    }

    protected generateQuery(userInput: Array<number>): Query {
        return this._selectedOperator.createQuery(this.elasticKeywords, [`${userInput[0]}`]);
    }

    get inputPlaceholder(): string {
        return `${TaskAssignee._i18n}.placeholder`;
    }
}
