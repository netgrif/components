/**
 * Height of a row of a virtual scroll that follows the density of its element: `base + step * --nae-density-scale`
 * (0 ... -5, set by `nae.theme()` globally on `<html>` or by a density block on an ancestor), the same formula as the
 * height of the row in the styles, so the `itemSize` of the `cdk-virtual-scroll-viewport` matches the rendered rows.
 * The value is read again when a class of the element or of one of its ancestors changes (the density is
 * switched; only these elements are observed, not the whole document), then `changed` is called (e.g.
 * `checkViewportSize()` of the viewport, the CDK keeps the rendered range of the old size otherwise); call
 * {@link update} once the element is in the document (`ngOnInit`) and {@link destroy} with the component.
 */
export class DensityItemSize {

    protected _value: number;
    protected _observer: MutationObserver | undefined;

    constructor(protected _element: HTMLElement, protected _base: number, protected _step: number,
                protected _changed?: () => void) {
        this._value = _base;
        if (typeof MutationObserver !== 'undefined') {
            this._observer = new MutationObserver(() => {
                const previous = this._value;
                this._value = this.compute();
                if (this._value !== previous) {
                    this._changed?.();
                }
            });
        }
    }

    /** the current height of the row in px */
    public get value(): number {
        return this._value;
    }

    /** reads the density of the element again and observes the element and its ancestors */
    public update(): void {
        this._value = this.compute();
        if (!this._observer || !this._element?.isConnected) {
            return;
        }
        this._observer.disconnect();
        for (let node: HTMLElement | null = this._element; node; node = node.parentElement) {
            this._observer.observe(node, {attributes: true, attributeFilter: ['class']});
        }
    }

    public destroy(): void {
        this._observer?.disconnect();
        this._observer = undefined;
    }

    protected compute(): number {
        if (!this._element?.isConnected || typeof getComputedStyle === 'undefined') {
            return this._base;
        }
        const scale = parseFloat(getComputedStyle(this._element).getPropertyValue('--nae-density-scale'));
        return this._base + this._step * (Number.isNaN(scale) ? 0 : scale);
    }
}
