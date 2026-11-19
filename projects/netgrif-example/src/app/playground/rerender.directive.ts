import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * Re-creates its content whenever the key changes, e.g. a view whose providers read the demo configuration when they
 * are constructed: `<ne-case-view *neRerender="renderKey"></ne-case-view>`.
 */
@Directive({
    selector: '[neRerender]',
    standalone: false,
})
export class RerenderDirective {
    private _key: unknown = {};

    constructor(private _template: TemplateRef<unknown>, private _container: ViewContainerRef) {
    }

    @Input() set neRerender(key: unknown) {
        if (key === this._key) {
            return;
        }
        this._key = key;
        this._container.clear();
        this._container.createEmbeddedView(this._template);
    }
}
