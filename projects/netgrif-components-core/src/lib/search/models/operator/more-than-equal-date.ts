import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {OperatorService} from '../../operator-service/operator.service';
import {MoreThanEqual} from './more-than-equal';
import {Operators} from './operators';
import {Query} from '../query/query';
import {LessThanDate} from "./less-than-date";

/**
 * Greater or equal than operator for Date fields
 */
export class MoreThanEqualDate extends Operator<Moment> {

    protected moreThanEqual: MoreThanEqual;

    constructor(protected _operators: OperatorService) {
        super(1, Operators.MORE_THAN_EQUAL_DATE);
        this.moreThanEqual = this._operators.getOperator(MoreThanEqual) as MoreThanEqual;
    }

    createQuery(pfqlKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        return this.moreThanEqual.createQuery(pfqlKeywords, [arg.format('YYYY-MM-DD')], false, false);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN_EQUAL_DATE;
    }

    negated(): Operator<any> {
        return new LessThanDate(this._operators);
    }
}
