import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs';
import {MatSelectionListChange} from '@angular/material/list';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {FilterType} from '../../../filter/models/filter-type';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {SideMenuControl} from '../../models/side-menu-control';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Component, Inject} from '@angular/core';
import {AbstractFilterSelectorComponent} from './abstract-filter-selector.component';
import {FilterRepository} from '../../../filter/filter.repository';

describe('AbstractFilterSelectorComponent', () => {
    let component: TestFilterSelectorComponent;
    let fixture: ComponentFixture<TestFilterSelectorComponent>;
    let sideMenuSpy: jasmine.Spy;
    let sideMenuCloseSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestFilterSelectorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFilterSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        sideMenuSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'publish');
        sideMenuCloseSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'close');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test functions', () => {
        component.filterFilters('');
        component.caseFilterSelected({options: [{selected: undefined}]} as MatSelectionListChange);
        component.taskFilterSelected({options: [{selected: undefined}]} as MatSelectionListChange);

        component.filterSelected(new SimpleFilter('', FilterType.TASK, {}));
        expect(sideMenuSpy).toHaveBeenCalled();

        component.filterSelectionConfirmed();
        expect(sideMenuCloseSpy).toHaveBeenCalled();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-files',
    template: ''
})
class TestFilterSelectorComponent extends AbstractFilterSelectorComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _filterRepository: FilterRepository) {
        super(_sideMenuControl, _filterRepository);
    }
}

