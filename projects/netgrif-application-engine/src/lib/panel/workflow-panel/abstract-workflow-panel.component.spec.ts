import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AbstractWorkflowPanelComponent} from './abstract-workflow-panel.component';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {WorkflowMetaField} from '../../header/workflow-header/workflow-meta-enum';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {RouterTestingModule} from '@angular/router/testing';

describe('AbstractWorkflowPanelComponent', () => {
    let component: TestWorkflowPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestWorkflowPanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-workflow-panel',
    template: ''
})
class TestWorkflowPanelComponent extends AbstractWorkflowPanelComponent {
    constructor(protected _log: LoggerService, protected _translate: TranslateService) {
        super(_log, _translate);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nae-test-workflow-panel>'
})
class TestWrapperComponent {
    public selectedHeaders = of([
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'string', 'string'),
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
