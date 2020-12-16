import {ElementaryPredicate} from './elementary-predicate';
import {Subject} from 'rxjs';
import {Query} from '../query/query';

/**
 * A simple, editable type of `Predicate`. Represents a leaf node in the predicate tree, that can change the `Query` it holds
 * and can notify the parent tree node about changes.
 */
export class EditableElementaryPredicate extends ElementaryPredicate {

    protected _parentNotifier: Subject<void>;

    constructor(parentNotifier?: Subject<void>) {
        super(Query.emptyQuery());
        this._parentNotifier = parentNotifier;
    }

    public set query(query: Query) {
        this._query = query;
        this.notifyParentPredicate();
    }

    /**
     * Notify the parent `Predicate` that this `Predicate` updated its `Query`
     */
    protected notifyParentPredicate(): void {
        if (this._parentNotifier && !this._parentNotifier.isStopped) {
            this._parentNotifier.next();
        }
    }
}
