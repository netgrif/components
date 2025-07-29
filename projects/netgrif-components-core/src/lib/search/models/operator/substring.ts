import {Operator} from './operator';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * Operator that matches if the input is a substring of some value.
 * Can only be used on fields that are texts and are not indexed as keywords.
 */
export class Substring extends Operator<string> {
    constructor() {
        super(1);
    }

    createQuery(elasticKeywords: Array<string>, args: Array<string>): Query {
        this.checkArgumentsCount(args);
        // TODO IMPROVEMENT 27.4.2020 - we could use regular expressions to search for substrings which would solve the unintuitive
        //  behavior that occurs when we search for strings that contain spaces. We need to escape the input string in a special way
        //  if we choose to do this
        const escapedValue = Operator.escapeInput(args[0]).value?.replace(/ /g, '\\ ');
        return Operator.forEachKeyword(elasticKeywords, keyword => new Query(`(${keyword}:*${escapedValue}*)`));
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.substring', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.SUBSTRING;
    }
}
