import {TaskOperations} from '../interfaces/task-operations';
import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

/**
 * An implementation of the {@link TaskOperations} interface that provides a Subject for both operations.
 */
export class SubjectTaskOperations implements TaskOperations {

    protected _open: Subject<void>;
    protected _close: Subject<void>;
    protected _reload: Subject<void>;
    protected _forceReload: Subject<void>;

    constructor() {
        this._open = new Subject<void>();
        this._close = new Subject<void>();
        this._reload = new Subject<void>();
        this._forceReload = new Subject<void>();
    }

    /**
     * Emits into the [open$]{@link SubjectTaskOperations#open$} stream.
     */
    open(): void {
        this._open.next();
    }

    /**
     * Emits into the [close$]{@link SubjectTaskOperations#close$} stream.
     */
    close(): void {
        this._close.next();
    }

    /**
     * Emits into the [reload$]{@link SubjectTaskOperations#reload$} stream.
     */
    reload(): void {
        this._reload.next();
    }

    /**
     * Emits into the [forceReload$]{@link SubjectTaskOperations#forceReload$} stream.
     */
    forceReload(): void {
        this._forceReload.next();
    }

    public get open$(): Observable<void> {
        return this._open.asObservable();
    }

    public get close$(): Observable<void> {
        return this._close.asObservable();
    }

    public get reload$(): Observable<void> {
        return this._reload.asObservable();
    }

    public get forceReload$(): Observable<void> {
        return this._forceReload.asObservable();
    }

    /**
     * Completes the underlying streams
     */
    destroy(): void {
        this._open.complete();
        this._close.complete();
        this._reload.complete();
        this._forceReload.complete();
    }
}

