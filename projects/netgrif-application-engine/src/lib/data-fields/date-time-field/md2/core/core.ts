import {NgModule} from '@angular/core';
import {RtlModule} from './rtl/dir';
import {PortalModule} from './portal/portal-directives';
import {OverlayModule} from './overlay/overlay-directives';
import {A11yModule} from './a11y';


// RTL
export {Dir, LayoutDirection, RtlModule} from './rtl/dir';

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

// a11y
export {
    AriaLivePoliteness,
    LiveAnnouncer,
    LIVE_ANNOUNCER_ELEMENT_TOKEN,
    LIVE_ANNOUNCER_PROVIDER,
} from './a11y/live-announcer';

export * from './a11y/focus-trap';
export {InteractivityChecker} from './a11y/interactivity-checker';
export {isFakeMousedownFromScreenReader} from './a11y/fake-mousedown';

export {A11yModule} from './a11y';

// Style
export * from './style';

// Misc
export {ComponentType} from './overlay/generic-component-type';

// Keybindings
export * from './keyboard/keycodes';

// Coercion
export {coerceBooleanProperty} from './coercion/boolean-property';

// Datetime
export * from './datetime';

@NgModule({
    imports: [
        RtlModule,
        PortalModule,
        OverlayModule,
        A11yModule,
    ],
    exports: [
        RtlModule,
        PortalModule,
        OverlayModule,
        A11yModule,
    ],
})
export class MdCoreModule {
}
