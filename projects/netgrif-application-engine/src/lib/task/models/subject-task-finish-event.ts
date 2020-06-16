import {TaskFinishEvent} from '../interfaces/task-finish-event';
import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

/**
 * An implementation for the {@link TaskFinishEvent} interface that provides a Subject for the function call.
 */
export class SubjectTaskFinishEvent implements TaskFinishEvent, OnDestroy {

    private _finish: Subject<void>;

    constructor() {
        this._finish = new Subject<void>();
    }

    /**
     * Emits into the [finish$]{@link SubjectTaskFinishEvent#finish$} stream.
     */
    finish(): void {
        this._finish.next();
    }

    public get finish$(): Observable<void> {
        return this._finish.asObservable();
    }

    /**
     * Completes the underlying stream
     */
    ngOnDestroy(): void {
        this._finish.complete();
    }

}
