import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Operators} from './operators';
import {LessThanDate} from './less-than-date';

/**
 * Less or equal than operator for Date fields
 */
export class LessThanEqualDate extends Operator<Moment> {

    protected lessThan: LessThanDate;

    constructor(operators: OperatorService) {
        super(1);
        this.lessThan = operators.getOperator(LessThanDate) as LessThanDate;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.date(arg.date() + 1);
        return this.lessThan.createQuery(elasticKeywords, [arg]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_EQUAL_DATE;
    }

}
