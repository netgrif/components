import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {MoreThanEqual} from './more-than-equal';
import {OperatorService} from '../../operator-service/operator.service';
import {Operators} from './operators';
import {Query} from '../query/query';

/**
 * Greater or equal than operator for Datetime fields
 */
export class MoreThanEqualDateTime extends Operator<Moment> {

    protected moreThanEqual: MoreThanEqual;

    constructor(operators: OperatorService) {
        super(1);
        this.moreThanEqual = operators.getOperator(MoreThanEqual) as MoreThanEqual;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<moment.Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.milliseconds(0);
        arg.seconds(0);
        return this.moreThanEqual.createQuery(elasticKeywords, [arg.valueOf()]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN_EQUAL_DATE_TIME;
    }


}
