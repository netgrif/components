import {TaskOperations} from '../interfaces/task-operations';
import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

/**
 * An implementation of the {@link TaskOperations} interface that provides a Subject for both operations.
 */
export class SubjectTaskOperations implements TaskOperations, OnDestroy {

    protected _open: Subject<void>;
    protected _close: Subject<void>;
    protected _reload: Subject<void>;

    constructor() {
        this._open = new Subject<void>();
        this._close = new Subject<void>();
        this._reload = new Subject<void>();
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

    public get open$(): Observable<void> {
        return this._open.asObservable();
    }

    public get close$(): Observable<void> {
        return this._close.asObservable();
    }

    public get reload$(): Observable<void> {
        return this._reload.asObservable();
    }

    /**
     * Completes the underlying streams
     */
    ngOnDestroy(): void {
        this._open.complete();
        this._close.complete();
        this._reload.complete();
    }
}

