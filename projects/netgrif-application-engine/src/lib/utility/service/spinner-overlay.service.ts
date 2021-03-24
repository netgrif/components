import {Injectable, OnDestroy} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {map, scan} from 'rxjs/operators';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';

@Injectable({
    providedIn: 'root'
})
export class SpinnerOverlayService implements OnDestroy {

    private readonly _spinner: OverlayRef;
    public spin$: Subject<boolean>;


    constructor(private overlay: Overlay) {
        this.spin$ = new Subject<boolean>();
        this._spinner = this._createSpinner();

        this.spin$.pipe(
            map(v => v ? 1 : -1),
            scan((acc, curr) => (acc + curr) >= 0 ? (acc + curr) : 0, 0)
        ).subscribe(result => result === 1 ? this._show() : (this._spinner.hasAttached() ? this._hide() : null));
    }

    ngOnDestroy(): void {
        this.spin$.complete();
    }

    private _createSpinner() {
        return this.overlay.create({
            hasBackdrop: true,
            // backdropClass: 'dark-backdrop',
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        });
    }

    private _show() {
        this._spinner.attach(new ComponentPortal(MatSpinner));
    }

    private _hide() {
        this._spinner.detach();
    }
}
