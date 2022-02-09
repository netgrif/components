import {Subject} from 'rxjs';
import {Query} from '../query/query';
import {EditablePredicate} from './editable-predicate';

/**
 * A simple, editable type of `Predicate`. Represents a leaf node in the predicate tree, that can change the `Query` it holds
 * and can notify the parent tree node about changes.
 */
export class EditableElementaryPredicate extends EditablePredicate {

    protected _query: Query;

    constructor(parentNotifier?: Subject<void>, initiallyVisible = true) {
        super(parentNotifier, initiallyVisible);
        this._query = Query.emptyQuery();
    }

    get query(): Query {
        return this._query;
    }

    set query(query: Query) {
        this._query = query;
        this.notifyParentPredicate();
    }
}
