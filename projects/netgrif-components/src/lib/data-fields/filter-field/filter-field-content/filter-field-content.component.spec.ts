import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterFieldContentComponent} from './filter-field-content.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    ConfigurationService, TestConfigurationService, FilterField, FieldTypeResource, NAE_FILTER_FIELD,
    DefaultSearchCategoriesModule, UserService, MockUserService, User, AuthenticationModule
} from '@netgrif/components-core';
import {AdvancedSearchComponentModule} from '../../../search/advanced-search/advanced-search.module';
import {Injectable} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterFieldContentComponent', () => {
    let component: FilterFieldContentComponent;
    let fixture: ComponentFixture<FilterFieldContentComponent>;

    beforeEach(async () => {
        const field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        await TestBed.configureTestingModule({
            declarations: [FilterFieldContentComponent],
            imports: [
                AdvancedSearchComponentModule,
                DefaultSearchCategoriesModule,
                AuthenticationModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_FILTER_FIELD, useValue: field},
                {provide: UserService, useClass: CustomMockUserService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFieldContentComponent);
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
