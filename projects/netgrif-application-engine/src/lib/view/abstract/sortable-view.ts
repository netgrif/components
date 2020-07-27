import {SortChangeDescription} from '../../header/models/user-changes/sort-change-description';
import {HeaderColumnType} from '../../header/models/header-column';
import {Observable} from 'rxjs';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderMode} from '../../header/models/header-mode';
import {HttpParams} from '@angular/common/http';


export abstract class SortableView {

    protected _lastHeaderSearchState: SortChangeDescription;

    protected constructor() {
        this._lastHeaderSearchState = {
            columnType: undefined,
            fieldIdentifier: '',
            sortDirection: '',
        };
    }

    public registerHeaderChange(headerChange$: Observable<HeaderChange>): void {
        headerChange$.subscribe((header: HeaderChange) => {
            if (!header) {
                return;
            }
            if (header.mode === HeaderMode.SORT || header.mode === HeaderMode.SEARCH) {
                if (header.mode === HeaderMode.SORT) {
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
            return `dataSet.${this._lastHeaderSearchState.fieldIdentifier}.sortable`;
        }
    }

    protected abstract getMetaFieldSortId(): string;

    protected abstract getDefaultSortParam(): string;

}
