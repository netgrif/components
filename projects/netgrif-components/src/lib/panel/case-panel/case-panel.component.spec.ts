import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CasePanelComponent} from './case-panel.component';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsComponentModule} from '../../data-fields/data-fields.module';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    CaseMetaField, CurrencyModule,
    HeaderColumn,
    HeaderColumnType,
    MaterialModule,
    NAE_BASE_FILTER,
    OverflowService,
    TestCaseBaseFilterProvider,
    TestCaseViewAllowedNetsFactory,
    TranslateLibModule
} from '@netgrif/components-core';
import {
    TestConfigurationService,
    ConfigurationService,
    CaseViewService,
    SearchService,
    AuthenticationMethodService,
    MockAuthenticationMethodService
} from '@netgrif/components-core';

describe('CasePanelComponent', () => {
    let component: CasePanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                DataFieldsComponentModule,
                TranslateLibModule,
                HttpClientTestingModule,
                CurrencyModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                CaseViewService,
                SearchService,
                OverflowService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [CasePanelComponent, PanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-case-panel [selectedHeaders$]="selectedHeaders" [case_]="case_"> </nc-case-panel>'
})
class TestWrapperComponent {
    selectedHeaders = of([
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'date', 'string', 'string', true, 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'string', 'string', 'string', true, 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'dateTime', 'string', 'string', true, 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'enum', 'string', 'string', true, 'netid'),
    ]);
    case_ = {
        stringId: 'string',
        title: 'string',
        identifier: 'string',
        version: 'string',
        initials: 'string',
        defaultCaseName: 'string',
        createdDate: [2020, 1, 1, 10, 10],
        author: {email: 'email', fullName: 'fullName'},
        immediateData: [
            {stringId: 'date', title: 'string', type: 'date', value: [2020, 1, 1, 10, 10]},
            {stringId: 'string', title: 'string', type: 'string', value: 'dasdsadsad'},
            {stringId: 'dateTime', title: 'string', type: 'dateTime', value: [2020, 1, 1, 10, 10]},
            {stringId: 'enum', title: 'string', type: 'enumeration', value: {defaultValue: 'dasd'}},
        ]
    };
}
