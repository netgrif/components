import {Injectable, Optional, Type} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {OperatorService} from '../operator-service/operator.service';
import {Category} from '../models/category/category';
import {CaseViewService} from '../../view/case-view/case-view-service';
import {OptionalDependencies} from './optional-dependencies';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';

/**
 * Can be used to generate {@link Category} class instances.
 *
 * Can only generate instances of Categories that take {@link OperatorService} as their first argument, {@link LoggerService} as their
 * second argument and {@link OptionalDependencies} object is passed as the third. `null` is passed as the third argument otherwise.
 * You can extend this class to support your Categories, but make sure that an injection token for this classes name
 * is still provided for the library components that use it.
 */
@Injectable()
export class CategoryFactory {

    protected _optionalDependencies: OptionalDependencies;

    constructor(protected _operators: OperatorService,
                protected _log: LoggerService,
                @Optional() protected _caseViewService: CaseViewService,
                @Optional() protected _userResourceService: UserResourceService) {
        this._optionalDependencies = {
            caseViewService: this._caseViewService,
            categoryFactory: this,
            userResourceService: this._userResourceService,
        };
    }

    /**
     * Create an instance of {@link Category} class.
     * @param categoryClass the class that should be instantiated
     * @returns a new instance of the provided class
     */
    public get(categoryClass: Type<Category<any>>): Category<any> {
        return new categoryClass(this._operators, this._log, this._optionalDependencies);
    }
}
