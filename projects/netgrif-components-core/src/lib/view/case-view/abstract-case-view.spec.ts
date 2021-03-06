import {Component, Injectable} from '@angular/core';
import {AbstractCaseViewComponent} from './abstract-case-view';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {CaseViewService} from './service/case-view-service';
import {Case} from '../../resources/interface/case';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {SearchService} from '../../search/search-service/search.service';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {TestNoAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {of} from 'rxjs';
import {createMockNet} from '../../utility/tests/utility/create-mock-net';
import {ProcessService} from '../../process/process.service';
import {UserService} from '../../user/services/user.service';
import {MockUserService} from '../../utility/tests/mocks/mock-user.service';
import {User} from '../../user/models/user';

describe('AbstractCaseView', () => {
    let component: TestCaseViewComponent;
    let fixture: ComponentFixture<TestCaseViewComponent>;
    let allowedNetsService: AllowedNetsService;
    let caseViewService: CaseViewService;

    const imports = [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateLibModule
    ];

    const providers = [
        CaseViewService,
        {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
        {provide: UserService, useClass: MockUserService},
        {provide: ConfigurationService, useClass: TestConfigurationService},
        SearchService,
        {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyCaseFilter()}},
        {
            provide: AllowedNetsService,
            useFactory: TestNoAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        }
    ];

    const createComponent = () => {
        fixture = TestBed.createComponent(TestCaseViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        allowedNetsService = TestBed.inject(AllowedNetsService);
        caseViewService = TestBed.inject(CaseViewService);
    };

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    describe('with allowed nets', () => {

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports,
                providers: [
                    ...providers,
                    {
                        provide: ProcessService,
                        useClass: MockProcessService
                    },
                    {
                        provide: UserService,
                        useClass: CustomMockUserService
                    },
                ],
                declarations: [TestCaseViewComponent]
            }).compileComponents();
        }));

        beforeEach(createComponent);

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should display create case button', (done) => {
            expect(component).toBeTruthy();
            caseViewService.getNewCaseAllowedNets().subscribe(nets => {
                expect(component.canCreate).toBeTrue();
                expect(component.hasAuthority()).toBeTrue();
                done();
            });
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    describe('without allowed nets', () => {

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports,
                providers: [
                    ...providers,
                    {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                ],
                declarations: [TestCaseViewComponent]
            }).compileComponents();
        }));

        beforeEach(createComponent);

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should not display create case button', () => {
            expect(component).toBeTruthy();
            expect(component.hasAuthority()).toBeFalse();
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });
});


@Component({
    selector: 'ncc-test-case-view',
    template: ''
})
class TestCaseViewComponent extends AbstractCaseViewComponent {
    constructor(caseViewService: CaseViewService) {
        super(caseViewService);
    }

    handleCaseClick(clickedCase: Case): void {
    }
}

@Injectable()
class MockProcessService {

    public getNets() {
        return of([createMockNet(
            'stringId',
            'identifier',
            'title',
            [{
                stringId: 'id',
                name: 'id'
            }], [], [], {
                id: {
                    create: true
                }
            }
        )]);
    }
}

@Injectable()
class CustomMockUserService extends MockUserService {
    constructor() {
        super();
        this._user = new User('123', 'test@netgrif.com', 'Test', 'User', ['ROLE_USER'], [{
            stringId: 'id',
            name: 'id',
            description: '',
            importId: 'id',
            netImportId: 'identifier',
            netVersion: '1.0.0',
            netStringId: 'stringId',
        }]);
    }
}
