import {NetAttributeAutocompleteCategory} from '../net-attribute-autocomplete-category';
import {Operator} from '../../operator/operator';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {CaseProcess} from './case-process';
import {Observable} from 'rxjs';
import {Net} from '../../../../process/net';
import {Category} from '../category';

/**
 * Utility class with the same use as its parent but witch Case search specific methods implemented.
 */
export abstract class CaseNetAttributeAutocompleteCategory extends NetAttributeAutocompleteCategory {

    protected _processCategory: CaseProcess;

    protected constructor(elasticKeywords: Array<string>,
                          allowedOperators: Array<Operator<any>>,
                          translationPath: string,
                          log: LoggerService,
                          protected _optionalDependencies: OptionalDependencies) {
        super(elasticKeywords, allowedOperators, translationPath, log);
        this._processCategory = _optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected getAllowedNets$(): Observable<Array<Net>> {
        return this._optionalDependencies.caseViewService.allowedNets$;
    }

    protected getProcessCategory(): Category<Array<string>> {
        return this._processCategory;
    }

    protected getPetriNetIdentifier(net: Net): string {
        return net.identifier;
    }
}
