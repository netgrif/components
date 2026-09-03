import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';
import {FilterField} from './models/filter-field';
import {SearchService} from '../../search/search-service/search.service';
import {filter, take} from 'rxjs/operators';
import {Subscription, Observable} from 'rxjs';
import {Query} from "../../search/models/query/query";
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";

@Component({
    selector: 'ncc-abstract-filtercontent-field',
    template: ''
})
export abstract class AbstractFilterFieldContentComponent extends AbstractBaseDataFieldComponent<FilterField> implements OnDestroy {

    public filterLoaded = false;

    private readonly _searchServiceSub: Subscription;

    protected constructor(@Inject(NAE_FILTER_FIELD) protected _filterField: FilterField,
                          protected _fieldSearchService: SearchService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(dataFieldPortalData);
        this._fieldSearchService.loadFromPfql(this._filterField.value);
        this._searchServiceSub = this._fieldSearchService.loadingFromPfql$.pipe(filter(loading => !loading), take(1)).subscribe(() => {
            this.filterLoaded = true;
        });
    }

    public get editable(): boolean {
        return !!this._filterField.behavior.editable && !this.formControlRef.disabled;
    }

    ngOnDestroy(): void {
        if (this._searchServiceSub && !this._searchServiceSub.closed) {
            this._searchServiceSub.unsubscribe();
        }
    }

    public predicateQueryChanged$(): Observable<Query> {
        return this._fieldSearchService.predicateQueryChanged$;
    }

}
