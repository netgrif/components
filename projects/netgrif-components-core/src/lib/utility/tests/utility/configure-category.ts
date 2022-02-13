import {OperatorService} from '../../../search/operator-service/operator.service';
import {Category} from '../../../search/models/category/category';
import {Type} from '@angular/core';
import {Operator} from '../../../search/models/operator/operator';

/**
 * Configures the provided {@link Category} instance with the provided operator and operands.
 *
 * @param category the object that should be configured
 * @param operatorService must be the same {@link OperatorService} instance as the one provided to the category's constructor
 * @param operator the desired operator class, must be one of the available operators for the provided category
 * @param operands the desired operands
 */
export function configureCategory(category: Category<unknown>,
                                  operatorService: OperatorService,
                                  operator: Type<Operator<any>>,
                                  operands: Array<unknown>): void {
    const op = operatorService.getOperator(operator);
    category.selectOperator(category.allowedOperators.findIndex(o => o === op));
    category.setOperands(operands);
}
