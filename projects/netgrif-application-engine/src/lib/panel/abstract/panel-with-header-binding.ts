import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';


export abstract class PanelWithHeaderBinding implements OnInit {
    public selectedHeaders$: Observable<Array<HeaderColumn>>;
    public firstFeaturedValue: string;
    public featuredFieldsValues: Array<{ value: string, icon: string }> = [];
    protected _lastSelectedHeaders: Array<HeaderColumn>;

    protected constructor() {
    }

    ngOnInit(): void {
        this.selectedHeaders$.subscribe(newSelectedHeaders => {
            this._lastSelectedHeaders = newSelectedHeaders;
            this.resolveFeaturedFieldsValues();
        });
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

    protected getFeaturedValue(selectedHeader: HeaderColumn) {
        if (!selectedHeader) {
            return {value: '', icon: ''};
        }
        if (selectedHeader.type === HeaderColumnType.META) {
            return this.getFeaturedMetaValue(selectedHeader);
        }
        if (selectedHeader.type === HeaderColumnType.IMMEDIATE) {
            return this.getFeaturedImmediateValue(selectedHeader);
        }
        return {value: '', icon: ''};
    }

    protected abstract getFeaturedMetaValue(selectedHeader: HeaderColumn);

    protected abstract getFeaturedImmediateValue(selectedHeader: HeaderColumn);
}
