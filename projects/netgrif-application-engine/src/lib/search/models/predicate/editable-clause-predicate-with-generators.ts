import {EditableClausePredicate} from './editable-clause-predicate';
import {BooleanOperator} from '../boolean-operator';
import {Subject} from 'rxjs';
import {PredicateWithGenerator} from './predicate-with-generator';
import {Predicate} from './predicate';
import {Category} from '../category/category';
import {EditablePredicateWithGenerator} from './editable-predicate-with-generator';

export class EditableClausePredicateWithGenerators extends EditableClausePredicate {

    protected _predicates: Map<number, PredicateWithGenerator>;

    constructor(operator: BooleanOperator, parentNotifier?: Subject<void>, initiallyVisible = true, bracketSubPredicateText = false) {
        super(operator, parentNotifier, initiallyVisible, bracketSubPredicateText);
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
     * Creates a new editable predicate from the provided generator {@link Category} instance,
     * connects it to the update notifications stream and adds it to the predicate subtree.
     * @param generator
     * @param initiallyVisible
     */
    addNewPredicateFromGenerator(generator: Category<any>, initiallyVisible = true): number {
        const predicate = new EditablePredicateWithGenerator(generator, initiallyVisible);
        predicate.parentNotifier = this._childUpdated$;
        return super.addPredicate(predicate);
    }

    getPredicateMap(): Map<number, PredicateWithGenerator> {
        return this._predicates;
    }

    /**
     * Cleans-up the inner state of this object
     */
    destroy(): void {
        for (const predicate of this._predicates.values()) {
            predicate.destroy();
        }
    }
}
