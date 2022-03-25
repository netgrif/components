import {SortChangeDescription} from '../../header/models/user-changes/sort-change-description';
import {HeaderColumnType} from '../../header/models/header-column';
import {Observable, Subscription} from 'rxjs';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HttpParams} from '@angular/common/http';
import {HeaderChangeType} from '../../header/models/user-changes/header-change-type';
import {Component, OnDestroy} from '@angular/core';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';
import {SearchIndex} from '../../search/models/search-index';

@Component({
    selector: 'ncc-abstract-sortable-view',
    template: ''
})
export abstract class AbstractSortableViewComponent implements OnDestroy {

    protected _lastHeaderSearchState: SortChangeDescription;
    protected _subHeader: Subscription;

    protected constructor(protected _resolver: SearchIndexResolverService) {
        this._lastHeaderSearchState = {
            columnType: undefined,
            fieldIdentifier: '',
            sortDirection: '',
            columnIdentifier: -1,
            fieldType: undefined
        };
    }

    ngOnDestroy(): void {
        if (this._subHeader) {
            this._subHeader.unsubscribe();
        }
    }

    public registerHeaderChange(headerChange$: Observable<HeaderChange>): void {
        this._subHeader = headerChange$.subscribe((header: HeaderChange) => {
            if (!header) {
                return;
            }
            if (header.changeType === HeaderChangeType.SORT || header.changeType === HeaderChangeType.SEARCH) {
                if (header.changeType === HeaderChangeType.SORT) {
                    this._lastHeaderSearchState = header.description as SortChangeDescription;
                }
                // TODO we might not need to search all the time, do some filtering
                this.reload();
            }
        });
    }

    public abstract reload(): void;

    protected addSortParams(params: HttpParams): HttpParams {
        if (this._lastHeaderSearchState.sortDirection !== '') {
            return params.set('sort', `${this.getSortId()},${this._lastHeaderSearchState.sortDirection}`);
        } else {
            return params.set('sort', this.getDefaultSortParam());
        }
    }

    protected getSortId(): string {
        if (this._lastHeaderSearchState.columnType === HeaderColumnType.META) {
            return this.getMetaFieldSortId();
        } else {
            switch (this._lastHeaderSearchState.fieldType) {
                case 'number':
                    return this._resolver.getIndex(this._lastHeaderSearchState.fieldIdentifier, SearchIndex.NUMBER);
                case 'date':
                case 'dateTime':
                    return this._resolver.getIndex(this._lastHeaderSearchState.fieldIdentifier, SearchIndex.TIMESTAMP);
                case 'user':
                case 'userList':
                    return this._resolver.getIndex(this._lastHeaderSearchState.fieldIdentifier, SearchIndex.FULL_NAME, true);
                default:
                    return this._resolver.getIndex(this._lastHeaderSearchState.fieldIdentifier, SearchIndex.FULLTEXT, true);
            }
        }
    }

    protected abstract getMetaFieldSortId(): string;

    protected abstract getDefaultSortParam(): string;

}
