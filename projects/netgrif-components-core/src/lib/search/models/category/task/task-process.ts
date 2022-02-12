import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {Subscription} from 'rxjs';

export class TaskProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.process';

    private _allowedNetsSub: Subscription;
    private _destroyed: boolean;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${TaskProcess._i18n}.name`,
            logger,
            operators);
    }

    destroy() {
        super.destroy();
        if (this._allowedNetsSub && !this._allowedNetsSub.closed) {
            this._allowedNetsSub.unsubscribe();
        }
        this._destroyed = true;
    }

    protected createOptions(): void {
        if (this._destroyed) {
            return;
        }

        this._allowedNetsSub = this._optionalDependencies.allowedNetsService.allowedNets$.subscribe(allowedNets => {
            this._optionsMap.clear();
            allowedNets.forEach(petriNet => {
                this.addToMap(petriNet.title, petriNet.stringId);
            });
            this.updateOptions();
        });
    }

    protected generateQuery(userInput: Array<Array<string>>): Query {
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error('Only unary operators are currently supported by the TaskProcess implementation');
        }
        const operand = userInput[0];
        const queries = operand.map(id => this.selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${TaskProcess._i18n}.placeholder`;
    }

    duplicate(): TaskProcess {
        return new TaskProcess(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_PROCESS;
    }
}
