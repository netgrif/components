import {OverlayRef} from '../overlay-ref';

// TODO ScrollStrategy sa pouziva
/**
 * Describes a strategy that will be used by an overlay
 * to handle scroll events while it is open.
 */
export interface ScrollStrategy {
    enable: () => void;
    disable: () => void;
    attach: (overlayRef: OverlayRef) => void;
}

// TODO getMdScrollStrategyAlreadyAttachedError sa pouziva
/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 */
export function getMdScrollStrategyAlreadyAttachedError(): Error {
    return Error(`Scroll strategy has already been attached.`);
}
