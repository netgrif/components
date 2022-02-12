import {Subscription} from 'rxjs';

/**
 * Unsubscribes the provided subscription, if it exists and is still opened
 * @param sub the subscription that should be destroyed
 */
export function destroySubscription(sub: Subscription): void {
    if (sub && !sub.closed) {
        sub.unsubscribe();
    }
}
