import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {argbFromHex, hexFromArgb, Hct} from '@material/material-color-utilities';
import {AppearanceService, AppearanceSettings} from '@netgrif/components-core';

/**
 * Runtime M3 appearance settings: seed color (presets or hue / chroma in the HCT color space used by M3),
 * palette style, contrast, corners, density, font, text size and elevation. Every change applies immediately.
 */
@Component({
    selector: 'nc-appearance-dialog',
    templateUrl: './appearance-dialog.component.html',
    styleUrls: ['./appearance-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppearanceDialogComponent {

    /** tone used to display the seed (M3 key colors sit around tone 50-60) */
    private static readonly DISPLAY_TONE = 55;
    private static readonly MAX_CHROMA = 120;
    private static readonly DEFAULT_SEED = '#2497f2';

    /** preset seed colors: Netgrif brand colors first, then common accent colors */
    public readonly presets = ['#2497f2', '#3abead', '#6038b2', '#2e7d32', '#ef6c00', '#c62828', '#ad1457', '#607d8b'];
    /** option groups: setting key, values and their translation keys */
    public readonly variants = this.options('variant', ['tonal-spot', 'neutral', 'fidelity', 'vibrant', 'expressive', 'monochrome']);
    public readonly contrasts = this.options('contrast', [0, 0.5, 1], ['standard', 'medium', 'high']);
    public readonly corners = this.options('corners', ['sharp', 'default', 'rounded']);
    public readonly elevations = this.options('flat', [false, true], ['shadows', 'flat']);
    public readonly fonts = this.options('font', ['roboto', 'inter', 'system']);
    public readonly textScales = [0.9, 1, 1.1, 1.25];

    protected readonly _appearance = inject(AppearanceService);

    /** hue (0-360) of the seed color in the HCT color space */
    public hue: number;
    /** chroma (colorfulness) of the seed color in the HCT color space */
    public chroma: number;

    constructor() {
        this.updateHueChroma(this.settings.seed ?? AppearanceDialogComponent.DEFAULT_SEED);
    }

    public get settings(): AppearanceSettings {
        return this._appearance.settings;
    }

    public get maxChroma(): number {
        return AppearanceDialogComponent.MAX_CHROMA;
    }

    /** rainbow of the full hue range */
    public get hueGradient(): string {
        const stops = Array.from({length: 13}, (_, i) => this.hctHex(i * 30, Math.max(this.chroma, 40)));
        return `linear-gradient(to right, ${stops.join(', ')})`;
    }

    /** from gray to the most saturated color of the current hue */
    public get chromaGradient(): string {
        const stops = Array.from({length: 7}, (_, i) => this.hctHex(this.hue, i * AppearanceDialogComponent.MAX_CHROMA / 6));
        return `linear-gradient(to right, ${stops.join(', ')})`;
    }

    /** position of the density slider: 0 (default spacing) ... 5 (density -5) */
    public get densityLevel(): number {
        return -this._appearance.density;
    }

    /** label of the slider thumb: the density value (0, -1, ... -5) */
    public densityLabel = (level: number): string => level === 0 ? '0' : `-${level}`;

    public setDensity(level: number): void {
        this.update({density: -level});
    }

    public update(change: Partial<AppearanceSettings>): void {
        this._appearance.update(change);
    }

    public setOption(key: keyof AppearanceSettings, value: unknown): void {
        if (value !== undefined) {
            this.update({[key]: value});
        }
    }

    public selectSeed(seed: string): void {
        this.updateHueChroma(seed);
        this.update({seed});
    }

    public selectHex(value: string): void {
        if (/^#[0-9a-fA-F]{6}$/.test(value)) {
            this.selectSeed(value.toLowerCase());
        }
    }

    public setHue(hue: number): void {
        this.hue = hue;
        this.update({seed: this.hctHex(this.hue, this.chroma)});
    }

    public setChroma(chroma: number): void {
        this.chroma = chroma;
        this.update({seed: this.hctHex(this.hue, this.chroma)});
    }

    public reset(): void {
        this._appearance.reset();
        this.updateHueChroma(AppearanceDialogComponent.DEFAULT_SEED);
    }

    protected updateHueChroma(seed: string): void {
        const hct = Hct.fromInt(argbFromHex(seed));
        this.hue = Math.round(hct.hue);
        this.chroma = Math.round(hct.chroma);
    }

    protected options(key: keyof AppearanceSettings, values: Array<unknown>, labels: Array<string> = values as Array<string>) {
        return {key, values, labels: labels.map(label => `appearance.${key}.${label}`)};
    }

    protected hctHex(hue: number, chroma: number): string {
        return hexFromArgb(Hct.from(hue, chroma, AppearanceDialogComponent.DISPLAY_TONE).toInt());
    }
}
