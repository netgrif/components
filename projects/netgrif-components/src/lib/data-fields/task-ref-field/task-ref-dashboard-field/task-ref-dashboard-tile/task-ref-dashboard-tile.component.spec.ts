import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TaskRefDashboardTileComponent} from './task-ref-dashboard-tile.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ChangedFieldsService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NAE_TASK_OPERATIONS,
    SingleTaskContentService,
    SubjectTaskOperations,
    TaskContentService,
    TaskDataService,
    TaskEventService,
    TaskRefField,
    TaskRequestStateService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    FrontActionService
} from '@netgrif/components-core';
import {FormControl} from '@angular/forms';
import {TaskContentComponent} from '../../../../task-content/task-content/task-content.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskRefDashboardTileComponent', () => {
    let component: TaskRefDashboardTileComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskRefDashboardTileComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                TaskDataService,
                TaskRequestStateService,
                TaskEventService,
                ChangedFieldsService,
                FrontActionService,
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
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
    template: `
        <nc-task-ref-dashboard-tile
            [tile]="tile"
            [taskRef]="field"
            [fc]="formControl"
            [gdColumn]="'1 / 2'"
            [gdRow]="'1 / 2'"
            [taskContentComponentClassReference]="taskContentComponentClass"
        >
        </nc-task-ref-dashboard-tile>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    tile = {
        dataGroups: [],
        x: 1,
        y: 1,
        rows: 1,
        cols: 1,
        isEmpty: false
    };
    taskContentComponentClass = TaskContentComponent;
    value = `https://netgrif.com/`;
    field = new TaskRefField('', '', ['633c6187bb12a90925e0a17e'], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
    formControl = new FormControl();

    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
