import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {AbstractHeaderComponent} from '../../header/abstract-header.component';
import {AbstractSortableViewComponent} from './sortable-view';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigParams } from '../../panel/configuration/config-params';

@Component({
    selector: 'ncc-abstract-view-with-headers',
    template: ''
})
export abstract class AbstractViewWithHeadersComponent implements OnDestroy {

    public config: Params;
    protected _selectedHeaders$: ReplaySubject<Array<HeaderColumn>>;
    protected _subscriptions: Subscription;

    protected constructor(protected _sortableView?: AbstractSortableViewComponent, protected _activatedRoute?: ActivatedRoute) {
        this._selectedHeaders$ = new ReplaySubject<Array<HeaderColumn>>(1);
        this._subscriptions = new Subscription();
        if (!!_activatedRoute) {
            this._subscriptions.add(this._activatedRoute.queryParams.subscribe(paramMap => this.config = paramMap));
        }
    }

    public get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._selectedHeaders$.asObservable();
    }

    protected initializeHeader(headerComponent: AbstractHeaderComponent): void {
        this._subscriptions.add(headerComponent.headerService.selectedHeaders$.subscribe(selectedHeaders => {
            this._selectedHeaders$.next(selectedHeaders);
        }));
        if (!!this._sortableView) {
            this._sortableView.registerHeaderChange(headerComponent.headerService.headerChange$);
            this._subscriptions.add(headerComponent.headerService.appliedSorts$.subscribe(appliedSorts => {
                this._sortableView.registerPreferredSortableHeaders(appliedSorts);
                this._sortableView.reload();
            }));
        }
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._selectedHeaders$.complete();
    }

    showHeader(): boolean {
        return !(this.config?.[ConfigParams.PANEL_HEADER] === 'false')
    }
}
