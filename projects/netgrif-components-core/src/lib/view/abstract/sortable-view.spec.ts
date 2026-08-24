import {Subject} from 'rxjs';
import {AbstractSortableViewComponent} from './sortable-view';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';
import {HeaderChange} from '../../header/models/user-changes/header-change';
import {HeaderChangeType} from '../../header/models/user-changes/header-change-type';
import {HeaderMode} from '../../header/models/header-mode';
import {HeaderType} from '../../header/models/header-type';

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

    protected getMetaFieldSortId(): string {
        return '';
    }

    protected getDefaultSortParam(): string {
        return '';
    }
}
