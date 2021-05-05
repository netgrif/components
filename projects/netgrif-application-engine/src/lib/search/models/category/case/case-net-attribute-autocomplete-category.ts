import {NetAttributeAutocompleteCategory} from '../net-attribute-autocomplete-category';
import {Operator} from '../../operator/operator';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {CaseProcess} from './case-process';
import {Net} from '../../../../process/net';
import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';

/**
 * Utility class with the same use as its parent but witch Case search specific methods implemented.
 */
export abstract class CaseNetAttributeAutocompleteCategory extends NetAttributeAutocompleteCategory {

    protected _processCategory: CaseProcess;

    protected constructor(elasticKeywords: Array<string>,
                          allowedOperators: Array<Operator<any>>,
                          translationPath: string,
                          log: LoggerService,
                          operatorService: OperatorService,
                          optionalDependencies: OptionalDependencies) {
        super(elasticKeywords, allowedOperators, translationPath, log, operatorService, optionalDependencies);
        this._processCategory = optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();
    }

    destroy() {
        super.destroy();
        this._processCategory.destroy();
    }

    protected getProcessCategory(): Category<Array<string>> {
        return this._processCategory;
    }

    protected getPetriNetIdentifier(net: Net): string {
        return net.identifier;
    }
}
