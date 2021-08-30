import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {OperatorService} from '../../operator-service/operator.service';
import {MoreThanEqual} from './more-than-equal';
import {Operators} from './operators';
import {Query} from '../query/query';
import {clearTimeInformation} from '../../../utility/clear-time-information';

/**
 * Greater or equal than operator for Date fields
 */
export class MoreThanEqualDate extends Operator<Moment> {

    protected moreThanEqual: MoreThanEqual;

    constructor(operators: OperatorService) {
        super(1);
        this.moreThanEqual = operators.getOperator(MoreThanEqual) as MoreThanEqual;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        clearTimeInformation(arg);
        return this.moreThanEqual.createQuery(elasticKeywords, [arg.valueOf()]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN_EQUAL_DATE;
    }

}
