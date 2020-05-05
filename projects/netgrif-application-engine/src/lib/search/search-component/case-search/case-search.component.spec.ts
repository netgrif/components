import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CaseSearchComponent} from './case-search.component';
import {SearchModule} from '../../search.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchService} from '../../search-service/search.service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {CaseViewServiceFactory} from '../../../view/case-view/case-view-service-factory';
import {CaseViewService} from '../../../view/case-view/case-view-service';
import {CategoryFactory} from '../../category-factory/category-factory';

describe('CaseSearchComponent', () => {
    let component: CaseSearchComponent;
    let fixture: ComponentFixture<CaseSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                CaseViewServiceFactory,
                CategoryFactory,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {   provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [CaseViewServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
