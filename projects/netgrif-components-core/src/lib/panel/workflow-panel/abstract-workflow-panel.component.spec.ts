import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
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
import {WorkflowViewService} from '../../view/workflow-view/workflow-view.service';
import {take} from 'rxjs/operators';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import { OverflowService } from '../../header/services/overflow.service';

describe('AbstractWorkflowPanelComponent', () => {
    let component: TestWorkflowPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let oldTitle: string;
    let translate: TranslateService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                WorkflowViewService,
                OverflowService
            ],
            declarations: [TestWorkflowPanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        translate = TestBed.inject(TranslateService);
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('show', () => {
        expect(component.show(new MouseEvent('type'))).toEqual(false);
    });

    it('should translate', (done) => {
        translate.onLangChange.pipe(take(2)).subscribe(() => {
            if (translate.currentLang === 'sk-SK') {
                oldTitle = component.panelContent.netIdentifier.title;
                expect(oldTitle).toEqual('Identifikátor siete');
                translate.use('en-US');
            } else {
                expect(component.panelContent.netIdentifier.title).not.toEqual(oldTitle);
                done();
            }
        });
        translate.use('sk-SK');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-workflow-panel',
    template: ''
})
class TestWorkflowPanelComponent extends AbstractWorkflowPanelComponent {
  
      constructor(log: LoggerService,
                  translate: TranslateService,
                  workflowService: WorkflowViewService,
                  petriNetResource: PetriNetResourceService,
                  overflowService: OverflowService) {
        super(log, translate, workflowService, petriNetResource, overflowService);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></ncc-test-workflow-panel>'
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
        version: '',
        uriNodeId: ''
    };
}
