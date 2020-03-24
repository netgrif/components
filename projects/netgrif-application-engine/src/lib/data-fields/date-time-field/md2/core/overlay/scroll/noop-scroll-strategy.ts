import {ScrollStrategy} from './scroll-strategy';

// TODO NoopScrollStrategy sa pouziva
/**
 * Scroll strategy that doesn't do anything.
 */
export class NoopScrollStrategy implements ScrollStrategy {
    enable() {
    }

    disable() {
    }

    attach() {
    }
}
