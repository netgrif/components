import {Operator} from './operator';
import moment, {Moment} from 'moment';
import {LessThanEqual} from './less-than-equal';
import {OperatorService} from '../../operator-service/operator.service';
import {Query} from '../query/query';
import {Operators} from './operators';
import {clearTimeInformation} from '../../../utility/clear-time-information';

/**
 * Less or equal than operator for Date fields
 */
export class LessThanEqualDate extends Operator<Moment>{

    protected lessThanEqual: LessThanEqual;

    constructor(operators: OperatorService) {
        super(1);
        this.lessThanEqual = operators.getOperator(LessThanEqual) as LessThanEqual;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg = moment(args[0]);
        clearTimeInformation(arg);
        return this.lessThanEqual.createQuery(elasticKeywords, [arg.valueOf()]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_EQUAL_DATE;
    }

}
