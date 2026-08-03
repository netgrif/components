import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {LessThan} from './less-than';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Operators} from './operators';
import {MoreThanEqualDateTime} from "./more-than-equal-date-time";

/**
 * A strict less than operator for DateTime fields
 */
export class LessThanDateTime extends Operator<Moment> {

    protected lessThan: LessThan;

    constructor(protected _operators: OperatorService) {
        super(1, Operators.LESS_THAN_DATE_TIME);
        this.lessThan = this._operators.getOperator(LessThan) as LessThan;
    }

    createQuery(pfqlKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.milliseconds(0);
        arg.seconds(0);
        return this.lessThan.createQuery(pfqlKeywords, [arg.format('YYYY-MM-DDTHH:mm:ss')], false, false);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_DATE_TIME;
    }

    negated(): Operator<any> {
        return new MoreThanEqualDateTime(this._operators);
    }
}
