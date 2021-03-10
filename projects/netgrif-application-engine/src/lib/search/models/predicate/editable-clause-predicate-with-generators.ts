import {EditableClausePredicate} from './editable-clause-predicate';
import {BooleanOperator} from '../boolean-operator';
import {Subject} from 'rxjs';
import {PredicateWithGenerator} from './predicate-with-generator';
import {Predicate} from './predicate';

export class EditableClausePredicateWithGenerators extends EditableClausePredicate {

    protected _predicates: Map<number, PredicateWithGenerator>;

    constructor(operator: BooleanOperator, parentNotifier?: Subject<void>, initiallyVisible = true) {
        super(operator, parentNotifier, initiallyVisible);
        this._metadataGenerator = () => {
            const result = [];
            for (const predicate of this._predicates.values()) {
                const metadata = predicate.createGeneratorMetadata();
                if (metadata !== undefined) {
                    result.push(metadata);
                }
            }
            return result.length > 0 ? result : undefined;
        };
    }

    addNewClausePredicate(operator: BooleanOperator, initiallyVisible = true): number {
        return this.addPredicate(new EditableClausePredicateWithGenerators(operator, this._childUpdated$, initiallyVisible));
    }

    addPredicate(predicate: Predicate, initiallyVisible = true): number {
        return super.addPredicate(new PredicateWithGenerator(predicate, undefined, initiallyVisible));
    }

    /**
     * Adds a pre-wrapped predicate without wrapping it
     * @param predicate the pre-wrapped predicate
     */
    addPredicateWithGenerator(predicate: PredicateWithGenerator): number {
        return super.addPredicate(predicate);
    }

    getPredicateMap(): Map<number, PredicateWithGenerator> {
        return this._predicates;
    }
}
