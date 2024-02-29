import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SortModeComponent} from './sort-mode.component';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {Component} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    AuthenticationMethodService,
    AuthenticationService,
    CaseHeaderService,
    CaseViewService,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    OverflowService,
    TestConfigurationService,
    TestNoAllowedNetsFactory,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService
} from '@netgrif/components-core';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('SortModeComponent', () => {
    let component: SortModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseHeaderService,
                OverflowService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: CaseViewService, useValue: {allowedNets$: of([])}},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [SortModeComponent, TestWrapperComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-sort-mode [headerService]="service"></nc-sort-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}

