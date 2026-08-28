import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionClearService implements OnDestroy {

    private readonly _sessionCleared$: Subject<void>;

    constructor() {
        this._sessionCleared$ = new Subject<void>();
    }

    get sessionCleared(): Observable<void> {
        return this._sessionCleared$.asObservable();
    }

    clearSession() {
        this._sessionCleared$.next();
    }

    ngOnDestroy(): void {
        this._sessionCleared$.complete();
    }
}
