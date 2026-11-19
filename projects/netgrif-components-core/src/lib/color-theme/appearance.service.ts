import {DOCUMENT, Injectable, inject} from '@angular/core';
import {isDarkColorScheme} from './color-scheme';
import {
    argbFromHex,
    DynamicColor,
    DynamicScheme,
    hexFromArgb,
    Hct,
    MaterialDynamicColors,
    SchemeExpressive,
    SchemeFidelity,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeTonalSpot,
    SchemeVibrant,
} from '@material/material-color-utilities';

/** M3 dynamic color scheme variant (material-color-utilities `Scheme*` classes) */
export type ColorThemeVariant = 'tonal-spot' | 'neutral' | 'fidelity' | 'vibrant' | 'expressive' | 'monochrome';
/** shape scale: `sharp` (no rounding), `default` (M3 corner tokens), `rounded` (larger radii) */
export type CornerStyle = 'sharp' | 'default' | 'rounded';
/**
 * Global density of the application: 0 (default spacing) ... -5 (the densest), applied as `html.nae-density-<n>`
 * (n = 0 ... 5) of `nae.theme()`. `undefined` keeps the density of the theme.
 */
export type DensityStyle = number;
/** `inter` is loaded from Google Fonts on demand, `system` uses the OS UI font */
export type FontStyle = 'roboto' | 'inter' | 'system';

/**
 * User adjustable M3 appearance. Everything is applied at runtime through the `--mat-sys-*` system tokens.
 */
export interface AppearanceSettings {
    /** seed color of the dynamic color scheme, `undefined` keeps the colors of the stylesheet theme */
    seed?: string;
    /** scheme variant generated from the seed color */
    variant: ColorThemeVariant;
    /** M3 contrast level: 0 standard, 0.5 medium, 1 high */
    contrast: number;
    /** corner radii of the M3 shape scale */
    corners: CornerStyle;
    /** global density (0 ... -5), `undefined` = the density of the theme; the blocks of the application keep their offsets */
    density?: DensityStyle;
    /** font family of the M3 type scale */
    font: FontStyle;
    /** scale of the (rem based) M3 type scale */
    textScale: number;
    /** no elevation shadows, surfaces separated by tone only */
    flat: boolean;
}

/** Settings matching the stylesheet theme, i.e. nothing overridden at runtime. */
export const DEFAULT_APPEARANCE: AppearanceSettings = {
    variant: 'tonal-spot',
    contrast: 0,
    corners: 'default',
    density: undefined,
    font: 'roboto',
    textScale: 1,
    flat: false,
};

/**
 * Runtime M3 appearance: dynamic color from a single seed color (computed with the official
 * material-color-utilities), contrast, shape, density, typography and elevation.
 * Colors are written as `light-dark()` pairs, so the light / dark mode switch keeps working.
 *
 * The density levels rely on `html.nae-density-<n>`, defined by the `nae.theme()` mixin of `@netgrif/components/theming`
 * (with the offsets of the blocks of the application, e.g. the task forms).
 */
@Injectable({
    providedIn: 'root'
})
export class AppearanceService {

    /** `html.nae-density-<n>` sets the global density -n */
    public static readonly DENSITY_CLASS_PREFIX = 'nae-density-';
    /** the densest level of the theme */
    public static readonly MIN_DENSITY = -5;
    private static readonly STORAGE_KEY = 'nae-appearance';
    /** the stored light / dark choice of the user (`dark` / `light`), without it the OS color scheme applies */
    public static readonly COLOR_SCHEME_STORAGE_KEY = 'nae-color-scheme';
    /** seed used when only the contrast is changed */
    private static readonly DEFAULT_SEED = '#2497f2';

