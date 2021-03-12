import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FulltextSearchComponent} from './fulltext-search.component';
import {
    MaterialModule,
    NAE_BASE_FILTER,
    SearchService,
    TestCaseBaseFilterProvider
} from 'netgrif-application-engine';
import {SearchComponentModule} from '../search.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FulltextSearchComponent', () => {
    let component: FulltextSearchComponent;
    let fixture: ComponentFixture<FulltextSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SearchComponentModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
            ],
            providers: [
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FulltextSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
