import {ReplaySubject, Subject} from 'rxjs';
import {AbstractViewWithHeadersComponent} from './view-with-headers';
import {AbstractSortableViewComponent} from './sortable-view';
import {AbstractHeaderComponent} from '../../header/abstract-header.component';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {HeaderChange} from '../../header/models/user-changes/header-change';

describe('AbstractViewWithHeadersComponent', () => {
    it('should register and reload sorts that were applied before header initialization', () => {
        const selectedHeaders$ = new ReplaySubject<Array<HeaderColumn>>(1);
        const appliedSorts$ = new ReplaySubject<Array<HeaderColumn>>(1);
        const headerChange$ = new Subject<HeaderChange>();
        const sortableView = jasmine.createSpyObj<AbstractSortableViewComponent>(
            'AbstractSortableViewComponent',
            ['registerHeaderChange', 'registerPreferredSortableHeaders', 'reload']
        );
        const header = new HeaderColumn(HeaderColumnType.META, 'title', 'Title', 'text');
        header.sortDirection = 'asc';
        selectedHeaders$.next([header]);
        appliedSorts$.next([header]);
        const headerComponent = {
            headerService: {
                selectedHeaders$,
                appliedSorts$,
                headerChange$
            }
        } as unknown as AbstractHeaderComponent;
        const component = new TestViewWithHeadersComponent(sortableView);

        component.initialize(headerComponent);

        expect(sortableView.registerHeaderChange).toHaveBeenCalledWith(headerChange$);
        expect(sortableView.registerPreferredSortableHeaders).toHaveBeenCalledWith([header]);
        expect(sortableView.reload).toHaveBeenCalledTimes(1);
    });
});

class TestViewWithHeadersComponent extends AbstractViewWithHeadersComponent {
    constructor(sortableView: AbstractSortableViewComponent) {
        super(sortableView);
    }

    public initialize(headerComponent: AbstractHeaderComponent): void {
        this.initializeHeader(headerComponent);
    }
}
