import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SortModeComponent} from './sort-mode.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {Component} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    TranslateLibModule,
    CaseHeaderService,
    AuthenticationMethodService,
    CaseViewService,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    ViewService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TestViewService,
    MockAuthenticationMethodService
} from '@netgrif/application-engine';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('SortModeComponent', () => {
    let component: SortModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
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
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: CaseViewService, useValue: {allowedNets$: of([])}}
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

