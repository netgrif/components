import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SearchModeComponent} from './search-mode.component';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule
} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {SearchService} from '../../../search/search-service/search.service';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../../utility/tests/test-factory-methods';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {ConfigCaseViewServiceFactory} from '../../../view/case-view/service/factory/config-case-view-service-factory';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {ViewService} from '../../../routing/view-service/view.service';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {UserValue} from '../../../data-fields/user-field/models/user-value';


describe('SearchModeComponent', () => {
    let component: SearchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                NoopAnimationsModule,
                MatSelectModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSnackBarModule,
                HttpClientTestingModule,
                TranslateLibModule,
                MaterialModule,
                RouterModule.forRoot([])
            ],
            providers: [
                ConfigCaseViewServiceFactory,
                AuthenticationMethodService,
                {   provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory},
                {   provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [ConfigCaseViewServiceFactory]},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                CaseHeaderService
            ],
            declarations: [SearchModeComponent, TestWrapperComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'headerSearchInputChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call search header', fakeAsync(() => {
        component.formControls[0].setValue('hladaj');
        tick(400);
        expect(headerSpy).toHaveBeenCalledWith(0, 'hladaj');
    }));

    it('should transform UserValue into id', fakeAsync(() => {
        component.formControls[0].setValue(new UserValue('7', '', '', ''));
        tick(400);
        expect(headerSpy).toHaveBeenCalledWith(0, '7');
    }));

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-search-mode [headerService]="service"></nae-search-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
