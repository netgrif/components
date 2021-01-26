import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchComponentModule} from '../search.module';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationService,
    MockUserResourceService,
    SearchService,
    TestCaseSearchServiceFactory,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                SearchComponentModule,
                NoopAnimationsModule,
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
