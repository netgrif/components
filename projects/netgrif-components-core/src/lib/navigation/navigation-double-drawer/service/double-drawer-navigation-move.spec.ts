import {BehaviorSubject, of} from 'rxjs';
import {DoubleDrawerNavigationService} from './double-drawer-navigation.service';
import {NavigationItem} from '../../model/navigation-configs';
import {GroupNavigationConstants} from '../../model/group-navigation-constants';
import {Case} from '../../../resources/interface/case';

/**
 * Persisting of a dragged menu item (`moveRightItem`): the engine swaps the moved item with its neighbour in the
 * persisted order (`childItemIds`) on every `order_up` / `order_down` press; the result must keep the moved item next to
 * the item it was dropped next to, also when the shown order is sorted (`switchOrder`) and differs from the persisted one.
 */
describe('DoubleDrawerNavigationService.moveRightItem', () => {

    let persisted: Array<string>;
    let service: DoubleDrawerNavigationService;

    const item = (id: string): NavigationItem => ({
        resource: {stringId: id, tasks: [{transition: 'row_for_ordering', task: 'row-' + id}]} as unknown as Case
    } as NavigationItem);

    const setup = (order: Array<string>, shown: Array<string>) => {
        persisted = [...order];
        const parent = {
            stringId: 'parent',
            immediateData: [{stringId: GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS, get value() { return persisted; }}],
            tasks: [{transition: 'children_order', task: 'order'}]
        } as unknown as Case;
        // only the members used by moveRightItem
        service = Object.create(DoubleDrawerNavigationService.prototype);
        Object.assign(service, {
            _rightItems$: new BehaviorSubject<Array<NavigationItem>>(shown.map(item)),
            _currentNode: {},
            _log: {error: () => {}},
            _uriService: {getItemCaseByNodePath: () => of({content: [parent]})},
            _taskResourceService: {
                assignTask: () => of({success: 'ok'}),
                finishTask: () => of({success: 'ok'}),
                cancelTask: () => of({success: 'ok'}),
                // the engine: one swap of the row with its neighbour
                setData: (_task: string, body: any) => {
                    const row = Object.keys(body)[0];
                    const id = row.replace('row-', '');
                    const i = persisted.indexOf(id);
                    const j = body[row].order_down ? i + 1 : i - 1;
                    [persisted[i], persisted[j]] = [persisted[j], persisted[i]];
                    return of({success: 'ok'});
                }
            }
        });
    };

    const move = (from: number, to: number) => {
        let done = false;
        service.moveRightItem(from, to).subscribe({complete: () => done = true});
        expect(done).toBeTrue();
    };

    it('keeps the persisted order of a custom (not sorted) list', () => {
        setup(['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D']);
        move(0, 2);
        expect(persisted).toEqual(['B', 'C', 'A', 'D']);
        expect(service.rightItems.map(i => (i.resource as Case).stringId)).toEqual(['B', 'C', 'A', 'D']);
    });

    it('moves up next to the following item in a sorted list', () => {
        // shown A-Z, persisted in another order: Zeta dragged to the top lands before Alpha (it moved down before)
        setup(['Gamma', 'Zeta', 'Alpha', 'Beta'], ['Alpha', 'Beta', 'Gamma', 'Zeta']);
        move(3, 0);
        expect(persisted).toEqual(['Gamma', 'Zeta', 'Alpha', 'Beta']);
        expect(persisted.indexOf('Zeta')).toBe(persisted.indexOf('Alpha') - 1);
    });

    it('moves down next to the preceding item in a sorted list', () => {
        setup(['Gamma', 'Zeta', 'Alpha', 'Beta'], ['Alpha', 'Beta', 'Gamma', 'Zeta']);
        move(0, 2);
        expect(persisted).toEqual(['Gamma', 'Alpha', 'Zeta', 'Beta']);
        expect(persisted.indexOf('Alpha')).toBe(persisted.indexOf('Gamma') + 1);
    });
});
