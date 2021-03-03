import {Injectable, OnDestroy} from '@angular/core';
import {LoadingEmitter} from '../../utility/loading-emitter';

/**
 * This service is used to signal to inputs in advanced search components, whether they should autofocus, or not.
 *
 * The inputs should autofocus, when the user interacts with them, but should not auto focus if the first empty predicate is created on
 * advanced search component initialization.
 */
@Injectable()
export class AdvancedSearchComponentInitializationService implements OnDestroy {

    protected _initialized: LoadingEmitter;

    constructor() {
        this._initialized = new LoadingEmitter(false);
    }

    ngOnDestroy(): void {
        this._initialized.complete();
    }

    /**
     * @returns `false` until the [completeInitialization()]{@link AdvancedSearchComponentInitializationService#completeInitialization}
     * method is called. Returns `true` afterwards.
     */
    public get isInitialized(): boolean {
        return this._initialized.isActive;
    }

    /**
     * Changes the state to `initialized`.
     */
    public completeInitialization(): void {
        this._initialized.on();
    }
}
