import {Subject} from 'rxjs';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {Case} from '../../../resources/interface/case';
import {GroupNavigationConstants} from '../../model/group-navigation-constants';
import {NavigationItem} from '../../model/navigation-configs';
import {DoubleDrawerNavigationService} from './double-drawer-navigation.service';

describe('DoubleDrawerNavigationService', () => {
    let service: DoubleDrawerNavigationService;
    let languageChanges: Subject<TranslationChangeEvent>;
    let translateService: TranslateService;
    let caseResourceService: jasmine.SpyObj<any>;

    beforeEach(() => {
        languageChanges = new Subject<TranslationChangeEvent>();
        translateService = {
            currentLang: 'en-US',
            onLangChange: languageChanges.asObservable(),
        } as TranslateService;
        caseResourceService = jasmine.createSpyObj('CaseResourceService', ['searchCases']);

        service = new DoubleDrawerNavigationService(
            jasmine.createSpyObj('LoggerService', ['error']),
            {} as any,
            {} as any,
            caseResourceService,
            {canAccessView: () => true} as any,
            translateService,
            {route: 'drawer-double/task-view'} as any,
            {} as any,
            {} as any,
            {} as any,
        );
    });

    afterEach(() => {
        service.ngOnDestroy();
        languageChanges.complete();
    });

    it('recalculates loaded process menu titles after a language change without reloading cases', () => {
        const leftItem = service.resolveItemCaseToNavigationItem(createMenuItemCase('left'));
        const rightItem = service.resolveItemCaseToNavigationItem(createMenuItemCase('right'));
        const moreItem = service.resolveItemCaseToNavigationItem(createMenuItemCase('more'));
        const customItem = {
            id: 'custom',
            access: {},
            navigation: {
                title: 'custom.translation.key',
                translate: true,
            },
            routing: {path: 'custom'},
        } as NavigationItem;

        service.leftItems$.next([leftItem]);
        service.rightItems$.next([rightItem, customItem]);
        service.moreItems$.next([moreItem]);

        expect(service.leftItems[0].navigation['title']).toBe('English left');
        expect(service.rightItems[0].navigation['title']).toBe('English right');
        expect(service.moreItems[0].navigation['title']).toBe('English more');

        translateService.currentLang = 'sk-SK';
        languageChanges.next({lang: 'sk-SK', translations: {}});

        expect(service.leftItems[0].navigation['title']).toBe('Slovensky left');
        expect(service.rightItems[0].navigation['title']).toBe('Slovensky right');
        expect(service.moreItems[0].navigation['title']).toBe('Slovensky more');
        expect(service.rightItems[1]).toBe(customItem);
        expect(caseResourceService.searchCases).not.toHaveBeenCalled();
    });

    it('uses the default menu title when the selected translation is missing', () => {
        translateService.currentLang = 'de';

        const item = service.resolveItemCaseToNavigationItem(createMenuItemCase('fallback'));

        expect(item.navigation['title']).toBe('Default fallback');
    });

    it('uses childItemIds order as fallback, appends unordered nae.json items and paginates afterwards', () => {
        const processItems = Array.from({length: 25}, (_, index) => navigationItem(`process-${index + 1}`));
        const customItem = navigationItem('custom');

        service.rightItems$.next(processItems.slice(0, 20));
        service.moreItems$.next(processItems.slice(20));
        (service as any)._currentPath = '/menu';
        (service as any)._childCustomViews = {'/menu': {custom: customItem}};

        (service as any).resolveCustomViewsInRightSide();

        expect(service.rightItems.map(item => item.id)).toEqual(
            Array.from({length: 20}, (_, index) => `process-${index + 1}`)
        );
        expect(service.moreItems.map(item => item.id)).toEqual([
            'process-21',
            'process-22',
            'process-23',
            'process-24',
            'process-25',
            'custom',
        ]);
    });

    it('mixes process and nae.json order globally before pagination', () => {
        const processItems = Array.from({length: 25}, (_, index) =>
            navigationItem(`process-${index + 1}`, index + 1)
        );
        const customItem = navigationItem('custom', 5.5, false);

        service.rightItems$.next(processItems.slice(0, 20));
        service.moreItems$.next(processItems.slice(20));
        (service as any)._currentPath = '/menu';
        (service as any)._childCustomViews = {'/menu': {custom: customItem}};

        (service as any).resolveCustomViewsInRightSide();

        expect(service.rightItems.map(item => item.id)).toEqual([
            'process-1',
            'process-2',
            'process-3',
            'process-4',
            'process-5',
            'custom',
            ...Array.from({length: 14}, (_, index) => `process-${index + 6}`),
        ]);
        expect(service.moreItems.map(item => item.id)).toEqual(
            Array.from({length: 6}, (_, index) => `process-${index + 20}`)
        );
    });

    it('orders hidden nae.json rail items and keeps missing order last', () => {
        const hiddenItem = (id: string, order?: number) => ({
            navigation: {title: id, hidden: true, ...(order === undefined ? {} : {order})},
            routing: {path: id},
        }) as any;

        (service as any).resolveHiddenMenuItemFromChildViews('/hidden-10', hiddenItem('hidden-10', 10));
        (service as any).resolveHiddenMenuItemFromChildViews('/hidden-none', hiddenItem('hidden-none'));
        (service as any).resolveHiddenMenuItemFromChildViews('/hidden-1', hiddenItem('hidden-1', 1));

        expect(service.hiddenCustomItems.map(item => item.id)).toEqual([
            '/hidden-1',
            '/hidden-10',
            '/hidden-none',
        ]);
    });

    it('alphabetically sorts the complete right side and paginates the result', () => {
        const items = Array.from({length: 25}, (_, index) => navigationItem(String(25 - index).padStart(2, '0')));
        service.rightItems$.next(items.slice(0, 20));
        service.moreItems$.next(items.slice(20));

        service.switchOrder();

        const allSortedIds = service.rightItems.concat(service.moreItems).map(item => item.id);
        expect(allSortedIds).toEqual([...items].sort((a, b) => b.id.localeCompare(a.id)).map(item => item.id));
        expect(service.rightItems.length).toBe(20);
        expect(service.moreItems.length).toBe(5);
    });
});

function navigationItem(id: string, order?: number, process = true): NavigationItem {
    const item = {
        id,
        access: 'private',
        navigation: process || order === undefined ? {title: id} : {title: id, order},
        routing: {path: id},
    } as NavigationItem;
    if (process) {
        item.resource = {
            immediateData: order === undefined ? [] : [{
                stringId: GroupNavigationConstants.ITEM_FIELD_ID_ORDER,
                type: 'number',
                value: order,
            }],
        } as Case;
    }
    return item;
}

function createMenuItemCase(id: string): Case {
    return {
        stringId: id,
        title: `Case title ${id}`,
        immediateData: [
            {
                stringId: GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH,
                type: 'text',
                value: `/${id}`,
            },
            {
                stringId: GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME,
                type: 'i18n',
                value: {
                    defaultValue: `Default ${id}`,
                    translations: {
                        en: `English ${id}`,
                        sk: `Slovensky ${id}`,
                    },
                },
            },
            {
                stringId: GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON,
                type: 'text',
                value: 'home',
            },
        ],
        tasks: [{transition: 'item_settings', task: `${id}-task`}],
    } as Case;
}
