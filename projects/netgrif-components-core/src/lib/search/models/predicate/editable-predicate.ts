import {Predicate} from './predicate';
import {Subject} from 'rxjs';

/**
 * Base class for editable predicates that allows them to notify their parent predicate tree nodes about updates to their queries.
 */
export abstract class EditablePredicate extends Predicate {

    protected _parentNotifier: Subject<void>;

    protected constructor(parentNotifier?: Subject<void>, initiallyVisible = true) {
        super(initiallyVisible);
        this._parentNotifier = parentNotifier;
    }

    /**
     * Notify the parent `Predicate` that this `Predicate` updated its `Query`
     */
    protected notifyParentPredicate(): void {
        if (this._parentNotifier && !this._parentNotifier.isStopped) {
            this._parentNotifier.next();
        }
    }

    public set parentNotifier(parentNotifier: Subject<void>) {
        this._parentNotifier = parentNotifier;
    }

    public destroy() {
        this._parentNotifier.complete();
    }
}
