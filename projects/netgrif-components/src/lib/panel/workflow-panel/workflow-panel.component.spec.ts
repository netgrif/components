import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkflowPanelComponent} from './workflow-panel.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsComponentModule} from '../../data-fields/data-fields.module';
import {of} from 'rxjs';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    HeaderColumn,
    HeaderColumnType,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    PetriNetReference,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    WorkflowMetaField,
    WorkflowViewService
} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('WorkflowPanelComponent', () => {
    let component: WorkflowPanelComponent;
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
                HttpClientTestingModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                WorkflowViewService
            ],
            declarations: [WorkflowPanelComponent, PanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA],
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
    template: '<nc-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nc-workflow-panel>'
})
class TestWrapperComponent {
    public selectedHeaders = of([
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'string', 'string', 'string', true, 'string'),
    ]);
    public workflow: PetriNetReference = {
        author: {
            email: '',
            fullName: '',
        },
        createdDate: [2020, 4, 8],
        defaultCaseName: '',
        identifier: '',
        immediateData: undefined,
        initials: '',
        stringId: '',
        title: '',
        version: '',
        uriNodeId: ''
    };
}
