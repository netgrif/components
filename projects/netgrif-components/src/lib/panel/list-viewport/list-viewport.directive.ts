import {AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy} from '@angular/core';

/**
 * Scroll container of a paginated list (rows + sticky column header, the paginator stays below it).
 *
 * Exposes the height of the sticky header (`--nc-list-header-height`, the scrollbar track starts below it) and the
 * visible width of the container (`--nc-list-viewport-width`, content that must not scroll horizontally with the
 * columns in table mode, e.g. the empty state) as CSS variables on the container.
 */
@Directive({
    selector: '[ncListViewport]',
    standalone: false
})
export class ListViewportDirective implements AfterViewInit, OnDestroy {

    /** the sticky header inside the container */
    @Input('ncListViewport') header: HTMLElement | undefined;

    private _observer: ResizeObserver | undefined;

    constructor(private _element: ElementRef<HTMLElement>, private _zone: NgZone) {
    }

    ngAfterViewInit(): void {
        this.update();
        if (typeof ResizeObserver === 'undefined') {
            return;
        }
        this._zone.runOutsideAngular(() => {
            this._observer = new ResizeObserver(() => this.update());
            this._observer.observe(this._element.nativeElement);
            if (this.header) {
                this._observer.observe(this.header);
            }
        });
    }

    ngOnDestroy(): void {
        this._observer?.disconnect();
    }

    private update(): void {
        const viewport = this._element.nativeElement;
        viewport.style.setProperty('--nc-list-header-height', `${this.header?.offsetHeight ?? 0}px`);
        viewport.style.setProperty('--nc-list-viewport-width', `${viewport.clientWidth}px`);
    }
}
