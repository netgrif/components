import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TaskContentService} from '../services/task-content.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractTaskContentComponent} from './abstract-task-content.component';
import {FieldConverterService} from '../services/field-converter.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventService} from '../services/task-event.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {UnlimitedTaskContentService} from '../services/unlimited-task-content.service';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {GridLayout} from '../../utility/grid-layout/model/grid-element';
import {NAE_ASYNC_RENDERING_CONFIGURATION} from '../model/async-rendering-configuration-injection-token';
import {FieldTypeResource} from '../model/field-type-resource';
import {TaskElementType} from '../model/task-content-element-type';
import {ButtonField} from '../../data-fields/button-field/models/button-field';
import {createMockDataGroup} from '../../utility/tests/utility/create-mock-datagroup';
import {createMockField} from '../../utility/tests/utility/create-mock-field';
import {TaskRefField} from '../../data-fields/task-ref-field/model/task-ref-field';

describe('AbstractTaskContentComponent', () => {
    let component: TestTaskContentComponent;
    let fixture: ComponentFixture<TestTaskContentComponent>;
    let taskContentService: TaskContentService;

    const imports = [
        MatExpansionModule,
        MaterialModule,
        NoopAnimationsModule,
        CommonModule,
        TranslateLibModule,
        HttpClientTestingModule
    ];

    const providers = [
        TaskViewService,
        {provide: TaskContentService, useClass: UnlimitedTaskContentService},
        {provide: ConfigurationService, useClass: TestConfigurationService}
    ];

    describe('without async datafield rendering', () => {

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports,
                providers: [
                    ...providers,
                    {
                        provide: NAE_ASYNC_RENDERING_CONFIGURATION,
                        useValue: {enableAsyncRenderingForNewFields: false, enableAsyncRenderingOnTaskExpand: false}
                    }
                ],
                declarations: [TestTaskContentComponent]
            })
                .compileComponents();

            fixture = TestBed.createComponent(TestTaskContentComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            taskContentService = TestBed.inject(TaskContentService);
            taskContentService.task = createMockTask();
        }));

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        // TODO JOFO: create new tests after transition layout change

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    describe('with async datafield rendering', () => {

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports,
                providers: [
                    ...providers,
                    {provide: NAE_ASYNC_RENDERING_CONFIGURATION, useValue: {batchSize: 1, batchDelay: 100, numberOfPlaceholders: 1}}
                ],
                declarations: [TestTaskContentComponent]
            })
                .compileComponents();

            fixture = TestBed.createComponent(TestTaskContentComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            taskContentService = TestBed.inject(TaskContentService);
            taskContentService.task = createMockTask();
        }));

        afterEach(() => {
            TestBed.resetTestingModule();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});

const counter = new IncrementingCounter();

function createField(visible = true,
                     layout: GridLayout = {x: 0, y: 0, rows: 0, cols: 0},
                     stringId?: string,
                     fieldType: FieldTypeResource.BOOLEAN | FieldTypeResource.BUTTON | FieldTypeResource.TASK_REF
                         = FieldTypeResource.BOOLEAN,
                     taskRefValue: Array<string> = []): BooleanField | ButtonField | TaskRefField {
    return createMockField(visible, layout, stringId ?? counter, fieldType, taskRefValue);
}

function transformStringToGrid(gridString: string): Array<Array<string>> {
    const rows = gridString.split(' | ');
    const result = [];
    rows.forEach(row => result.push(row.split(' ')));
    return result;
}

@Component({
    selector: 'ncc-test-panel',
    template: ''
})
class TestTaskContentComponent extends AbstractTaskContentComponent {
    constructor(protected _fieldConverter: FieldConverterService,
                public taskContentService: TaskContentService,
                protected _logger: LoggerService,
                @Optional() protected _taskEventService: TaskEventService) {
        super(_fieldConverter, taskContentService, _logger, _taskEventService);
    }
}
