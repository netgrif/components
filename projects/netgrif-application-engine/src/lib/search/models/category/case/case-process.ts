import {Query} from '../../query/query';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {BooleanOperator} from '../../boolean-operator';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';

export class CaseProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.case.process';

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processId'],
            [_operators.getOperator(Equals), _operators.getOperator(NotEquals)],
            `${CaseProcess._i18n}.name`,
            logger);
    }

    protected createOptions(): void {
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                this.addToMap(petriNet.title, petriNet.stringId);
            });
        });
    }

    protected generateQuery(userInput: Array<string>): Query {
        const queries = userInput.map(id => this.selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${CaseProcess._i18n}.placeholder`;
    }

    duplicate(): CaseProcess {
        return new CaseProcess(this._operators, this._log, this._optionalDependencies);
    }
}
