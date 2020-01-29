import {Directive, DoCheck, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[naeParentWidthDependantStyle]'
})
export class ParentWidthDependantStyleDirective implements DoCheck{

    @Input() widthBreakpoint: number;
    @Input() styleNameLess: string;
    @Input() styleNameGreaterEqual: string;

    constructor(private _renderer: Renderer2, private _el: ElementRef<HTMLDivElement>) {
    }

    ngDoCheck(): void {
        this.onParentResize();
    }

    private onParentResize() {
        if(this._el.nativeElement.parentElement.offsetWidth < this.widthBreakpoint) {
            if(this._el.nativeElement.classList.contains(this.styleNameGreaterEqual))
                this._renderer.removeClass(this._el.nativeElement, this.styleNameGreaterEqual);
            if( !this._el.nativeElement.classList.contains(this.styleNameLess))
                this._renderer.addClass(this._el.nativeElement, this.styleNameLess);
        }
        else {
            if(this._el.nativeElement.classList.contains(this.styleNameLess))
                this._renderer.removeClass(this._el.nativeElement, this.styleNameLess);
            if( !this._el.nativeElement.classList.contains(this.styleNameGreaterEqual))
                this._renderer.addClass(this._el.nativeElement, this.styleNameGreaterEqual);
        }
    }
}
