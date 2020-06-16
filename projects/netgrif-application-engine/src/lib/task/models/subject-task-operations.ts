import {TaskOperations} from '../interfaces/task-operations';
import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

/**
 * An implementation of the {@link TaskOperations} interface that provides a Subject for both operations.
 */
export class SubjectTaskOperations implements TaskOperations, OnDestroy {

    private _open: Subject<void>;
    private _close: Subject<void>;

    constructor() {
        this._open = new Subject<void>();
        this._close = new Subject<void>();
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

    public get open$(): Observable<void> {
        return this._open.asObservable();
    }

    public get close$(): Observable<void> {
        return this._close.asObservable();
    }

    /**
     * Completes the underlying streams
     */
    ngOnDestroy(): void {
        this._open.complete();
        this._close.complete();
    }
}

