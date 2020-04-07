import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';


export abstract class PanelWithHeaderBinding implements OnInit {
    public selectedHeaders$: Observable<Array<HeaderColumn>>;
    public firstFeaturedValue: string;
    public featuredFieldsValues: Array<string> = [];

    protected constructor() {
    }

    ngOnInit(): void {
        this.selectedHeaders$.subscribe(newSelectedHeaders => this.resolveFeaturedFieldsValues(newSelectedHeaders));
    }

    protected resolveFeaturedFieldsValues(selectedHeaderFields: Array<HeaderColumn>): void {
        this.featuredFieldsValues.splice(0, this.featuredFieldsValues.length);
        this.firstFeaturedValue = this.getFeaturedValue(selectedHeaderFields[0]);
        for (let i = 1; i < selectedHeaderFields.length; i++) {
            this.featuredFieldsValues.push(this.getFeaturedValue(selectedHeaderFields[i]));
        }
    }

    protected getFeaturedValue(selectedHeader: HeaderColumn): string {
        if (!selectedHeader) {
           return '';
        }
        if (selectedHeader.type === HeaderColumnType.META) {
            return this.getFeaturedMetaValue(selectedHeader);
        }
        if (selectedHeader.type === HeaderColumnType.IMMEDIATE) {
            return this.getFeaturedImmediateValue(selectedHeader);
        }
        return '';
    }

    protected abstract getFeaturedMetaValue(selectedHeader: HeaderColumn): string;

    protected abstract getFeaturedImmediateValue(selectedHeader: HeaderColumn): string;
}
