import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {LessThanEqual} from './less-than-equal';
import {OperatorService} from '../../operator-service/operator.service';
import {Operators} from './operators';
import {Query} from '../query/query';
import {MoreThanDateTime} from "./more-than-date-time";

/**
 * Less or equal than operator for Datetime fields
 */
export class LessThanEqualDateTime extends Operator<Moment> {

    protected lessThanEqual: LessThanEqual;

    constructor(protected _operators: OperatorService) {
        super(1, Operators.LESS_THAN_EQUAL_DATE_TIME);
        this.lessThanEqual = this._operators.getOperator(LessThanEqual) as LessThanEqual;
    }

    createQuery(pfqlKeywords: Array<string>, args: Array<moment.Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.milliseconds(0);
        arg.seconds(0);
        return this.lessThanEqual.createQuery(pfqlKeywords, [arg.format('YYYY-MM-DDTHH:mm:ss')], false, false);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_DATE_TIME;
    }

    negated(): Operator<any> {
        return new MoreThanDateTime(this._operators);
    }
}
