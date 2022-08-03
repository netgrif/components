import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {FeaturedValue} from './featured-value';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'ncc-abstract-panel-with-header-binding',
    template: ''
})
export abstract class AbstractPanelWithHeaderBindingComponent implements OnInit, OnDestroy {
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

    /**
     * If the event was cause by selecting some text, it will not propagate
     * @param event
     */
    public preventSelectionClick(event: MouseEvent): void {
        if (event.view.getSelection().type === 'Range') {
            event.stopPropagation();
        }
    }

    protected resolveFeaturedFieldsValues(): void {
        if (!this._lastSelectedHeaders) {
            return;
        }

        this.featuredFieldsValues.splice(0, this.featuredFieldsValues.length);
        this.featuredFieldsValues.push(
            ...this._lastSelectedHeaders.map<FeaturedValue>(item => this.getFeaturedValue(item))
        );
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
