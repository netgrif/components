import {OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {FeaturedValue} from './featured-value';


export abstract class PanelWithHeaderBinding implements OnInit, OnDestroy {
    public selectedHeaders$: Observable<Array<HeaderColumn>>;
    public firstFeaturedValue: string;
    public featuredFieldsValues: Array<FeaturedValue> = [];
    protected _lastSelectedHeaders: Array<HeaderColumn>;
    protected sub: Subscription;

    protected constructor() {
    }

    ngOnInit(): void {
        this.sub = this.selectedHeaders$.subscribe(newSelectedHeaders => {
            this._lastSelectedHeaders = newSelectedHeaders;
            this.resolveFeaturedFieldsValues();
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    protected resolveFeaturedFieldsValues(): void {
        if (!this._lastSelectedHeaders) {
            return;
        }

        this.featuredFieldsValues.splice(0, this.featuredFieldsValues.length);
        this.firstFeaturedValue = this.getFeaturedValue(this._lastSelectedHeaders[0]).value;
        for (let i = 1; i < this._lastSelectedHeaders.length; i++) {
            this.featuredFieldsValues.push(this.getFeaturedValue(this._lastSelectedHeaders[i]));
        }
    }

    protected getFeaturedValue(selectedHeader: HeaderColumn): FeaturedValue {
        if (!selectedHeader) {
            return {value: '', icon: '', type: ''};
        }
        if (selectedHeader.type === HeaderColumnType.META) {
            return this.getFeaturedMetaValue(selectedHeader);
        }
        if (selectedHeader.type === HeaderColumnType.IMMEDIATE) {
            return this.getFeaturedImmediateValue(selectedHeader);
        }
        return {value: '', icon: '', type: ''};
    }

    protected abstract getFeaturedMetaValue(selectedHeader: HeaderColumn): FeaturedValue;

    protected abstract getFeaturedImmediateValue(selectedHeader: HeaderColumn): FeaturedValue;
}
