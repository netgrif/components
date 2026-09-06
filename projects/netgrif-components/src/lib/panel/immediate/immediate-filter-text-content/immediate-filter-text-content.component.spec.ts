import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextContentComponent} from './immediate-filter-text-content.component';
import {
    MaterialModule,
    TranslateLibModule,
    TestConfigurationService,
    ConfigurationService,
    NAE_FILTER_TEXT,
    AllowedNetsService,
    TestNoAllowedNetsFactory,
    AllowedNetsServiceFactory, MockUserService, User, UserService, AuthenticationModule
} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Injectable} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('ImmediateFilterTextContentComponent', () => {
    let component: ImmediateFilterTextContentComponent;
    let fixture: ComponentFixture<ImmediateFilterTextContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImmediateFilterTextContentComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                AuthenticationModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: UserService, useClass: CustomMockUserService},
                {
                    provide: NAE_FILTER_TEXT,
                    useValue: {
                        query: 'cases: creationDate eq 2026-09-01',
                        type: 'case',
                        ellipsis: true
                    }
                },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImmediateFilterTextContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

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
