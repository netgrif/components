import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterSelectorComponent} from './filter-selector.component';
import {SideMenuFilterSelectorComponentModule} from './side-menu-filter-selector-component.module';
import {Observable} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    TestConfigurationService,
    UserResourceService
} from '@netgrif/components-core';

describe('FilterSelectorComponent', () => {
    let component: FilterSelectorComponent;
    let fixture: ComponentFixture<FilterSelectorComponent>;
    let sideMenuSpy: jasmine.Spy;
    let sideMenuCloseSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuFilterSelectorComponentModule,
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
                    useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        sideMenuSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'publish');
        sideMenuCloseSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'close');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

