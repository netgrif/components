import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {LessThan} from './less-than';
import {Operators} from './operators';
import {MoreThanEqualDate} from "./more-than-equal-date";

/**
 * A strict less than operator for Date fields
 */
export class LessThanDate extends Operator<Moment> {

    protected lessThan: LessThan;

    constructor(protected _operators: OperatorService) {
        super(1, Operators.LESS_THAN_DATE);
        this.lessThan = this._operators.getOperator(LessThan) as LessThan;
    }

    createQuery(pfqlKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        return this.lessThan.createQuery(pfqlKeywords, [arg.format('YYYY-MM-DD')], false, false);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_DATE;
    }

    negated(): Operator<any> {
        return new MoreThanEqualDate(this._operators);
    }
}
