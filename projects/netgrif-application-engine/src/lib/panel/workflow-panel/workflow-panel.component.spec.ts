import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkflowPanelComponent} from './workflow-panel.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {of} from 'rxjs';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {WorkflowMetaField} from '../../header/workflow-header/workflow-header.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';


describe('WorkflowPanelComponent', () => {
    let component: WorkflowPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                DataFieldsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
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

    it('show', () => {
        expect(component.show(new MouseEvent('type'))).toEqual(false);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nae-workflow-panel>'
})
class TestWrapperComponent {
    public selectedHeaders = of([
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'string', 'string', 'string', 'string'),
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
        version: ''
    };
}
