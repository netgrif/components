import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextContentComponent} from './immediate-filter-text-content.component';
import {
    MaterialModule,
    TranslateLibModule,
    TestConfigurationService,
    ConfigurationService,
    NAE_FILTER_TEXT,
    FilterType
} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {
                    provide: NAE_FILTER_TEXT,
                    useValue: {
                        metadata: {
                            allowedNets: [], filterMetadata: {
                                filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
                            }
                        }, ellipsis: true
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
