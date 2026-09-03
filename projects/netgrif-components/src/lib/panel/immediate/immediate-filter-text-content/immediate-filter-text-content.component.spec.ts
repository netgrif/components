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
    AllowedNetsServiceFactory
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
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
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
