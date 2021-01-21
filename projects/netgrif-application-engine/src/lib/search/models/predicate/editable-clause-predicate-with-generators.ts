import {EditableClausePredicate} from './editable-clause-predicate';
import {BooleanOperator} from '../boolean-operator';
import {Subject} from 'rxjs';
import {PredicateWithGenerator} from './predicate-with-generator';
import {Predicate} from './predicate';

export class EditableClausePredicateWithGenerators extends EditableClausePredicate {

    protected _predicates: Map<number, PredicateWithGenerator>;

    constructor(operator: BooleanOperator, parentNotifier?: Subject<void>) {
        super(operator, parentNotifier);
    }

    addPredicate(predicate: Predicate): number {
        return super.addPredicate(new PredicateWithGenerator(predicate));
    }

    getPredicateMap(): Map<number, PredicateWithGenerator> {
        return this._predicates;
    }
}