    /** `--mat-sys-*` color roles emitted by Angular Material and their dynamic color counterparts */
    private static readonly COLOR_ROLES: Array<[string, (c: MaterialDynamicColors) => DynamicColor]> = [
        ['primary', c => c.primary()],
        ['on-primary', c => c.onPrimary()],
        ['primary-container', c => c.primaryContainer()],
        ['on-primary-container', c => c.onPrimaryContainer()],
        ['inverse-primary', c => c.inversePrimary()],
        ['primary-fixed', c => c.primaryFixed()],
        ['primary-fixed-dim', c => c.primaryFixedDim()],
        ['on-primary-fixed', c => c.onPrimaryFixed()],
        ['on-primary-fixed-variant', c => c.onPrimaryFixedVariant()],
        ['secondary', c => c.secondary()],
        ['on-secondary', c => c.onSecondary()],
        ['secondary-container', c => c.secondaryContainer()],
        ['on-secondary-container', c => c.onSecondaryContainer()],
        ['secondary-fixed', c => c.secondaryFixed()],
        ['secondary-fixed-dim', c => c.secondaryFixedDim()],
        ['on-secondary-fixed', c => c.onSecondaryFixed()],
        ['on-secondary-fixed-variant', c => c.onSecondaryFixedVariant()],
        ['tertiary', c => c.tertiary()],
        ['on-tertiary', c => c.onTertiary()],
        ['tertiary-container', c => c.tertiaryContainer()],
        ['on-tertiary-container', c => c.onTertiaryContainer()],
        ['tertiary-fixed', c => c.tertiaryFixed()],
        ['tertiary-fixed-dim', c => c.tertiaryFixedDim()],
        ['on-tertiary-fixed', c => c.onTertiaryFixed()],
        ['on-tertiary-fixed-variant', c => c.onTertiaryFixedVariant()],
        ['error', c => c.error()],
        ['on-error', c => c.onError()],
        ['error-container', c => c.errorContainer()],
        ['on-error-container', c => c.onErrorContainer()],
        ['background', c => c.background()],
        ['on-background', c => c.onBackground()],
        ['surface', c => c.surface()],
        ['on-surface', c => c.onSurface()],
        ['surface-variant', c => c.surfaceVariant()],
        ['on-surface-variant', c => c.onSurfaceVariant()],
        ['surface-dim', c => c.surfaceDim()],
        ['surface-bright', c => c.surfaceBright()],
        ['surface-container-lowest', c => c.surfaceContainerLowest()],
        ['surface-container-low', c => c.surfaceContainerLow()],
        ['surface-container', c => c.surfaceContainer()],
        ['surface-container-high', c => c.surfaceContainerHigh()],
        ['surface-container-highest', c => c.surfaceContainerHighest()],
        ['surface-tint', c => c.surfaceTint()],
        ['inverse-surface', c => c.inverseSurface()],
        ['inverse-on-surface', c => c.inverseOnSurface()],
        ['outline', c => c.outline()],
        ['outline-variant', c => c.outlineVariant()],
        ['shadow', c => c.shadow()],
        ['scrim', c => c.scrim()],
    ];

    /** M3 corner scale (none, extra-small, small, medium, large, extra-large) per style */
    private static readonly CORNERS: Record<CornerStyle, [number, number, number, number, number]> = {
        sharp: [2, 2, 4, 4, 8],
        default: [4, 8, 12, 16, 28],
        rounded: [8, 12, 20, 24, 36],
    };

    private static readonly TYPE_ROLES = ['display', 'headline', 'title', 'body', 'label']
        .flatMap(role => ['large', 'medium', 'small'].map(size => `${role}-${size}`));

    private static readonly FONTS: Record<FontStyle, string> = {
        roboto: 'Roboto',
        inter: 'Inter, Roboto, sans-serif',
        system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    };

    private readonly _document = inject(DOCUMENT);
    private readonly _colors = new MaterialDynamicColors();
    private _settings: AppearanceSettings = this.load();

    /** current settings (restored from `localStorage` on startup) */
    public get settings(): AppearanceSettings {
        return this._settings;
    }

    /**
     * Applies the stored settings (and the stored light / dark choice), call once after the application starts.
     */
    public restore(): void {
        this.restoreColorScheme();
        this.applyAll(this._settings);
    }

    /** the page is in dark mode: the choice of the user (class of html) or the OS color scheme */
    public isDarkMode(): boolean {
        return isDarkColorScheme();
    }

    /** sets the light / dark mode (`html.dark-theme` / `html.light-theme`) and stores the choice */
    public setDarkMode(dark: boolean): void {
        this.applyColorScheme(dark);
        try {
            localStorage.setItem(AppearanceService.COLOR_SCHEME_STORAGE_KEY, dark ? 'dark' : 'light');
        } catch {
            // storage blocked (private mode, sandboxed frame): the mode stays for this page only
        }
    }

