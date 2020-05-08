import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchModeComponent} from './search-mode.component';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule
} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {CaseHeaderService} from '../../case-header/case-header.service';
import {CaseViewServiceFactory} from '../../../view/case-view/service/case-view-service-factory';
import {SearchService} from '../../../search/search-service/search.service';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../../utility/tests/test-factory-methods';
import {TranslateLibModule} from '../../../translate/translate-lib.module';


describe('SearchModeComponent', () => {
    let component: SearchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let headerSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchModeComponent, TestWrapperComponent],
            imports: [
                MatInputModule,
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                NoopAnimationsModule,
                MatSelectModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSnackBarModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                CaseViewServiceFactory,
                {   provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory},
                {   provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [CaseViewServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                CaseHeaderService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        headerSpy = spyOn(TestBed.inject(CaseHeaderService), 'headerSearchInputChanged');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call search header', () => {
        component.headerSearchInputChanged(0, 'hladaj');
        expect(headerSpy).toHaveBeenCalledWith(0, 'hladaj');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-search-mode [headerService]="service"></nae-search-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
