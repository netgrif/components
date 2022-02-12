import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchComponentModule} from '../search.module';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationService,
    MockUserResourceService, NAE_BASE_FILTER,
    SearchService, TestCaseBaseFilterProvider,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    AllowedNetsService,
    TestNoAllowedNetsFactory,
    AllowedNetsServiceFactory,
    NAE_SEARCH_CATEGORIES,
    CategoryFactory,
    ViewIdService, CaseAuthor, CaseCreationDate, CaseProcess, Category
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Type} from '@angular/core';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    const imports = [
        MaterialModule,
        TranslateLibModule,
        HttpClientTestingModule,
        SearchComponentModule,
        NoopAnimationsModule,
    ];

    const providers = [
        AuthenticationMethodService,
        {provide: ConfigurationService, useClass: TestConfigurationService},
        {provide: AuthenticationService, useClass: MockAuthenticationService},
        {provide: UserResourceService, useClass: MockUserResourceService},
        {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
        CategoryFactory,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: TestCaseBaseFilterProvider
        },
        {provide: ViewIdService, useValue: {viewId: 'test_view_id'}}
    ];

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    describe('with category instances provided', () => {

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports,
                providers: [
                    ...providers,
                    {provide: NAE_SEARCH_CATEGORIES, useFactory: testCaseSearchCategoriesFactory, deps: [CategoryFactory]}
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

        it('should have correct categories', () => {
            expect(component).toBeTruthy();

            const categories: Array<Type<Category<any>>> = (component as any)._searchCategories;

            expect(categories).toBeTruthy();
            expect(Array.isArray(categories)).toBeTrue();
            expect(categories.length).toBe(2);

            categories.forEach(cat => {
                expect(cat instanceof Category).toBeFalse();
            });

            expect(categories.some(cat => cat === CaseAuthor)).toBeTrue();
            expect(categories.some(cat => cat === CaseProcess)).toBeTrue();
        });
    });

    describe('with category classes provided', () => {

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports,
                providers: [
                    ...providers,
                    {provide: NAE_SEARCH_CATEGORIES, useValue: [CaseAuthor, CaseProcess]}
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

        it('should have correct categories', () => {
            expect(component).toBeTruthy();

            const categories: Array<Type<Category<any>>> = (component as any)._searchCategories;

            expect(categories).toBeTruthy();
            expect(Array.isArray(categories)).toBeTrue();
            expect(categories.length).toBe(2);

            categories.forEach(cat => {
                expect(cat instanceof Category).toBeFalse();
            });

            expect(categories.some(cat => cat === CaseAuthor)).toBeTrue();
            expect(categories.some(cat => cat === CaseProcess)).toBeTrue();
        });
    });
});

export function testCaseSearchCategoriesFactory(factory: CategoryFactory) {
    const cats = [
        factory.get(CaseAuthor),
        factory.get(CaseProcess)
    ];
    cats.forEach(c => c.destroy());
    return cats;
}