    public toggleDarkMode(): void {
        this.setDarkMode(!this.isDarkMode());
    }

    /** applies the stored light / dark choice, nothing (the OS color scheme) without it */
    protected restoreColorScheme(): void {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem(AppearanceService.COLOR_SCHEME_STORAGE_KEY);
        } catch {
            stored = null;
        }
        if (stored === 'dark' || stored === 'light') {
            this.applyColorScheme(stored === 'dark');
        }
    }

    protected applyColorScheme(dark: boolean): void {
        const root = this._document.documentElement;
        root.classList.toggle('dark-theme', dark);
        root.classList.toggle('light-theme', !dark);
    }

    /**
     * Changes some of the settings, applies them immediately and stores them.
     */
    public update(change: Partial<AppearanceSettings>): void {
        this._settings = {...this._settings, ...change};
        this.applyAll(this._settings);
        this.store(this._settings);
    }

    /**
     * Back to the stylesheet theme.
     */
    public reset(): void {
        this._settings = {...DEFAULT_APPEARANCE};
        this.applyAll(this._settings);
        this.store(undefined);
    }

    protected applyAll(settings: AppearanceSettings): void {
        this.applyColors(settings);
        this.applyCorners(settings.corners);
        this.applyTypography(settings.font, settings.textScale);
        this.applyElevation(settings.flat);
        this.applyDensity(settings.density);
    }

    /**
     * The global density in effect: the chosen one, or the density of the theme (`--nae-density` of `nae.theme()`).
     */
    public get density(): number {
        return AppearanceService.normalizeDensity(this._settings.density) ?? this.themeDensity;
    }

    /** the density of the stylesheet theme (`nae.theme($density)`), 0 without the theme of the library */
    public get themeDensity(): number {
        const style = this._document.defaultView?.getComputedStyle(this._document.documentElement);
        const value = parseInt(style?.getPropertyValue('--nae-density') ?? '', 10);
        return Number.isNaN(value) ? 0 : AppearanceService.clampDensity(value);
    }

    /** the density as a number in 0 ... -5, `undefined` = the density of the theme */
    public static normalizeDensity(density: DensityStyle | undefined): number | undefined {
        if (typeof density !== 'number' || Number.isNaN(density)) {
            return undefined;
        }
        return AppearanceService.clampDensity(density);
    }

    protected static clampDensity(density: number): number {
        return Math.max(AppearanceService.MIN_DENSITY, Math.min(0, Math.round(density)));
    }

    protected applyDensity(density: DensityStyle | undefined): void {
        const classes = this._document.documentElement.classList;
        Array.from(classes)
            .filter(name => name.startsWith(AppearanceService.DENSITY_CLASS_PREFIX))
            .forEach(name => classes.remove(name));
        const level = AppearanceService.normalizeDensity(density);
        if (level !== undefined) {
            classes.add(`${AppearanceService.DENSITY_CLASS_PREFIX}${-level}`);
        }
    }

    protected applyColors(settings: AppearanceSettings): void {
        const style = this._document.documentElement.style;
        const seed = settings.seed ?? (settings.contrast !== 0 ? AppearanceService.DEFAULT_SEED : undefined);
        if (!seed) {
            AppearanceService.COLOR_ROLES.forEach(([name]) => style.removeProperty(`--mat-sys-${name}`));
            style.removeProperty('--mat-sys-neutral10');
            style.removeProperty('--mat-sys-neutral-variant20');
            return;
        }
        const light = this.createScheme(seed, settings.variant, false, settings.contrast);
        const dark = this.createScheme(seed, settings.variant, true, settings.contrast);
        for (const [name, role] of AppearanceService.COLOR_ROLES) {
            const color = role(this._colors);
            style.setProperty(`--mat-sys-${name}`, `light-dark(${hexFromArgb(color.getArgb(light))}, ${hexFromArgb(color.getArgb(dark))})`);
        }
        style.setProperty('--mat-sys-neutral10', hexFromArgb(light.neutralPalette.tone(10)));
        style.setProperty('--mat-sys-neutral-variant20', hexFromArgb(light.neutralVariantPalette.tone(20)));
    }

    protected applyCorners(corners: CornerStyle): void {
        const style = this._document.documentElement.style;
        const names = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
        if (corners === 'default') {
            names.forEach(name => style.removeProperty(`--mat-sys-corner-${name}`));
            ['extra-small-top', 'large-top', 'large-start', 'large-end', 'extra-large-top']
                .forEach(name => style.removeProperty(`--mat-sys-corner-${name}`));
            return;
        }
        const [xs, s, m, l, xl] = AppearanceService.CORNERS[corners];
        [xs, s, m, l, xl].forEach((value, i) => style.setProperty(`--mat-sys-corner-${names[i]}`, `${value}px`));
        style.setProperty('--mat-sys-corner-extra-small-top', `${xs}px ${xs}px 0 0`);
        style.setProperty('--mat-sys-corner-large-top', `${l}px ${l}px 0 0`);
        style.setProperty('--mat-sys-corner-large-start', `${l}px 0 0 ${l}px`);
        style.setProperty('--mat-sys-corner-large-end', `0 ${l}px ${l}px 0`);
        style.setProperty('--mat-sys-corner-extra-large-top', `${xl}px ${xl}px 0 0`);
    }

    protected applyTypography(font: FontStyle, textScale: number): void {
        const root = this._document.documentElement;
        root.style.fontSize = textScale === 1 ? '' : `${textScale * 100}%`;
        if (font === 'inter') {
            this.loadInter();
        }
        for (const role of AppearanceService.TYPE_ROLES) {
            if (font === 'roboto') {
                root.style.removeProperty(`--mat-sys-${role}-font`);
                root.style.removeProperty(`--mat-sys-${role}`);
            } else {
                root.style.setProperty(`--mat-sys-${role}-font`, AppearanceService.FONTS[font]);
                root.style.setProperty(`--mat-sys-${role}`,
                    `var(--mat-sys-${role}-weight) var(--mat-sys-${role}-size) / var(--mat-sys-${role}-line-height) var(--mat-sys-${role}-font)`);
            }
        }
    }

    protected applyElevation(flat: boolean): void {
        const style = this._document.documentElement.style;
        for (let level = 1; level <= 5; level++) {
            if (flat) {
                style.setProperty(`--mat-sys-level${level}`, 'none');
            } else {
                style.removeProperty(`--mat-sys-level${level}`);
            }
        }
    }

    protected createScheme(seed: string, variant: ColorThemeVariant, isDark: boolean, contrast: number): DynamicScheme {
        const hct = Hct.fromInt(argbFromHex(seed));
        switch (variant) {
            case 'neutral':
                return new SchemeNeutral(hct, isDark, contrast);
            case 'fidelity':
                return new SchemeFidelity(hct, isDark, contrast);
            case 'vibrant':
                return new SchemeVibrant(hct, isDark, contrast);
            case 'expressive':
                return new SchemeExpressive(hct, isDark, contrast);
            case 'monochrome':
                return new SchemeMonochrome(hct, isDark, contrast);
            default:
                return new SchemeTonalSpot(hct, isDark, contrast);
        }
    }

    /**
     * Inter from Google Fonts, only when the application does not provide the font itself (self hosted Inter loaded by
     * the styles of the application means no request to an external server).
     */
    private loadInter(): void {
        if (this._document.getElementById('nae-font-inter') || this.hasFont('Inter')) {
            return;
        }
        const link = this._document.createElement('link');
        link.id = 'nae-font-inter';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap';
        this._document.head.appendChild(link);
    }

    private hasFont(family: string): boolean {
        try {
            let found = false;
            this._document.fonts?.forEach(face => {
                if (face.family.replace(/["']/g, '') === family) {
                    found = true;
                }
            });
            return found;
        } catch {
            return false;
        }
    }

    /** stores the settings (undefined removes them); storage may be blocked (private mode, sandboxed frame) */
    private store(settings: AppearanceSettings | undefined): void {
        try {
            if (settings === undefined) {
                localStorage.removeItem(AppearanceService.STORAGE_KEY);
            } else {
                localStorage.setItem(AppearanceService.STORAGE_KEY, JSON.stringify(settings));
            }
        } catch {
            // the settings stay applied for this page only
        }
    }

    private load(): AppearanceSettings {
        try {
            const stored = localStorage.getItem(AppearanceService.STORAGE_KEY);
            return {...DEFAULT_APPEARANCE, ...(stored ? JSON.parse(stored) : {})};
        } catch {
            return {...DEFAULT_APPEARANCE};
        }
    }
}
