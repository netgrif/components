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

describe('TabView', () => {
    let viewService: ViewService;
    let logger: LoggerService;

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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
