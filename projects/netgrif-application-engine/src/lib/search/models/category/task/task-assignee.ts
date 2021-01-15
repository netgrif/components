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
import {NotEquals} from '../../operator/not-equals';
import {IsNull} from '../../operator/is-null';


export class TaskAssignee extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.assignee';

    private _searchingUsers = false;

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [_operators.getOperator(Equals), _operators.getOperator(NotEquals), _operators.getOperator(IsNull)],
            `${TaskAssignee._i18n}.name`,
            logger);
    }

    protected createOptions(): void {
    }

    filterOptions(userInput: Observable<string>): Observable<Array<SearchAutocompleteOption<Array<string>>>> {
        return userInput.pipe(
            map(input => {
                if (this._searchingUsers) {
                    return of([]);
                }
                this._searchingUsers = true;
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

    protected generateQuery(userInput: Array<Array<string>>): Query {
        return this.selectedOperator.createQuery(this.elasticKeywords, userInput[0]);
    }

    get inputPlaceholder(): string {
        return `${TaskAssignee._i18n}.placeholder`;
    }

    duplicate(): TaskAssignee {
        return new TaskAssignee(this._operators, this._log, this._optionalDependencies);
    }
}
