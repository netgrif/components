import {Operator} from './operator';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {MoreThan} from './more-than';
import moment, {Moment} from 'moment';
import {Operators} from './operators';

/**
 * A strict greater than operator for Date fields
 */
export class MoreThanDate extends Operator<Moment> {

    protected moreThan: MoreThan;

    constructor(operators: OperatorService) {
        super(1, Operators.MORE_THAN_DATE);
        this.moreThan = operators.getOperator(MoreThan) as MoreThan;
    }

    createQuery(pfqlKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.date(arg.date() + 1);
        arg.milliseconds(-1);
        return this.moreThan.createQuery(pfqlKeywords, [arg.format('YYYY-MM-DD')], false, false);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN_DATE;
    }
}
