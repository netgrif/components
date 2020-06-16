import {Injectable} from '@angular/core';
import {LoadingEmitter} from '../../utility/loading-emitter';

/**
 * Holds information about the state of backend requests regarding a single {@link Task} instance.
 *
 * This Service is used by many other Services that handle the necessary logic for working with a single Task on frontend.
 */
@Injectable()
export class TaskRequestStateService {

    protected _loading: LoadingEmitter;
    protected _updating: LoadingEmitter;

    constructor() {
        this._loading = new LoadingEmitter();
        this._updating = new LoadingEmitter();
    }

    /**
     * @returns whether the task is currently loading
     */
    public get isLoading(): boolean {
        return this._loading.isActive;
    }

    /**
     * Changes the state of the loading indicator to `true`
     */
    public startLoading(): void {
        this._loading.on();
    }

    /**
     * Changes the state of the loading indicator to `false`
     */
    public stopLoading(): void {
        this._loading.off();
    }

    /**
     * @returns whether the task is currently updating it's data fields
     */
    public get isUpdating(): boolean {
        return this._updating.isActive;
    }

    /**
     * Changes the state of the updating indicator to `true`
     */
    public startUpdating(): void {
        this._updating.on();
    }

    /**
     * Changes the state of the updating indicator to `false`
     */
    public stopUpdating(): void {
        this._updating.off();
    }
}
