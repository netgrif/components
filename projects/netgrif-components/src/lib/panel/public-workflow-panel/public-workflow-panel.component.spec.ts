import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicWorkflowPanelComponent} from './public-workflow-panel.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    HeaderColumn,
    HeaderColumnType,
    MaterialModule,
    OverflowService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    PetriNetReference,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    WorkflowMetaField,
    WorkflowViewService, DeploymentState
} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@ngbracket/ngx-layout';
import {DataFieldsComponentModule} from '../../data-fields/data-fields.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {PanelComponent} from '../panel.component';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {of} from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('PublicWorkflowPanelComponent', () => {
    let component: PublicWorkflowPanelComponent;
    let fixture: ComponentFixture<PublicTestWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [
            PublicWorkflowPanelComponent,
            PanelComponent,
            PublicTestWrapperComponent
        ],
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
  }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicTestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-public-test-wrapper',
    template: '<nc-public-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nc-public-workflow-panel>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class PublicTestWrapperComponent {
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
