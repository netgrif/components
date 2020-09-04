import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatSortModule} from '@angular/material/sort';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {AbstractSearchModeComponent} from './abstract-search-mode.component';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MaterialModule} from '../../../material/material.module';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {ConfigCaseViewServiceFactory} from '../../../view/case-view/service/factory/config-case-view-service-factory';
import {SearchService} from '../../../search/search-service/search.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {ViewService} from '../../../routing/view-service/view.service';
import {ConfigurationService} from '../../../configuration/configuration.service';

describe('AbstractSearchModeComponent', () => {
    let component: TestSeaarchModeComponent;
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
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                ConfigCaseViewServiceFactory,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
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
            declarations: [TestSeaarchModeComponent, TestWrapperComponent],
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-search',
    template: ''
})
class TestSeaarchModeComponent extends AbstractSearchModeComponent {
    constructor(protected _sideMenuService: SideMenuService) {
        super(_sideMenuService);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-search [headerService]="service"></nae-test-search>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
