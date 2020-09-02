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
} from '@netgrif/application-engine';
import {RouterModule} from '@angular/router';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {of} from 'rxjs';

describe('SortModeComponent', () => {
    let component: SortModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

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
                RouterModule.forRoot([])
            ],
            providers: [
                CaseHeaderService,
                AuthenticationMethodService,
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
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'sortHeaderChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call sort header changed', () => {
        component.sortHeaderChanged({active: '7-hello', direction: 'asc'});
        expect(headerSpy).toHaveBeenCalledWith(7, 'hello', 'asc');
    });

    afterAll(() => {
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

