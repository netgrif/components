import {
    Injectable,
    InjectionToken,
    Optional,
    Inject,
    SkipSelf,
} from '@angular/core';
import {Platform} from '../platform';


export const LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken<HTMLElement>('liveAnnouncerElement');

/** Possible politeness levels. */
export type AriaLivePoliteness = 'off' | 'polite' | 'assertive';

@Injectable()
export class LiveAnnouncer {

    private readonly _liveElement: Element;

    constructor(
        @Optional() @Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN) elementToken: any,
        platform: Platform) {
        // Only do anything if we're on the browser platform.
        if (platform.isBrowser) {
            // We inject the live element as `any` because the constructor signature cannot reference
            // browser globals (HTMLElement) on non-browser environments, since having a class decorator
            // causes TypeScript to preserve the constructor signature types.
            this._liveElement = elementToken || this._createLiveElement();
        }
    }

    private _createLiveElement(): Element {
        const liveEl = document.createElement('div');

        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');

        document.body.appendChild(liveEl);

        return liveEl;
    }

}

export function LIVE_ANNOUNCER_PROVIDER_FACTORY(
    parentDispatcher: LiveAnnouncer, liveElement: any, platform: Platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}

export const LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
