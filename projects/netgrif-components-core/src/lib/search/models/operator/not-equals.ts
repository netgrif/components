import {Operator} from './operator';
import {Equals} from './equals';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * Inequality operator. Will match if the field has a different value than the input.
 * Can be used with keyword fields and different types. We don't recommend using this operator with date and datetime fields
 * as an exact timestamp mismatch would be required.
 * For Date needs use {@link NotEqualsDate} instead.
 */
export class NotEquals extends Operator<string | number> {

    protected equals: Equals;

    constructor(operators: OperatorService) {
        super(1);
        this.equals = operators.getOperator(Equals) as Equals;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<string | number>): Query {
        const equalsQuery = this.equals.createQuery(elasticKeywords, args);
        if (equalsQuery.isEmpty) {
            return equalsQuery;
        }
        return new Query(`(!${equalsQuery.value})`);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.notEquals', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.NOT_EQUALS;
    }
}
