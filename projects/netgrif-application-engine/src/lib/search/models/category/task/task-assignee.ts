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


export class TaskAssignee extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.assignee';
    private static readonly ICON = 'account_circle';

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals), operators.getOperator(IsNull)],
            `${TaskAssignee._i18n}.name`,
            logger,
            operators);
    }

    protected createOptions(): void {
    }

    filterOptions(userInput: Observable<string | SearchAutocompleteOption<Array<string>>>):
        Observable<Array<SearchAutocompleteOption<Array<string>>>> {

        return userInput.pipe(
            startWith(''),
            debounceTime(600),
            switchMap(input => {
                if (typeof input === 'string') {
                    return this._optionalDependencies.userResourceService.search({fulltext: input}).pipe(
                        map(page => {
                            if (hasContent(page)) {
                                return page.content.map(
                                    user => ({text: user.fullName, value: [user.id], icon: TaskAssignee.ICON})
                                );
                            }
                            return [];
                        })
                    );
                } else {
                    return of([input]);
                }
            })
        );
    }

    protected generateQuery(userInput: Array<Array<string>>): Query {
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error('Only unary operators are currently supported by the TaskAssignee implementation');
        }
        return this.selectedOperator.createQuery(this.elasticKeywords, userInput[0]);
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
