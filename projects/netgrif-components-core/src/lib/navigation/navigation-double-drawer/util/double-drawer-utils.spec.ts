import {NavigationItem} from '../../model/navigation-configs';
import {GroupNavigationConstants} from '../../model/group-navigation-constants';
import {DoubleDrawerUtils} from './double-drawer-utils';

describe('DoubleDrawerUtils', () => {
    it('sorts process and nae.json items by optional order and keeps fallback order stable', () => {
        const unorderedProcess = processItem('unordered-process');
        const configuredTen = configuredItem('configured-ten', 10);
        const processZero = processItem('process-zero', 0);
        const unorderedConfigured = configuredItem('unordered-configured');
        const processTen = processItem('process-ten', 10);
        const original = [unorderedProcess, configuredTen, processZero, unorderedConfigured, processTen];

        const result = DoubleDrawerUtils.sortByOrder(original);

        expect(result.map(item => item.id)).toEqual([
            'process-zero',
            'configured-ten',
            'process-ten',
            'unordered-process',
            'unordered-configured',
        ]);
        expect(original.map(item => item.id)).toEqual([
            'unordered-process',
            'configured-ten',
            'process-zero',
            'unordered-configured',
            'process-ten',
        ]);
    });

    it('accepts negative order and treats only non-finite values as missing', () => {
        const negative = configuredItem('negative', -1);
        const notFinite = configuredItem('not-finite', Number.POSITIVE_INFINITY);
        const ordered = configuredItem('ordered', 1);

        expect(DoubleDrawerUtils.sortByOrder([negative, notFinite, ordered]).map(item => item.id))
            .toEqual(['negative', 'ordered', 'not-finite']);
    });

    it('places an nae.json view between process menu items', () => {
        const processItems = Array.from({length: 10}, (_, index) => processItem(`process-${index + 1}`, index + 1));
        const naeJsonView = configuredItem('nae-json-view', 5.5);

        expect(DoubleDrawerUtils.sortByOrder([...processItems, naeJsonView]).map(item => item.id)).toEqual([
            'process-1',
            'process-2',
            'process-3',
            'process-4',
            'process-5',
            'nae-json-view',
            'process-6',
            'process-7',
            'process-8',
            'process-9',
            'process-10',
        ]);
    });

    it('globally sorts one hundred process items supplied in pseudo-random creation order', () => {
        const creationOrder = Array.from({length: 100}, (_, index) => ((index * 37 + 17) % 100) + 1);
        const items = creationOrder.map(order => processItem(`process-${order}`, order));
        const result = DoubleDrawerUtils.sortByOrder(items);

        expect(new Set(creationOrder).size).toBe(100);
        expect(creationOrder).not.toEqual(Array.from({length: 100}, (_, index) => index + 1));
        expect(result.slice(0, 20).map(item => item.id))
            .toEqual(Array.from({length: 20}, (_, index) => `process-${index + 1}`));
        expect(result.map(item => item.id))
            .toEqual(Array.from({length: 100}, (_, index) => `process-${index + 1}`));
    });

    it('preserves original relative order when order values are equal', () => {
        const original = [
            processItem('created-third', 7),
            configuredItem('configured-between', 7),
            processItem('created-first', 7),
        ];

        expect(DoubleDrawerUtils.sortByOrder(original).map(item => item.id)).toEqual([
            'created-third',
            'configured-between',
            'created-first',
        ]);
    });
});

function configuredItem(id: string, order?: number): NavigationItem {
    return {
        id,
        access: 'private',
        navigation: order === undefined ? {title: id} : {title: id, order},
        routing: {path: id},
    } as NavigationItem;
}

function processItem(id: string, order?: number): NavigationItem {
    return {
        id,
        access: 'private',
        navigation: {title: id},
        routing: {path: id},
        resource: {
            immediateData: order === undefined ? [] : [{
                stringId: GroupNavigationConstants.ITEM_FIELD_ID_ORDER,
                type: 'number',
                value: order,
            }],
        },
    } as NavigationItem;
}
