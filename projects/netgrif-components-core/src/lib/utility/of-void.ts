import {Observable} from 'rxjs';

/**
 * This function is meant to work as a call to rxjs's `of` function without any arguments
 * @returns a void Observable, that calls next once and then completes
 */
export function ofVoid(): Observable<void> {
    return new Observable<void>(o => {
        o.next();
        o.complete();
    });
}
