import {NgModule} from '@angular/core';
import {MdLineModule} from './line/line';
import {RtlModule} from './rtl/dir';
import {ObserveContentModule} from './observe-content/observe-content';
import {MdOptionModule} from './option';
import {PortalModule} from './portal/portal-directives';
import {OverlayModule} from './overlay/overlay-directives';
import {A11yModule} from './a11y';
import {MdSelectionModule} from './selection';
import {MdRippleModule} from './ripple';


// RTL
export {Dir, LayoutDirection, RtlModule} from './rtl/dir';

// Mutation Observer
export {ObserveContentModule, ObserveContent} from './observe-content/observe-content';

export * from './option';

// Portals
export {
  Portal,
  PortalHost,
  BasePortalHost,
  ComponentPortal,
  TemplatePortal
} from './portal/portal';
export {
  PortalHostDirective,
  TemplatePortalDirective,
  PortalModule,
} from './portal/portal-directives';
export {DomPortalHost} from './portal/dom-portal-host';

// Platform
export * from './platform';

// Overlay
export * from './overlay';

// Ripple
export * from './ripple';

// a11y
export {
  AriaLivePoliteness,
  LiveAnnouncer,
  LIVE_ANNOUNCER_ELEMENT_TOKEN,
  LIVE_ANNOUNCER_PROVIDER,
} from './a11y/live-announcer';

// Selection
export * from './selection/selection';

export * from './a11y/focus-trap';
export {InteractivityChecker} from './a11y/interactivity-checker';
export {isFakeMousedownFromScreenReader} from './a11y/fake-mousedown';

export {A11yModule} from './a11y';

export {
  UniqueSelectionDispatcher,
  UniqueSelectionDispatcherListener,
  UNIQUE_SELECTION_DISPATCHER_PROVIDER,
} from './coordination/unique-selection-dispatcher';

export {MdLineModule, MdLine, MdLineSetter} from './line/line';

// Style
export * from './style';

// Misc
export {ComponentType} from './overlay/generic-component-type';

// Keybindings
export * from './keyboard/keycodes';

export * from './compatibility/compatibility';

// Selection
export * from './selection';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';
export {coerceNumberProperty} from './coercion/number-property';

// Compatibility
export {CompatibilityModule, NoConflictStyleCompatibilityMode} from './compatibility/compatibility';

// Common material module
export {MdCommonModule, MATERIAL_SANITY_CHECKS} from './common-behaviors/common-module';

// Datetime
export * from './datetime';

// Placeholder
export {
  FloatPlaceholderType,
  PlaceholderOptions,
  MD_PLACEHOLDER_GLOBAL_OPTIONS
} from './placeholder/placeholder-options';

@NgModule({
  imports: [
    MdLineModule,
    RtlModule,
    MdRippleModule,
    ObserveContentModule,
    PortalModule,
    OverlayModule,
    A11yModule,
    MdOptionModule,
    MdSelectionModule,
  ],
  exports: [
    MdLineModule,
    RtlModule,
    MdRippleModule,
    ObserveContentModule,
    PortalModule,
    OverlayModule,
    A11yModule,
    MdOptionModule,
    MdSelectionModule,
  ],
})
export class MdCoreModule {}
