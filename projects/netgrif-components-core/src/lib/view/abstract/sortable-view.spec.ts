import {Subject} from 'rxjs';
import {AbstractSortableViewComponent} from './sortable-view';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderChangeType} from '../../header/models/user-changes/header-change-type';
import {HeaderMode} from '../../header/models/header-mode';
import {HeaderType} from '../../header/models/header-type';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {HttpParams} from '@angular/common/http';
import {PaginationParams} from '../../utility/pagination/pagination-params';

describe('AbstractSortableViewComponent', () => {
    it('should preserve real mode-change reloads and skip reloads already handled by applied sorts', () => {
        const component = new TestSortableViewComponent();
        const changes$ = new Subject<HeaderChange>();
        const reloadSpy = spyOn(component, 'reload');
        component.registerHeaderChange(changes$);

        changes$.next(modeChange(HeaderMode.SEARCH, HeaderMode.SORT));
        changes$.next(modeChange(HeaderMode.EDIT, HeaderMode.SORT));
        changes$.next(modeChange(HeaderMode.SORT, HeaderMode.SORT));

        expect(reloadSpy).toHaveBeenCalledTimes(1);

        changes$.next({
            headerType: HeaderType.CASE,
            changeType: HeaderChangeType.SORT,
            description: undefined
        });

        expect(reloadSpy).toHaveBeenCalledTimes(2);
        component.ngOnDestroy();
    });

    it('should replace stale direct sorting with preferred sorting', () => {
        const component = new TestSortableViewComponent();
        const changes$ = new Subject<HeaderChange>();
        component.registerHeaderChange(changes$);
        changes$.next({
            headerType: HeaderType.CASE,
            changeType: HeaderChangeType.SORT,
            description: {
                columnType: HeaderColumnType.META,
                fieldIdentifier: 'legacy',
                sortDirection: 'asc',
                columnIdentifier: 0,
                fieldType: 'text'
            }
        });
        const firstHeader = new HeaderColumn(HeaderColumnType.META, 'first', 'First', 'text');
        const secondHeader = new HeaderColumn(HeaderColumnType.META, 'second', 'Second', 'text');
        firstHeader.sortDirection = 'desc';
        secondHeader.sortDirection = 'asc';

        component.registerPreferredSortableHeaders([firstHeader, secondHeader]);

        expect(component.sortParams(new HttpParams()).getAll(PaginationParams.PAGE_SORT))
            .toEqual(['first,desc', 'second,asc']);
        component.ngOnDestroy();
    });
});

function modeChange(previousMode: HeaderMode, currentMode: HeaderMode): HeaderChange {
    return {
        headerType: HeaderType.CASE,
        changeType: HeaderChangeType.MODE_CHANGED,
        description: {previousMode, currentMode}
    };
}

class TestSortableViewComponent extends AbstractSortableViewComponent {
    constructor() {
        super({} as SearchIndexResolverService);
    }

    public reload(): void {
    }

    public sortParams(params: HttpParams): HttpParams {
        return this.addSortParams(params);
    }

    protected getMetaFieldSortId(fieldIdentifier?: string): string {
        return fieldIdentifier ?? '';
    }

    protected getDefaultSortParam(): string {
        return '';
    }
}
