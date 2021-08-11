import {Operator} from './operator';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {EqualsDate} from './equals-date';
import {Moment} from 'moment';
import {Operators} from './operators';

/**
 * Inequality operator for Date fields. Will match if the field has a date with different day than the provided date.
 */
export class NotEqualsDate extends Operator<Moment> {

    protected equals: EqualsDate;

    constructor(operators: OperatorService) {
        super(1);
        this.equals = operators.getOperator(EqualsDate) as EqualsDate;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
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
        return Operators.NOT_EQUALS_DATE;
    }
}
