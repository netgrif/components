import {NetAttributeAutocompleteCategory} from '../net-attribute-autocomplete-category';
import {Operator} from '../../operator/operator';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Observable} from 'rxjs';
import {Net} from '../../../../process/net';
import {Category} from '../category';
import {TaskProcess} from './task-process';

/**
 * Utility class with the same use as its parent but witch Task search specific methods implemented.
 */
export abstract class TaskNetAttributeAutocompleteCategory extends NetAttributeAutocompleteCategory {
    protected _processCategory: TaskProcess;

    protected constructor(elasticKeywords: Array<string>,
                          allowedOperators: Array<Operator<any>>,
                          translationPath: string,
                          log: LoggerService,
                          protected _optionalDependencies: OptionalDependencies) {
        super(elasticKeywords, allowedOperators, translationPath, log);
        this._processCategory = _optionalDependencies.categoryFactory.get(TaskProcess) as TaskProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected getAllowedNets$(): Observable<Array<Net>> {
        return this._optionalDependencies.taskViewService.allowedNets$;
    }

    protected getProcessCategory(): Category<Array<string>> {
        return this._processCategory;
    }
}