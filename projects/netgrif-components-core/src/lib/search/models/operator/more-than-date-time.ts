import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {MoreThan} from './more-than';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * A strict greater than operator for DateTime fields
 */
export class MoreThanDateTime extends Operator<Moment> {

    protected moreThan: MoreThan;

    constructor(operators: OperatorService) {
        super(1);
        this.moreThan = operators.getOperator(MoreThan) as MoreThan;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.milliseconds(0);
        arg.seconds(0);
        arg.minutes(arg.minutes() + 1);
        arg.milliseconds(-1);
        return this.moreThan.createQuery(elasticKeywords, [arg.valueOf()]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN_DATE_TIME;
    }
}
