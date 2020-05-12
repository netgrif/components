import {AutocompleteCategory} from '../autocomplete-category';
import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {User} from '../../../../resources/interface/user';
import {Query} from '../../query/query';


export class TaskAssignee extends AutocompleteCategory<User> {

    private static readonly _i18n = 'search.category.task.assignee';
    protected _options: Array<SearchAutocompleteOption> = [];

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [operators.getOperator(Equals)],
            `${TaskAssignee._i18n}.name`,
            logger);
    }

    protected createOptions(): void {
        this._optionalDependencies.userResourceService.getAll().subscribe(users => {
            this._options = users.map(user => ({text: user.fullName, value: [user]}));
        });
    }

    get options(): Array<SearchAutocompleteOption> {
        return this._options.slice();
    }

    filterOptions(userInput: string): Array<SearchAutocompleteOption> {
        const value = userInput.toLocaleLowerCase();
        return this.options.filter(option => {
            return option.text.toLocaleLowerCase().includes(value) || option.value[0].email.includes(value);
        });
    }

    protected generateQuery(userInput: Array<User>): Query {
        return this._selectedOperator.createQuery(this.elasticKeywords, [`${userInput[0].id}`]);
    }

    get inputPlaceholder(): string {
        return `${TaskAssignee._i18n}.placeholder`;
    }
}
