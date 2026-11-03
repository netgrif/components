import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TabSessionPersistenceService} from './tab-session-persistence.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_TAB_PERSISTENCE_STORAGE, TabPersistenceStorage} from './tab-persistence-storage';
import {TabPersistenceService} from './tab-persistence.service';

class TestTabPersistenceStorage implements TabPersistenceStorage {
    private readonly _items = new Map<string, string>();

    get length(): number {
        return this._items.size;
    }

    getItem(key: string): string | null {
        return this._items.get(key) ?? null;
    }

    key(index: number): string | null {
        return Array.from(this._items.keys())[index] ?? null;
    }

    removeItem(key: string): void {
        this._items.delete(key);
    }

    setItem(key: string, value: string): void {
        this._items.set(key, value);
    }
}

describe('TabSessionPersistenceService', () => {
    let service: TabSessionPersistenceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(TabSessionPersistenceService);
        service.clear();
    });

    it('should save and load an isolated state', () => {
        service.save('view-a', {
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'case:1',
            tabs: [{
                persistence: {id: 'root', type: 'initial'},
                order: 0,
                pinned: false,
                initial: true
            }, {
                persistence: {id: 'case:1', type: 'case'},
                order: 0,
                pinned: true,
                initial: false
            }]
        });

        expect(service.load('view-a')?.selectedTabId).toEqual('case:1');
        expect(service.load('view-b')).toBeUndefined();
    });

    it('should not store a default-only state', () => {
        service.save('view-a', {
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'root',
            tabs: [{
                persistence: {id: 'root', type: 'initial'},
                order: 0,
                pinned: false,
                initial: true
            }]
        });

        expect(service.load('view-a')).toBeUndefined();
        expect(sessionStorage.length).toEqual(0);
    });

    it('should remove existing default-only states on initialization', () => {
        service.save('view-a', {
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'case:1',
            tabs: [{
                persistence: {id: 'case:1', type: 'case'},
                order: 0,
                pinned: false,
                initial: false
            }]
        });
        const key = sessionStorage.key(0) as string;
        sessionStorage.setItem(key, JSON.stringify({
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'root',
            tabs: [{
                persistence: {id: 'root', type: 'initial'},
                order: 0,
                pinned: false,
                initial: true
            }]
        }));

        new TabPersistenceService(TestBed.inject(LoggerService), sessionStorage);

        expect(sessionStorage.getItem(key)).toBeNull();
    });

    it('should discard malformed and incompatible states', () => {
        service.save('broken', {
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'case:1',
            tabs: [{
                persistence: {id: 'case:1', type: 'case'},
                order: 0,
                pinned: false,
                initial: false
            }]
        });
        const key = Array.from({length: sessionStorage.length}, (_, index) => sessionStorage.key(index))
            .find(storageKey => storageKey.startsWith(TabSessionPersistenceService.STORAGE_PREFIX)
                && storageKey.endsWith('broken')) as string;
        sessionStorage.setItem(key, '{broken');
        expect(service.load('broken')).toBeUndefined();
        expect(sessionStorage.getItem(key)).toBeNull();

        sessionStorage.setItem(key, JSON.stringify({version: -1, tabs: []}));
        expect(service.load('broken')).toBeUndefined();
        expect(sessionStorage.getItem(key)).toBeNull();
    });

    it('should keep the last valid state when the tab limit is exceeded', () => {
        const validState = {
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'case:0',
            tabs: Array.from({length: TabSessionPersistenceService.MAX_TABS_PER_VIEW}, (_, index) => ({
                persistence: {id: `case:${index}`, type: 'case'},
                order: index,
                pinned: false,
                initial: false
            }))
        };
        service.save('view-a', validState);
        expect(service.load('view-a')?.tabs.length).toBe(TabSessionPersistenceService.MAX_TABS_PER_VIEW);

        service.save('view-a', {
            ...validState,
            tabs: [...validState.tabs, {
                persistence: {id: 'case:overflow', type: 'case'},
                order: TabSessionPersistenceService.MAX_TABS_PER_VIEW,
                pinned: false,
                initial: false
            }]
        });

        expect(service.load('view-a')?.tabs.length).toBe(TabSessionPersistenceService.MAX_TABS_PER_VIEW);
    });

    it('should use the storage configured by the injection token', () => {
        service.clear();
        TestBed.resetTestingModule();
        const customStorage = new TestTabPersistenceStorage();
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TAB_PERSISTENCE_STORAGE, useValue: customStorage}
            ]
        });
        const customStorageService = TestBed.inject(TabPersistenceService);

        customStorageService.save('custom-view', {
            version: TabPersistenceService.STATE_VERSION,
            selectedTabId: 'case:1',
            tabs: [{
                persistence: {id: 'case:1', type: 'case'},
                order: 0,
                pinned: true,
                initial: false
            }]
        });

        expect(customStorage.length).toEqual(1);
        expect(customStorageService.load('custom-view')?.selectedTabId).toEqual('case:1');
        customStorageService.clear();
    });

    afterEach(() => {
        service.clear();
        TestBed.resetTestingModule();
    });
});
