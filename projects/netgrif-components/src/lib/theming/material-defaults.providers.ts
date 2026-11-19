import {EnvironmentProviders, inject, Provider, provideAppInitializer} from '@angular/core';
import {AppearanceService} from '@netgrif/components-core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldAppearance} from '@angular/material/form-field';
import {MAT_ICON_DEFAULT_OPTIONS} from '@angular/material/icon';

export interface NaeMaterialDefaultsOptions {
    /**
     * Default appearance of `mat-form-field`. Material 3 design of the library uses `outline`.
     */
    formFieldAppearance?: MatFormFieldAppearance;
    /**
     * CSS class of the font set used by `mat-icon` ligatures, e.g. `material-symbols-rounded`
     * or `material-symbols-outlined` (icons of Material Design 3). `undefined` keeps Material Icons.
     *
     * The application has to load the font, e.g. in `index.html`:
     * ```html
     * <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet">
     * ```
     */
    iconFontSet?: string;
    /**
     * Applies the stored appearance (colors, density, ... of the appearance dialog) and the light / dark choice when the
     * application starts (`AppearanceService.restore()`), before the first page (also the login and public pages).
     * Default `true`.
     */
    restoreAppearance?: boolean;
}

/**
 * Angular Material defaults the Material 3 design of the component library is built for.
 *
 * ```ts
 * providers: [provideNaeMaterialDefaults({iconFontSet: 'material-symbols-rounded'})]
 * ```
 */
export function provideNaeMaterialDefaults(options: NaeMaterialDefaultsOptions = {}): Array<Provider | EnvironmentProviders> {
    const providers: Array<Provider | EnvironmentProviders> = [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: options.formFieldAppearance ?? 'outline'}},
    ];
    if (options.iconFontSet) {
        providers.push({provide: MAT_ICON_DEFAULT_OPTIONS, useValue: {fontSet: options.iconFontSet}});
    }
    if (options.restoreAppearance !== false) {
        providers.push(provideAppInitializer(() => inject(AppearanceService).restore()));
    }
    return providers;
}
