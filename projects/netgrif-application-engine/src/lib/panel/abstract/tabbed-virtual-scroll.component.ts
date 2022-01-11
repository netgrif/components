import {InjectedTabData} from '../../tabs/interfaces';
import {Inject, OnDestroy, Optional} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {filter, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

export abstract class TabbedVirtualScrollComponent implements OnDestroy {

    protected _showVirtualScroll = false;
    protected _sub: Subscription;

    protected constructor(@Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
        if (injectedTabData === null) {
            this._showVirtualScroll = true;
        } else {
            this._sub = injectedTabData.tabSelected$.pipe(
                filter(bool => bool),
                take(1)
            ).subscribe( () => {
                this._showVirtualScroll = true;
            });
        }
    }

    ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    public get showVirtualScroll(): boolean {
        return this._showVirtualScroll;
    }
}
