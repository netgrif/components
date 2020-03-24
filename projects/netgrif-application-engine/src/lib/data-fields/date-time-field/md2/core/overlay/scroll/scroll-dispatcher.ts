import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {Platform} from '../../platform';
import {ScrollableDirective} from './scrollable.directive';
import {Subject} from 'rxjs';
import {Subscription, merge, fromEvent} from 'rxjs';
import {auditTime} from 'rxjs/operators';


/** Time in ms to throttle the scrolling events by default. */
export const DEFAULT_SCROLL_TIME = 20;

/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
@Injectable()
export class ScrollDispatcher {
    constructor(private _ngZone: NgZone, private _platform: Platform) {
    }

    /** Subject for notifying that a registered scrollable reference element has been scrolled. */
    _scrolled: Subject<void> = new Subject<void>();

    /** Keeps track of the global `scroll` and `resize` subscriptions. */
    _globalSubscription: Subscription = null;

    /** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
    private _scrolledCount = 0;

    /**
     * Map of all the scrollable references that are registered with the service and their
     * scroll event subscriptions.
     */
    scrollableReferences: Map<ScrollableDirective, Subscription> = new Map();

    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    register(scrollable: ScrollableDirective): void {
        const scrollSubscription = scrollable.elementScrolled().subscribe(() => this._notify());

        this.scrollableReferences.set(scrollable, scrollSubscription);
    }

    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    deregister(scrollable: ScrollableDirective): void {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    }

    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     */
    scrolled(auditTimeInMs: number = DEFAULT_SCROLL_TIME, callback: () => any): Subscription {
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }

        // In the case of a 0ms delay, use an observable without auditTime
        // since it does add a perceptible delay in processing overhead.
        const observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().pipe(auditTime(auditTimeInMs)) :
            this._scrolled.asObservable();

        this._scrolledCount++;

        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(() => {
                return merge(
                    fromEvent(window.document, 'scroll'),
                    fromEvent(window, 'resize')
                ).subscribe(() => this._notify());
            });
        }

        // Note that we need to do the subscribing from here, in order to be able to remove
        // the global event listeners once there are no more subscriptions.
        const subscription = observable.subscribe(callback);

        subscription.add(() => {
            this._scrolledCount--;

            if (this._globalSubscription && !this.scrollableReferences.size && !this._scrolledCount) {
                this._globalSubscription.unsubscribe();
                this._globalSubscription = null;
            }
        });

        return subscription;
    }

    /** Sends a notification that a scroll event has been fired. */
    _notify() {
        this._scrolled.next();
    }
}

export function SCROLL_DISPATCHER_PROVIDER_FACTORY(
    parentDispatcher: ScrollDispatcher, ngZone: NgZone, platform: Platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}

export const SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new Optional(), new SkipSelf(), ScrollDispatcher], NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};
