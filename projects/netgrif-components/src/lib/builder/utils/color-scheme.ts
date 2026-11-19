import {isDarkColorScheme} from '@netgrif/components-core';

/**
 * The color scheme of the page is resolved by `isDarkColorScheme()` / `darkColorScheme$()` of
 * `@netgrif/components-core` (the light / dark switch of `AppearanceService`), re-exported for the builder.
 */
export {darkColorScheme$, isDarkColorScheme} from '@netgrif/components-core';

/** Monaco theme of the current color scheme. */
export function monacoTheme(dark = isDarkColorScheme()): string {
    return dark ? 'vs-dark' : 'vs';
}
