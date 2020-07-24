import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskListComponent} from './task-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {SearchService} from '../../search/search-service/search.service';
import {TestTaskSearchServiceFactory} from '../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {
    ArrayTaskViewServiceFactory,
    noNetsTaskViewServiceFactory
} from '../../view/task-view/service/factory/array-task-view-service-factory';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../task-panel/policy';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                HttpClientTestingModule,
                AuthenticationModule
            ],
            declarations: [TestWrapperComponent],
            providers: [
                ArrayTaskViewServiceFactory,
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {
                    provide: SearchService,
                    useFactory: TestTaskSearchServiceFactory
                },
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                },
                {
                    provide: TaskViewService,
                    useFactory: noNetsTaskViewServiceFactory,
                    deps: [ArrayTaskViewServiceFactory]
                },
                {provide: TaskResourceService, useClass: MyResources},
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-task-list [tasks$]="taskPanels"></nae-task-list>'
})
class TestWrapperComponent {
    taskPanels = of([]);
}

class MyResources {
    searchTask(filter) {
        return of([{
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            cols: undefined,
            dataGroups: [],
            _links: {}
        }]);
    }
}
