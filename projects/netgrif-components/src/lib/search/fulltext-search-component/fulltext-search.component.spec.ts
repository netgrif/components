import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FulltextSearchComponent} from './fulltext-search.component';
import {
    ConfigurationService,
    MaterialModule,
    NAE_BASE_FILTER,
    SearchService,
    TestCaseBaseFilterProvider, TestConfigurationService
} from '@netgrif/components-core';
import {SearchComponentModule} from '../search.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FulltextSearchComponent', () => {
    let component: FulltextSearchComponent;
    let fixture: ComponentFixture<FulltextSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SearchComponentModule
            ],
            providers: [
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FulltextSearchComponent);
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
