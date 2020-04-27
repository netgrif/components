import {Injectable, Type} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {OperatorService} from '../operator-service/operator.service';
import {Category} from '../models/category/category';

/**
 * Can be used to generate {@link Category} class instances.
 *
 * Can only generate instances of Categories that take {@link OperatorService} as their first argument and {@link LoggerService} as their
 * second argument. You can extend this class to support your Categories, but make sure that an injection token for this classes name
 * is still provided for the library components that use it.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryFactoryService {

  constructor(protected _operators: OperatorService, protected _log: LoggerService) { }

    /**
     * Create an instance of {@link Category} class.
     * @param categoryClass the class that should be instantiated
     * @returns a new instance of the provided class
     */
  public get(categoryClass: Type<Category>): Category {
      return new categoryClass(this._operators, this._log);
  }
}
