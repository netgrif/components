import {Category} from '../category/category';
import {PredicateWithGenerator} from './predicate-with-generator';
import {EditableElementaryPredicate} from './editable-elementary-predicate';
import {Subject} from 'rxjs';
import {EditablePredicate} from './editable-predicate';

/**
 * An editable predicate wrapper, that can contain a generator of a Predicate.
 *
 * This class is used to transfer editable search predicates added by other means into the search GUI and
 * bind them to the search predicate update notifications.
 */
export class EditablePredicateWithGenerator extends PredicateWithGenerator {

    /**
     * Creates a new `EditablePredicateWithGenerator` instance from a generator.
     *
     * The created wrapped {@link EditablePredicate} instance has no parent notifier set.
     * If you want it to send notifications to a parent predicate you must add it yourself.
     * @param generator the generator generating the predicate
     * @param initiallyVisible whether the predicate is initially visible
     * @returns a new `EditablePredicateWithGenerator` instance, with the predicate set to the predicate generated by the generator.
     * If the generator generates no predicate, it will be set to an empty predicate.
     */
    constructor(generator: Category<any>, initiallyVisible?: boolean) {
        const predicate = new EditableElementaryPredicate(undefined, initiallyVisible);
        if (generator.providesPredicate) {
            predicate.query = generator.generatedPredicate.query;
        }
        super(predicate, generator, initiallyVisible);
    }

    /**
     * Sets the `parentNotifier` on the wrapped {@link EditablePredicate} instance.
     */
    public set parentNotifier(parentNotifier: Subject<void>) {
        this.getWrappedPredicate().parentNotifier = parentNotifier;
    }

    getWrappedPredicate(): EditablePredicate {
        return super.getWrappedPredicate() as EditablePredicate;
    }
}
