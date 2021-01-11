import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {hasContent} from '../../../../utility/pagination/page-has-content';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';


export class TaskAssignee extends NoConfigurationAutocompleteCategory<number> {

    private static readonly _i18n = 'search.category.task.assignee';

    private _searchingUsers = false;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [operators.getOperator(Equals)],
            `${TaskAssignee._i18n}.name`,
            logger);
    }

    protected createOptions(): void {
    }

    filterOptions(userInput: Observable<string>): Observable<Array<SearchAutocompleteOption>> {
        return userInput.pipe(
            map(input => {
                if (this._searchingUsers) {
                    return of([]);
                }
                this._searchingUsers = true;
                // TODO 13.5.2020 - Endpoint searches for substrings in name and surname separately
                //  and won't match "Name Surname" string to any result
                //  User search should possibly be delegated to elastic in the future
                return this._optionalDependencies.userResourceService.search({fulltext: userInput}).pipe(
                    tap(() => {
                        this._searchingUsers = false;
                    }),
                    filter(page => hasContent(page)),
                    map(users => users.content.map(
                        user => ({text: user.fullName, value: [user.id], icon: 'account_circle'})
                    ))
                );
            }),
            switchMap(o => o)
        );
    }

    protected generateQuery(userInput: Array<number>): Query {
        return this.selectedOperator.createQuery(this.elasticKeywords, [`${userInput[0]}`]);
    }

    get inputPlaceholder(): string {
        return `${TaskAssignee._i18n}.placeholder`;
    }
}
