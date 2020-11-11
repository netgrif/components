import {InjectedTabData} from '../../tabs/interfaces';
import {Inject, Optional} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {filter, take} from 'rxjs/operators';

export abstract class TabbedVirtualScrollComponent {

    protected _showVirtualScroll = false;

    protected constructor(@Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
        if (injectedTabData === null) {
            this._showVirtualScroll = true;
        } else {
            injectedTabData.tabSelected$.pipe(
                filter(bool => bool),
                take(1)
            ).subscribe( () => {
                this._showVirtualScroll = true;
            });
        }
    }

    public get showVirtualScroll(): boolean {
        return this._showVirtualScroll;
    }
}
