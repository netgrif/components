import {TaskListOperations} from '../interfaces/task-list-operations';
import {OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * An implementation for the {@link TaskListOperations} interface that provides a Subject for the function call.
 */
export class SubjectTaskListOperations implements TaskListOperations, OnDestroy {

    private _reloadPage: Subject<void>;

    constructor() {
        this._reloadPage = new Subject<void>();
    }

    /**
     * Emits into the [reloadPage$]{@link SubjectTaskListOperations#reloadPage$} stream.
     */
    reloadPage(): void {
        this._reloadPage.next();
    }

    public get reloadPage$(): Observable<void> {
        return this._reloadPage.asObservable();
    }

    /**
     * Completes the underlying stream
     */
    ngOnDestroy(): void {
        this._reloadPage.complete();
    }
}
