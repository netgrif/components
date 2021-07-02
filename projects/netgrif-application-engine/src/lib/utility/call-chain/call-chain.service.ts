import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * A scheduled callback, that accepts a single argument (success or failure of previous step).
 *
 * Use {@link CallChainService} as a utility service to create `AfterAction` instances.
 */
export type AfterAction = Subject<boolean>;

@Injectable({
    providedIn: 'root'
})
export class CallChainService {

    constructor() {
    }

    /**
     * Creates a call chain `Subject` that performs an action when a value is emitted into it.
     *
     * Useful for creating call chains for methods like [assign Task]{@link AssignTaskService#assign}.
     * By using this function you don't have to handle the `Subject` logic and can only focus on the callback.
     * This can make the code easier to understand as the intent is not obscured by the `Subject` handling.
     *
     * @param callback the function that should be executed when a value is emitted into the `Subject`.
     * The emitted value is passed as the argument.
     * @returns a subscribed `Subject` instance that performs the provided `callback` on the first emission and then completes
     */
    public create(callback: (boolean) => void): AfterAction {
        const chain = new Subject<boolean>();
        chain.subscribe(result => {
            callback(result);
            chain.complete();
        });
        return chain;
    }
}
