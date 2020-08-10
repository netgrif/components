import {Observable, ReplaySubject} from 'rxjs';

/**
 * This function is meant to work as a call to rxjs's `of` function without any arguments
 * @returns a void Observable, that calls next once and then completes
 */
export function ofVoid(): Observable<void> {
    const result$ = new ReplaySubject<void>(1);
    result$.next();
    result$.complete();
    return result$.asObservable();
}
