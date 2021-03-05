import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdvancedSearchComponent} from './advanced-search.component';
import {
    ConfigurationService,
    MaterialModule,
    NAE_SEARCH_CATEGORIES,
    SearchService,
    TestCaseSearchServiceFactory, TestConfigurationService
} from 'netgrif-application-engine';
import {SearchComponentModule} from '../search.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AdvancedSearchComponent', () => {
    let component: AdvancedSearchComponent;
    let fixture: ComponentFixture<AdvancedSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SearchComponentModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory},
                {provide: NAE_SEARCH_CATEGORIES, useValue: []}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
