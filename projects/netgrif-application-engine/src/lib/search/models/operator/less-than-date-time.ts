import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {LessThan} from './less-than';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * A strict less than operator for DateTime fields
 */
export class LessThanDateTime extends Operator<Moment> {

    protected lessThan: LessThan;

    constructor(operators: OperatorService) {
        super(1);
        this.lessThan = operators.getOperator(LessThan) as LessThan;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.milliseconds(0);
        arg.seconds(0);
        return this.lessThan.createQuery(elasticKeywords, [arg.valueOf()]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_DATE_TIME;
    }
}
