import {TabTestComponent} from './opened-tab.spec';
import {TabView} from './tab-view';
import {TestBed} from '@angular/core/testing';
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

describe('TabView', () => {
    let viewService: ViewService;
    let logger: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                NoopAnimationsModule
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
        expect(new TabView(viewService, logger, [])).toBeTruthy();
    });

    it('should play with tabs', () => {
        const tabs = new TabView(viewService, logger, [{
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: true,
            tabContentComponent: TabTestComponent
        }]);
        tabs.openTab({
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TabTestComponent
        }, true);

        expect(tabs.selectedIndex).toEqual(1);
        tabs.switchToTabIndex(0);
        expect(tabs.selectedIndex).toEqual(0);
        tabs.switchToTabUniqueId('1');
        expect(tabs.selectedIndex).toEqual(1);

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
        expect(tabs.selectedIndex).toEqual(2);

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
});
