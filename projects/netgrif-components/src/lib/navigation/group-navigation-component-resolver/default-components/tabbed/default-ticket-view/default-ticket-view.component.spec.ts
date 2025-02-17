import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultTicketViewComponent} from './default-ticket-view.component';
import {NavigationComponentModule} from "../../../../navigation.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {
    AuthenticationMethodService,
    AuthenticationModule,
    AuthenticationService,
    ConfigurationService,
    HeaderMode,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserPreferenceService,
    MockUserResourceService,
    NAE_TAB_DATA,
    TestConfigurationService,
    TestMockDependenciesModule,
    TranslateLibModule,
    UserPreferenceService,
    UserResourceService,
    ViewIdService
} from "@netgrif/components-core";
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";

describe('DefaultTicketViewComponent', () => {
    let component: DefaultTicketViewComponent;
    let fixture: ComponentFixture<DefaultTicketViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultTicketViewComponent],
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                MaterialModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                CommonModule,
                FlexModule,
                FlexLayoutModule,
                TranslateLibModule,
                AuthenticationModule
            ],
            providers: [
                {provide: ViewIdService, useValue: {viewId: 'test_view_id'}},
                {
                    provide: NAE_TAB_DATA,
                    useValue: {
                        allowedNets: [],
                        tabUniqueId: '1',
                        tabSelected$: of(true),
                        tabClosed$: of(),
                        searchTypeConfiguration: {
                            initialSearchMode: HeaderMode.SORT,
                            showSearchToggleButton: true
                        },
                        headersChangeable: true,
                        headersMode: [],
                        allowTableMode: true,
                        defaultHeadersMode: HeaderMode.SORT,
                        showMoreMenu: true
                    }
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTicketViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
