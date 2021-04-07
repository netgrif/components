import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchClauseComponent} from './search-clause.component';
import {SearchComponentModule} from '../search.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {
    AuthenticationMethodService,
    BooleanOperator, CaseViewService,
    CategoryFactory, CaseViewServiceFactory, ConfigurationService, defaultCaseSearchCategoriesFactory,
    EditableClausePredicate,
    MaterialModule, MockAuthenticationMethodService,
    NAE_SEARCH_CATEGORIES, SearchService, TestCaseSearchServiceFactory, TestCaseViewFactory, TestConfigurationService,
    TranslateLibModule
} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchClauseComponent', () => {
    let component: SearchClauseComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestWrapperComponent
            ],
            providers: [
                CategoryFactory,
                {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {
                    provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [CaseViewServiceFactory]
                },
                CaseViewServiceFactory,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-search-clause [predicate]="predicate" [remove$]="remove$" [predicateId]="0"></nc-search-clause>'
})
class TestWrapperComponent implements OnDestroy {

    public predicate = new EditableClausePredicate(BooleanOperator.OR);
    public remove$ = new Subject();

    ngOnDestroy(): void {
        this.remove$.complete();
    }
}
