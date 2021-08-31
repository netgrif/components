import {Operator} from './operator';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Moment} from 'moment';
import {Operators} from './operators';
import {EqualsDateTime} from './equals-date-time';

export class NotEqualsDateTime extends Operator<Moment> {

    protected equals: EqualsDateTime;

    constructor(operators: OperatorService) {
        super(1);
        this.equals = operators.getOperator(EqualsDateTime) as EqualsDateTime;
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
        return Operators.NOT_EQUALS_DATE_TIME;
    }
}
