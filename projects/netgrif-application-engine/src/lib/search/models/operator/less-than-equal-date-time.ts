import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {LessThanEqual} from './less-than-equal';
import {OperatorService} from '../../operator-service/operator.service';
import {Operators} from './operators';
import {Query} from '../query/query';

/**
 * Greater or equal than operator for Datetime fields
 */
export class LessThanEqualDateTime extends Operator<Moment> {

    protected lessThanEqual: LessThanEqual;

    constructor(operators: OperatorService) {
        super(1);
        this.lessThanEqual = operators.getOperator(LessThanEqual) as LessThanEqual;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<moment.Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        arg.milliseconds(0);
        arg.seconds(0);
        return this.lessThanEqual.createQuery(elasticKeywords, [arg.valueOf()]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_DATE_TIME;
    }


}
