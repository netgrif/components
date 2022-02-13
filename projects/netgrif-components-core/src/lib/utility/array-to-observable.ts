import {Observable, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';

/**
 * @param observables an array of items
 * @returns an observable that emits each item from the array in order.
 */
export function arrayToObservable<T>(observables: Array<T>): Observable<T> {
    return timer(0, 1).pipe(take(observables.length), map(i => observables[i]));
}
