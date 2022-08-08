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
    WorkflowViewService
} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsComponentModule} from '../../data-fields/data-fields.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PanelComponent} from '../panel.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicWorkflowPanelComponent', () => {
    let component: PublicWorkflowPanelComponent;
    let fixture: ComponentFixture<PublicTestWrapperComponent>;

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
            RouterTestingModule.withRoutes([])
        ],
        providers: [
            {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            {provide: AuthenticationService, useClass: MockAuthenticationService},
            {provide: UserResourceService, useClass: MockUserResourceService},
            {provide: ConfigurationService, useClass: TestConfigurationService},
            WorkflowViewService
        ],
      declarations: [ PublicWorkflowPanelComponent, PanelComponent, PublicTestWrapperComponent]
    })
    .compileComponents();
  }));


    beforeEach(() => {
        fixture = TestBed.createComponent(PublicTestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-public-test-wrapper',
    template: '<nc-public-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nc-public-workflow-panel>'
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
        uriNodeId: ''
    };
}
