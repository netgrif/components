import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkflowPanelComponent} from './workflow-panel.component';
import {Component, NO_ERRORS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@ngbracket/ngx-layout';
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
    OverflowService,
    WorkflowViewService, DeploymentState
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('WorkflowPanelComponent', () => {
    let component: WorkflowPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowPanelComponent,
                PanelComponent,
                TestWrapperComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                // PanelComponent still binds [@.disabled] on mat-expansion-panel, which needs an animations provider
                MaterialModule,
                CommonModule,
                FlexModule,
                DataFieldsComponentModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                WorkflowViewService,
                OverflowService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '<nc-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nc-workflow-panel>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
        uriNodeId: '',
        deploymentState: DeploymentState.DEPLOYED
    };
}
