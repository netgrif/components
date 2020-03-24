import {NgModule} from '@angular/core';
import {SCROLL_DISPATCHER_PROVIDER} from './scroll-dispatcher';
import {ScrollableDirective} from './scrollable.directive';
import {PlatformModule} from '../../platform';
import {ScrollStrategyOptions} from './scroll-strategy-options';

export {ScrollableDirective} from './scrollable.directive';
export {ScrollDispatcher} from './scroll-dispatcher';

// Export pre-defined scroll strategies and interface to build custom ones.
export {ScrollStrategy} from './scroll-strategy';
export {ScrollStrategyOptions} from './scroll-strategy-options';
export {RepositionScrollStrategy} from './reposition-scroll-strategy';
export {CloseScrollStrategy} from './close-scroll-strategy';
export {NoopScrollStrategy} from './noop-scroll-strategy';
export {BlockScrollStrategy} from './block-scroll-strategy';

@NgModule({
    imports: [PlatformModule],
    exports: [ScrollableDirective],
    declarations: [ScrollableDirective],
    providers: [SCROLL_DISPATCHER_PROVIDER, ScrollStrategyOptions],
})
export class ScrollDispatchModule {
}
