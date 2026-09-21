import {SortChangeDescription} from '../../header/models/user-changes/sort-change-description';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {Observable, Subscription} from 'rxjs';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HttpParams} from '@angular/common/http';
import {HeaderChangeType} from '../../header/models/user-changes/header-change-type';
import {Component, OnDestroy} from '@angular/core';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';
import {SearchIndex} from '../../search/models/search-index';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {PreferredSortableHeader} from "../../header/models/user-changes/preferred-sortable-header";
import {SortDirection} from "@angular/material/sort";
import {ModeChangeDescription} from '../../header/models/user-changes/mode-change-description';
import {HeaderMode} from '../../header/models/header-mode';

@Component({
    selector: 'ncc-abstract-sortable-view',
    template: ''
})
export abstract class AbstractSortableViewComponent implements OnDestroy {

    protected _lastHeaderSearchState: SortChangeDescription;
    protected _preferredSortableHeaders: Array<PreferredSortableHeader>;
    protected _subHeader: Subscription;

    protected constructor(protected _resolver: SearchIndexResolverService) {
        this._lastHeaderSearchState = {
            columnType: undefined,
            fieldIdentifier: '',
            sortDirection: '',
            columnIdentifier: -1,
            fieldType: undefined
        };
        this._preferredSortableHeaders = [];
    }

    ngOnDestroy(): void {
        if (this._subHeader) {
            this._subHeader.unsubscribe();
        }
    }

    public registerPreferredSortableHeaders(headers: Array<HeaderColumn>): void {
        this._lastHeaderSearchState.sortDirection = '';
        this._preferredSortableHeaders = [];
        headers.forEach(header => {
            if (!header || !header.sortDirection || header.sortDirection === '' as SortDirection) {
                return;
            }
            this._preferredSortableHeaders.push({propertyId: this.getPreferredSortableFieldId(header), sortDirection: header.sortDirection})
        })
    }

    public registerHeaderChange(headerChange$: Observable<HeaderChange>): void {
        this._subHeader = headerChange$.subscribe((header: HeaderChange) => {
            if (!header) {
                return;
            }
            const isModeChange = header.changeType === HeaderChangeType.MODE_CHANGED;
            if (isModeChange) {
                const modeChange = header.description as ModeChangeDescription;
                if (modeChange.previousMode === HeaderMode.EDIT || modeChange.previousMode === modeChange.currentMode) {
                    return;
                }
            }
            if (isModeChange || header.changeType === HeaderChangeType.SORT || header.changeType === HeaderChangeType.SEARCH) {
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
            return params.set(PaginationParams.PAGE_SORT, `${this.getSortId()},${this._lastHeaderSearchState.sortDirection}`);
        } else if (this._preferredSortableHeaders.length > 0) {
            this._preferredSortableHeaders.forEach(header => {
                params = params.append(PaginationParams.PAGE_SORT, `${header.propertyId},${header.sortDirection}`);
            })
            return params;
        } else {
            return params.set(PaginationParams.PAGE_SORT, this.getDefaultSortParam());
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
                case 'actor':
                case 'actorList':
                    return this._resolver.getIndex(this._lastHeaderSearchState.fieldIdentifier, SearchIndex.FULL_NAME, true);
                default:
                    return this._resolver.getIndex(this._lastHeaderSearchState.fieldIdentifier, SearchIndex.FULLTEXT, true);
            }
        }
    }

    protected getPreferredSortableFieldId(column: HeaderColumn): string {
        if (column.type === HeaderColumnType.META) {
            return this.getMetaFieldSortId(column.fieldIdentifier);
        } else {
            switch (column.fieldType) {
                case 'number':
                    return this._resolver.getIndex(column.fieldIdentifier, SearchIndex.NUMBER);
                case 'date':
                case 'dateTime':
                    return this._resolver.getIndex(column.fieldIdentifier, SearchIndex.TIMESTAMP);
                case 'actor':
                case 'actorList':
                    return this._resolver.getIndex(column.fieldIdentifier, SearchIndex.FULL_NAME, true);
                default:
                    return this._resolver.getIndex(column.fieldIdentifier, SearchIndex.FULLTEXT, true);
            }
        }
    }

    protected abstract getMetaFieldSortId(fieldIdentifier?: string): string;

    protected abstract getDefaultSortParam(): string;

}
