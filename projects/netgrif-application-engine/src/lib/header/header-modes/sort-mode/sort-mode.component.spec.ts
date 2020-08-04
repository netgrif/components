import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SortModeComponent} from './sort-mode.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {of} from 'rxjs';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {RouterModule} from '@angular/router';
import {ViewService} from '../../../routing/view-service/view.service';
import {TestViewService} from '../../../utility/tests/test-view-service';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
    selector: 'nae-test-wrapper',
    template: '<nae-sort-mode [headerService]="service"></nae-sort-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}

