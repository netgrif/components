import {TabTestComponent} from './opened-tab.spec';
import {TabView} from './tab-view';
import {inject, TestBed} from '@angular/core/testing';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TestViewService} from '../../utility/tests/test-view-service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {RouterTestingModule} from '@angular/router/testing';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TabSessionPersistenceService} from '../services/tab-session-persistence.service';
import {PersistedTabState, TabPersistenceAdapter, TabRestoreContext} from '../interfaces';

describe('TabView', () => {
    let viewService: ViewService;
    let logger: LoggerService;
    let persistence: TabSessionPersistenceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
            ]
        });
        viewService = TestBed.inject(ViewService);
        logger = TestBed.inject(LoggerService);
        persistence = TestBed.inject(TabSessionPersistenceService);
        persistence.clear();
    });

    it('should create an instance', () => {
        expect(new TabView(viewService, logger, [], undefined)).toBeTruthy();
    });

    it('should play with tabs', () => {
        const tabs = new TabView(viewService, logger, [{
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }], undefined);
        tabs.openTab({
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TabTestComponent
        }, true);

        expect(tabs.selectedIndex.value).toEqual(1);
        tabs.switchToTabIndex(0);
        expect(tabs.selectedIndex.value).toEqual(0);
        tabs.switchToTabUniqueId('1');
        expect(tabs.selectedIndex.value).toEqual(1);

        tabs.openTab({
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }, false);
        tabs.initializeTab(2);
        tabs.switchToTabIndex(2);
        expect(tabs.selectedIndex.value).toEqual(2);

        tabs.closeTabIndex(2);
        expect(tabs.openedTabs.length).toEqual(2);

        expect(() => {
            tabs.closeTabIndex(1);
        }).toThrowError('Tab at index 1 can\'t be closed');

        expect(() => {
            tabs.closeTabUniqueId('1');
        }).toThrowError('Tab with ID 1 can\'t be closed');

        tabs.closeTabUniqueId('0');
        expect(tabs.openedTabs.length).toEqual(1);
    });

    // NAE-990
    it('should open existing tab', () => {
        const tabView = new TabView(viewService, logger, [], undefined);
        expect(tabView.openedTabs.length).toEqual(0);
        tabView.openTab({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            injectedObject: {
                baseFilter: SimpleFilter.fromTaskQuery({case: {id: 'caseId'}})
            }
        }, true);
        expect(tabView.openedTabs.length).toEqual(1);
        expect(tabView.selectedIndex.value).toEqual(0);
        tabView.openTab({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            injectedObject: {
                baseFilter: SimpleFilter.fromTaskQuery({case: {id: 'differentCaseId'}})
            }
        }, true);
        expect(tabView.openedTabs.length).toEqual(2);
        expect(tabView.selectedIndex.value).toEqual(1);
        tabView.openTab({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            injectedObject: {
                baseFilter: SimpleFilter.fromTaskQuery({case: {id: 'caseId'}})
            }
        }, true);
        expect(tabView.openedTabs.length).toEqual(2);
        expect(tabView.selectedIndex.value).toEqual(0);
    });

    it('should return correct tab uniqueId', () => {
        const tabView = new TabView(viewService, logger, [], undefined);
        const firstTabId = tabView.openTab({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            injectedObject: {
                baseFilter: SimpleFilter.fromTaskQuery({case: {id: 'caseId'}})
            }
        }, true);
        expect(firstTabId).toBeTruthy();
        const secondTabId = tabView.openTab({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            injectedObject: {
                baseFilter: SimpleFilter.fromTaskQuery({case: {id: 'differentCaseId'}})
            }
        }, true);
        expect(secondTabId).toBeTruthy();
        expect(firstTabId === secondTabId).toBeFalse();
        const thirdTabId = tabView.openTab({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            injectedObject: {
                baseFilter: SimpleFilter.fromTaskQuery({case: {id: 'caseId'}})
            }
        }, true);
        expect(thirdTabId).toBeTruthy();
        expect(thirdTabId === firstTabId).toBeTrue();
    });

    it('should emit on tab close', done => {
        const tabs = new TabView(viewService, logger, [{
            label: {text: 'tab title'},
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }, {
            label: {text: 'tab 2 title'},
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }], undefined);

        expect(tabs.openedTabs.length).toBe(2);
        let callbackCount = 0;
        tabs.openedTabs[0].tabClosed$.subscribe(() => {
            callbackCount++;
            if (callbackCount === 2) {
                done();
            }
        });
        tabs.openedTabs[1].tabClosed$.subscribe(() => {
            callbackCount++;
            if (callbackCount === 2) {
                done();
            }
        });
        tabs.closeTabUniqueId('0');
        tabs.closeTabIndex(0);
    });

    it('should pin and unpin a pinnable tab', () => {
        const tabView = new TabView(viewService, logger, [{
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }], undefined, undefined, true);

        tabView.pinTabIndex(0);
        expect(tabView.openedTabs[0].pinned).toBeTrue();
        expect(() => tabView.closeTabIndex(0)).toThrowError(`Tab at index 0 can't be closed`);

        tabView.unpinTabUniqueId(tabView.openedTabs[0].uniqueId);
        tabView.closeTabIndex(0);
        expect(tabView.openedTabs.length).toEqual(0);
    });

    it('should disable pinning by default', () => {
        const tabView = new TabView(viewService, logger, [{
            canBeClosed: true,
            pinnable: true,
            tabContentComponent: TabTestComponent
        }], undefined);

        expect(tabView.openedTabs[0].pinnable).toBeFalse();
        expect(() => tabView.pinTabIndex(0)).toThrowError(`Tab at index 0 can't be pinned`);
    });

    it('should restore tabs only in their persistence scope', () => {
        const initialTab = () => ({
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'root', type: 'initial'}
        });
        const adapter: TabPersistenceAdapter = {
            restore: (state: PersistedTabState, context: TabRestoreContext) => ({
                canBeClosed: true,
                tabContentComponent: TabTestComponent,
                label: state.label
            })
        };
        const first = new TabView(viewService, logger, [initialTab()], undefined, {
            key: 'view-a',
            service: persistence,
            adapter
        }, true);
        const dynamicId = first.openTab({
            label: {text: 'Case'},
            canBeClosed: true,
            tabContentComponent: TabTestComponent,
            parentUniqueId: first.openedTabs[0].uniqueId,
            persistence: {id: 'case:1', type: 'case'}
        }, true);
        first.pinTabUniqueId(dynamicId);

        const restored = new TabView(viewService, logger, [initialTab()], undefined, {
            key: 'view-a',
            service: persistence,
            adapter
        }, true);
        expect(restored.openedTabs.length).toEqual(2);
        expect(restored.openedTabs[1].pinned).toBeTrue();
        expect(restored.selectedIndex.value).toEqual(1);
        expect(restored.openedTabs[1].parentUniqueId).toEqual(restored.openedTabs[0].uniqueId);

        const isolated = new TabView(viewService, logger, [initialTab()], undefined, {
            key: 'view-b',
            service: persistence,
            adapter
        }, true);
        expect(isolated.openedTabs.length).toEqual(1);
    });

    it('should persist only pinned dynamic tabs and remove them after unpin', () => {
        const tabView = new TabView(viewService, logger, [{
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'root', type: 'initial'}
        }], undefined, {
            key: 'view-a',
            service: persistence,
            adapter: {
                restore: () => undefined
            }
        }, true);
        const dynamicId = tabView.openTab({
            canBeClosed: true,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'case:1', type: 'case'}
        }, true);

        expect(persistence.load('view-a')).toBeUndefined();

        tabView.pinTabUniqueId(dynamicId);

        expect(persistence.load('view-a')?.tabs.map(tab => tab.persistence.id)).toEqual(['case:1']);

        tabView.unpinTabUniqueId(dynamicId);

        expect(tabView.openedTabs.length).toEqual(2);
        expect(persistence.load('view-a')).toBeUndefined();
    });

    it('should ignore unpinned dynamic tabs from an existing session state', () => {
        persistence.save('view-a', {
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
                pinned: false,
                initial: false
            }]
        });
        const restore = jasmine.createSpy('restore');

        const tabView = new TabView(viewService, logger, [{
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'root', type: 'initial'}
        }], undefined, {
            key: 'view-a',
            service: persistence,
            adapter: {restore}
        }, true);

        expect(tabView.openedTabs.length).toEqual(1);
        expect(tabView.selectedIndex.value).toEqual(0);
        expect(restore).not.toHaveBeenCalled();
        expect(persistence.load('view-a')).toBeUndefined();
    });

    it('should discard persisted pinned tabs when pinning is disabled', () => {
        persistence.save('view-a', {
            version: TabSessionPersistenceService.STATE_VERSION,
            selectedTabId: 'case:1',
            tabs: [{
                persistence: {id: 'case:1', type: 'case'},
                order: 0,
                pinned: true,
                initial: false
            }]
        });
        const restore = jasmine.createSpy('restore');

        const tabView = new TabView(viewService, logger, [{
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'root', type: 'initial'}
        }], undefined, {
            key: 'view-a',
            service: persistence,
            adapter: {restore}
        });

        expect(tabView.openedTabs.length).toEqual(1);
        expect(restore).not.toHaveBeenCalled();
        expect(persistence.load('view-a')).toBeUndefined();
    });

    it('should restore a selected non-default initial tab without storing initial tabs', () => {
        const initialTabs = () => [{
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'root', type: 'initial'}
        }, {
            canBeClosed: false,
            tabContentComponent: TabTestComponent,
            persistence: {id: 'secondary', type: 'initial'}
        }];
        const first = new TabView(viewService, logger, initialTabs(), undefined, {
            key: 'view-a',
            service: persistence
        });

        first.switchToTabIndex(1);

        expect(persistence.load('view-a')?.tabs).toEqual([]);
        expect(persistence.load('view-a')?.selectedTabId).toEqual('secondary');

        const restored = new TabView(viewService, logger, initialTabs(), undefined, {
            key: 'view-a',
            service: persistence
        });

        expect(restored.selectedIndex.value).toEqual(1);
    });

    afterEach(() => {
        persistence.clear();
        TestBed.resetTestingModule();
    });
});
