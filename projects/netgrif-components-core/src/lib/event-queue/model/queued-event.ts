import {AfterAction} from '../../utility/call-chain/after-action';

/**
 * Wrapper for a scheduled event
 */
export class QueuedEvent {

    /**
     * @param _isRelevant a method that determines if the event is still relevant at the time of its execution.
     * Returns `true` if the event is still relevant (e.g. the set field is still editable). Returns `false` otherwise.
     * @param _execute executes the scheduled event and then performs the provided after action
     * @param _revert reverts the scheduled event and then performs the provided after action
     */
    constructor(protected _isRelevant: () => boolean,
                protected _execute: (afterAction: AfterAction) => void,
                protected _revert: (afterAction: AfterAction) => void = (a) => {
                    a.resolve(true);
                }) {
    }

    /**
     * Executes the event if it is still relevant, or reverts it if it is not.
     * Performs the provided after action, once the event is resolved.
     */
    public resolve(afterAction: AfterAction): void {
        if (this._isRelevant()) {
            this._execute(afterAction);
        } else {
            this._revert(afterAction);
        }
    }
}
