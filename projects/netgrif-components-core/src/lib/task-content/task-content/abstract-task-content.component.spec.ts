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
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventService} from '../services/task-event.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataGroupAlignment} from '../../resources/interface/data-groups';
import {DataGroupCompact, DataGroupHideEmptyRows, DataGroupLayoutType} from '../../resources/interface/data-group-layout';
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

        it('should display data group title', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup(
                    [createField()],
                    'hello world',
                    DataGroupAlignment.START, DataGroupLayoutType.LEGACY, undefined, undefined, true)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(2);

            const grid = transformStringToGrid(component.dataSource[0].gridAreas);
            expect(grid.length).toEqual(2);
            expect(grid[0].length).toEqual(4);
            expect(grid[0][0]).toEqual('xgroup0');
            expect(grid[0][3]).toEqual('xgroup0');
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][3].startsWith('xf')).toBeTrue();
        });

        it('should hide data group title', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([createField(false)], 'hello world'),
                createMockDataGroup([createField()])
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(3);

            const grid = transformStringToGrid(component.dataSource[0].gridAreas);
            expect(grid.length).toEqual(1);
            expect(grid[0].length).toEqual(4);
            expect(grid[0][0].startsWith('xf')).toBeTrue();
            expect(grid[0][1].startsWith('xf')).toBeTrue();
            expect(grid[0][2]).toEqual('xblank0');
            expect(grid[0][3]).toEqual('xblank1');
        });

        it('should not have input side effects', () => {
            const input = [
                createMockDataGroup([createField(false)], 'hello world'),
                createMockDataGroup([createField()])
            ];

            component.computeLayoutData(input);

            expect(input.length).toEqual(2);
            expect(input[0].fields.length).toEqual(1);
            expect(input[1].fields.length).toEqual(1);
        });

        it('legacy layout should work', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([createField(), createField(), createField(false), createField()], 'title',
                    DataGroupAlignment.START),
                createMockDataGroup([createField(), createField(), createField(false), createField()], 'title',
                    DataGroupAlignment.CENTER),
                createMockDataGroup([createField(), createField(), createField(false), createField()], 'title',
                    DataGroupAlignment.END)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(3);

            // Data group 1
            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(6);

            let grid = transformStringToGrid(component.dataSource[0].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xgroup')).toBeTrue();
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][0] !== grid[1][2]).toBeTrue();
            expect(grid[2][0].startsWith('xf')).toBeTrue();
            expect(grid[2][2].startsWith('xblank')).toBeTrue();

            // Data group 2
            expect(component.dataSource[1].gridAreas).toBeTruthy();
            expect(component.dataSource[1].content.length).toEqual(6);

            grid = transformStringToGrid(component.dataSource[1].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xgroup')).toBeTrue();
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][0] !== grid[1][2]).toBeTrue();
            expect(grid[2][0].startsWith('xblank')).toBeTrue();
            expect(grid[2][1].startsWith('xf')).toBeTrue();
            expect(grid[2][3].startsWith('xblank')).toBeTrue();

            // Data group 3
            expect(component.dataSource[2].gridAreas).toBeTruthy();
            expect(component.dataSource[2].content.length).toEqual(6);

            grid = transformStringToGrid(component.dataSource[2].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xgroup')).toBeTrue();
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][0] !== grid[1][2]).toBeTrue();
            expect(grid[2][1].startsWith('xblank')).toBeTrue();
            expect(grid[2][2].startsWith('xf')).toBeTrue();
        });

        it('flow layout should work', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([createField(), createField(), createField(), createField(), createField(false), createField()],
                    'title', DataGroupAlignment.START, DataGroupLayoutType.FLOW),
                createMockDataGroup([createField(), createField(), createField(), createField(), createField(false), createField()],
                    'title', DataGroupAlignment.CENTER, DataGroupLayoutType.FLOW),
                createMockDataGroup([createField(), createField(), createField(), createField(), createField(false), createField()],
                    'title', DataGroupAlignment.END, DataGroupLayoutType.FLOW)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(3);

            // Data group 1
            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(9);

            let grid = transformStringToGrid(component.dataSource[0].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xgroup')).toBeTrue();
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][1].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][3].startsWith('xf')).toBeTrue();
            expect(grid[1][0] !== grid[1][1]).toBeTrue();
            expect(grid[1][1] !== grid[1][2]).toBeTrue();
            expect(grid[1][2] !== grid[1][3]).toBeTrue();
            expect(grid[2][0].startsWith('xf')).toBeTrue();
            expect(grid[2][1].startsWith('xblank')).toBeTrue();

            // Data group 2
            expect(component.dataSource[1].gridAreas).toBeTruthy();
            expect(component.dataSource[1].content.length).toEqual(9);

            grid = transformStringToGrid(component.dataSource[1].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xgroup')).toBeTrue();
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][1].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][3].startsWith('xf')).toBeTrue();
            expect(grid[1][0] !== grid[1][1]).toBeTrue();
            expect(grid[1][1] !== grid[1][2]).toBeTrue();
            expect(grid[1][2] !== grid[1][3]).toBeTrue();
            expect(grid[2][0].startsWith('xblank')).toBeTrue();
            expect(grid[2][1].startsWith('xf')).toBeTrue();
            expect(grid[2][2].startsWith('xblank')).toBeTrue();

            // Data group 3
            expect(component.dataSource[2].gridAreas).toBeTruthy();
            expect(component.dataSource[2].content.length).toEqual(9);

            grid = transformStringToGrid(component.dataSource[2].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xgroup')).toBeTrue();
            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][1].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][3].startsWith('xf')).toBeTrue();
            expect(grid[1][0] !== grid[1][1]).toBeTrue();
            expect(grid[1][1] !== grid[1][2]).toBeTrue();
            expect(grid[1][2] !== grid[1][3]).toBeTrue();
            expect(grid[2][2].startsWith('xblank')).toBeTrue();
            expect(grid[2][3].startsWith('xf')).toBeTrue();
        });

        it('grid layout should work', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 1}),
                        createField(false, {x: 1, y: 0, rows: 1, cols: 3}),
                        createField(true, {x: 2, y: 1, rows: 1, cols: 2}),
                        createField(true, {x: 1, y: 2, rows: 1, cols: 2}),
                        createField(true, {x: 0, y: 3, rows: 2, cols: 1})],
                    '', DataGroupAlignment.START, DataGroupLayoutType.GRID, DataGroupCompact.UP)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(10);

            const grid = transformStringToGrid(component.dataSource[0].gridAreas);
            expect(grid.length).toEqual(4);
            expect(grid[0].length).toEqual(4);

            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][1].startsWith('xblank')).toBeTrue();
            expect(grid[1][2].startsWith('xf')).toBeTrue();
            expect(grid[1][3].startsWith('xf')).toBeTrue();
            expect(grid[1][2] === grid[1][3]).toBeTrue();

            expect(grid[2][0].startsWith('xf')).toBeTrue();
            expect(grid[3][0].startsWith('xf')).toBeTrue();
            expect(grid[2][0] === grid[3][0]).toBeTrue();

            expect(grid[2][1].startsWith('xf')).toBeTrue();
            expect(grid[2][2].startsWith('xf')).toBeTrue();
            expect(grid[2][1] === grid[2][2]).toBeTrue();

            expect(grid[1][0] !== grid[1][2]).toBeTrue();
            expect(grid[1][2] !== grid[2][2]).toBeTrue();
            expect(grid[2][0] !== grid[2][1]).toBeTrue();

            expect(grid[2][3].startsWith('xblank')).toBeTrue();
            expect(grid[3][1].startsWith('xblank')).toBeTrue();
        });

        it('grid layout compact UP hide NONE', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 2})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, DataGroupCompact.UP, DataGroupHideEmptyRows.NONE)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(11);

            const grid = transformStringToGrid(component.dataSource[0].gridAreas);
            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xf')).toBeTrue();
            expect(grid[0][1].startsWith('xf')).toBeTrue();
            expect(grid[0][2].startsWith('xblank')).toBeTrue();
            expect(grid[0][3].startsWith('xf')).toBeTrue();
            expect(grid[0][0] === grid[0][1]).toBeTrue();

            for (let row = 1; row < grid.length; row++) {
                for (let col = 0; col < grid[0].length; col++) {
                    expect(grid[row][col].startsWith('xblank')).toBeTrue();
                }
            }
        });

        it('grid layout compact UP hide COMPACTED', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 2})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, DataGroupCompact.UP, DataGroupHideEmptyRows.COMPACTED)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(7);
            const grid = transformStringToGrid(component.dataSource[0].gridAreas);

            expect(grid.length).toEqual(2);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xf')).toBeTrue();
            expect(grid[0][1].startsWith('xf')).toBeTrue();
            expect(grid[0][2].startsWith('xblank')).toBeTrue();
            expect(grid[0][3].startsWith('xf')).toBeTrue();
            expect(grid[0][0] === grid[0][1]).toBeTrue();

            for (let row = 1; row < grid.length; row++) {
                for (let col = 0; col < grid[0].length; col++) {
                    expect(grid[row][col].startsWith('xblank')).toBeTrue();
                }
            }
        });

        it('grid layout compact UP hide ALL', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 2})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, DataGroupCompact.UP, DataGroupHideEmptyRows.ALL)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(3);
            const grid = transformStringToGrid(component.dataSource[0].gridAreas);

            expect(grid.length).toEqual(1);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xf')).toBeTrue();
            expect(grid[0][1].startsWith('xf')).toBeTrue();
            expect(grid[0][2].startsWith('xblank')).toBeTrue();
            expect(grid[0][3].startsWith('xf')).toBeTrue();
            expect(grid[0][0] === grid[0][1]).toBeTrue();
        });

        it('grid layout compact NONE hide NONE', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 2})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, DataGroupCompact.NONE, DataGroupHideEmptyRows.NONE)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(11);
            const grid = transformStringToGrid(component.dataSource[0].gridAreas);

            expect(grid.length).toEqual(3);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xblank')).toBeTrue();
            expect(grid[0][1].startsWith('xblank')).toBeTrue();
            expect(grid[0][2].startsWith('xblank')).toBeTrue();
            expect(grid[0][3].startsWith('xf')).toBeTrue();

            for (let col = 0; col < grid[0].length; col++) {
                expect(grid[1][col].startsWith('xblank')).toBeTrue();
            }

            expect(grid[2][0].startsWith('xf')).toBeTrue();
            expect(grid[2][1].startsWith('xf')).toBeTrue();
            expect(grid[2][2].startsWith('xblank')).toBeTrue();
            expect(grid[2][3].startsWith('xblank')).toBeTrue();
            expect(grid[2][0] === grid[2][1]).toBeTrue();
        });

        it('grid layout compact NONE hide ALL', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 2})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, DataGroupCompact.NONE, DataGroupHideEmptyRows.ALL)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            expect(component.dataSource[0].gridAreas).toBeTruthy();
            expect(component.dataSource[0].content.length).toEqual(7);
            const grid = transformStringToGrid(component.dataSource[0].gridAreas);

            expect(grid.length).toEqual(2);
            expect(grid[0].length).toEqual(4);

            expect(grid[0][0].startsWith('xblank')).toBeTrue();
            expect(grid[0][1].startsWith('xblank')).toBeTrue();
            expect(grid[0][2].startsWith('xblank')).toBeTrue();
            expect(grid[0][3].startsWith('xf')).toBeTrue();

            expect(grid[1][0].startsWith('xf')).toBeTrue();
            expect(grid[1][1].startsWith('xf')).toBeTrue();
            expect(grid[1][2].startsWith('xblank')).toBeTrue();
            expect(grid[1][3].startsWith('xblank')).toBeTrue();
            expect(grid[1][0] === grid[1][1]).toBeTrue();
        });

        it('should not render empty task ref', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 4}, undefined, FieldTypeResource.TASK_REF),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 4})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(2);

            expect(component.dataSource[0].content.length).toEqual(1);
            expect(component.dataSource[0].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[1].content.length).toEqual(1);
            expect(component.dataSource[1].content[0].type).toEqual(FieldTypeResource.BOOLEAN);
        });

        it('should correctly insert task ref', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 4}, 'taskRef', FieldTypeResource.TASK_REF, ['nestedTaskId']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 4})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 5,
                    'nestedTaskId', 'taskRef', 1)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(3);

            expect(component.dataSource[0].content.length).toEqual(1);
            expect(component.dataSource[0].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[1].content.length).toEqual(1);
            expect(component.dataSource[1].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[2].content.length).toEqual(1);
            expect(component.dataSource[2].content[0].type).toEqual(FieldTypeResource.BOOLEAN);
        });

        it('should correctly insert two task refs', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 4}, 'taskRef1', FieldTypeResource.TASK_REF, ['nestedTaskId1']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 3, rows: 1, cols: 4}, 'taskRef2', FieldTypeResource.TASK_REF, ['nestedTaskId2']),
                        createField(true, {x: 0, y: 4, rows: 1, cols: 4})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 5,
                    'nestedTaskId1', 'taskRef1', 1),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 3}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 3,
                    'nestedTaskId2', 'taskRef2', 1)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(5);

            expect(component.dataSource[0].content.length).toEqual(1);
            expect(component.dataSource[0].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[1].content.length).toEqual(1);
            expect(component.dataSource[1].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[2].content.length).toEqual(1);
            expect(component.dataSource[2].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[3].content.length).toEqual(1);
            expect(component.dataSource[3].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[4].content.length).toEqual(1);
            expect(component.dataSource[4].content[0].type).toEqual(FieldTypeResource.BOOLEAN);
        });

        it('should correctly insert nested task ref', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 4}, 'taskRef', FieldTypeResource.TASK_REF, ['nestedMiddle']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 4})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 5}, 'taskRef', FieldTypeResource.TASK_REF, ['nestedBottom']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 5,
                    'nestedMiddle', 'taskRef', 1),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 3}, undefined)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 3,
                    'nestedBottom', 'taskRef', 2)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(5);

            expect(component.dataSource[0].content.length).toEqual(1);
            expect(component.dataSource[0].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[1].content.length).toEqual(1);
            expect(component.dataSource[1].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[2].content.length).toEqual(1);
            expect(component.dataSource[2].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[3].content.length).toEqual(1);
            expect(component.dataSource[3].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[4].content.length).toEqual(1);
            expect(component.dataSource[4].content[0].type).toEqual(FieldTypeResource.BOOLEAN);
        });

        it('should correctly insert two tasks in one task ref', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 4}, 'taskRef', FieldTypeResource.TASK_REF, ['taskOne', 'taskTwo']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 4}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 5,
                    'taskOne', 'taskRef', 1),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 3}, undefined)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 3,
                    'taskTwo', 'taskRef', 1)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(4);

            expect(component.dataSource[0].content.length).toEqual(1);
            expect(component.dataSource[0].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[1].content.length).toEqual(1);
            expect(component.dataSource[1].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[2].content.length).toEqual(1);
            expect(component.dataSource[2].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[3].content.length).toEqual(1);
            expect(component.dataSource[3].content[0].type).toEqual(FieldTypeResource.BUTTON);
        });

        it('should correctly resolve complex task ref', () => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 4}, 'taskRef1', FieldTypeResource.TASK_REF, ['nestedMiddle']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 4}),
                        createField(true, {x: 0, y: 3, rows: 1, cols: 4}, 'taskRef2', FieldTypeResource.TASK_REF, ['nestedSimple']),
                        createField(true, {x: 0, y: 4, rows: 1, cols: 4})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 5}, 'taskRef', FieldTypeResource.TASK_REF, ['nestedBottom']),
                        createField(true, {x: 0, y: 2, rows: 1, cols: 5}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 5,
                    'nestedMiddle', 'taskRef1', 1),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 3}, undefined)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 3,
                    'nestedBottom', 'taskRef', 2),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 4}, undefined, FieldTypeResource.BUTTON)],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 4,
                    'nestedSimple', 'taskRef2', 1)
            ]);

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(7);

            expect(component.dataSource[0].content.length).toEqual(1);
            expect(component.dataSource[0].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[1].content.length).toEqual(1);
            expect(component.dataSource[1].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[2].content.length).toEqual(1);
            expect(component.dataSource[2].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[3].content.length).toEqual(1);
            expect(component.dataSource[3].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[4].content.length).toEqual(1);
            expect(component.dataSource[4].content[0].type).toEqual(FieldTypeResource.BOOLEAN);

            expect(component.dataSource[5].content.length).toEqual(1);
            expect(component.dataSource[5].content[0].type).toEqual(FieldTypeResource.BUTTON);

            expect(component.dataSource[6].content.length).toEqual(1);
            expect(component.dataSource[6].content[0].type).toEqual(FieldTypeResource.BOOLEAN);
        });

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

        it('async rendering should work', fakeAsync(() => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 1, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 2, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1})],
                    '', DataGroupAlignment.START, DataGroupLayoutType.GRID)
            ]);

            tick();

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            let subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(2);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(4);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(5);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[4].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(5);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[4].type).toEqual(FieldTypeResource.BOOLEAN);

        }));

        it('async rendering should persist existing fields', fakeAsync(() => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 1}, 'bool1'),
                        createField(true, {x: 1, y: 0, rows: 1, cols: 1}, 'bool2'),
                        createField(true, {x: 2, y: 0, rows: 1, cols: 1}, 'bool3'),
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}, 'bool4')],
                    '', DataGroupAlignment.START, DataGroupLayoutType.GRID)
            ]);

            tick();

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(1);

            let subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(2);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(4);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(5);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[4].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(5);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[4].type).toEqual(FieldTypeResource.BOOLEAN);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 1}, 'bool1'),
                        createField(true, {x: 1, y: 0, rows: 1, cols: 1}, 'bool2'),
                        createField(true, {x: 0, y: 1, rows: 1, cols: 2}, 'btn1', FieldTypeResource.BUTTON),
                        createField(true, {x: 2, y: 1, rows: 1, cols: 2}, 'btn2', FieldTypeResource.BUTTON),
                        createField(true, {x: 2, y: 0, rows: 1, cols: 1}, 'bool3'),
                        createField(true, {x: 3, y: 0, rows: 1, cols: 1}, 'bool4')],
                    '', DataGroupAlignment.START, DataGroupLayoutType.GRID)
            ]);

            tick();

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(7);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[4].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[5].type).toEqual(FieldTypeResource.BUTTON);
            expect(subgrid[6].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(1);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(7);
            expect(subgrid[0].type).toEqual(TaskElementType.DATA_GROUP_TITLE);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[3].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[4].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[5].type).toEqual(FieldTypeResource.BUTTON);
            expect(subgrid[6].type).toEqual(FieldTypeResource.BUTTON);
        }));

        it('async rendering should render multiple data groups', fakeAsync(() => {
            expect(component.dataSource).toEqual([]);

            component.computeLayoutData([
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 1, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 2, y: 0, rows: 1, cols: 1})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 3),
                createMockDataGroup([
                        createField(true, {x: 0, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 1, y: 0, rows: 1, cols: 1}),
                        createField(true, {x: 2, y: 0, rows: 1, cols: 1})],
                    undefined, DataGroupAlignment.START, DataGroupLayoutType.GRID, undefined, undefined, undefined, 3)
            ]);

            tick();

            expect(component.dataSource).toBeTruthy();
            expect(Array.isArray(component.dataSource)).toBeTrue();
            expect(component.dataSource.length).toEqual(2);

            let subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(2);
            expect(subgrid[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[1].type).toEqual(TaskElementType.LOADER);
            let subgrid2 = component.dataSource[1].content;
            expect(subgrid2.length).toEqual(0);

            tick(100);

            expect(component.dataSource.length).toEqual(2);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(TaskElementType.LOADER);
            subgrid2 = component.dataSource[1].content;
            expect(subgrid2.length).toEqual(0);

            tick(100);

            expect(component.dataSource.length).toEqual(2);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            subgrid2 = component.dataSource[1].content;
            expect(subgrid2.length).toEqual(1);
            expect(subgrid2[0].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(2);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            subgrid2 = component.dataSource[1].content;
            expect(subgrid2.length).toEqual(2);
            expect(subgrid2[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid2[1].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(2);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            subgrid2 = component.dataSource[1].content;
            expect(subgrid2.length).toEqual(3);
            expect(subgrid2[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid2[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid2[2].type).toEqual(TaskElementType.LOADER);

            tick(100);

            expect(component.dataSource.length).toEqual(2);
            subgrid = component.dataSource[0].content;
            expect(subgrid.length).toEqual(3);
            expect(subgrid[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid[2].type).toEqual(FieldTypeResource.BOOLEAN);
            subgrid2 = component.dataSource[1].content;
            expect(subgrid2.length).toEqual(3);
            expect(subgrid2[0].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid2[1].type).toEqual(FieldTypeResource.BOOLEAN);
            expect(subgrid2[2].type).toEqual(FieldTypeResource.BOOLEAN);
        }));
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
                protected _paperView: PaperViewService,
                protected _logger: LoggerService,
                @Optional() protected _taskEventService: TaskEventService,
                @Optional() @Inject(NAE_ASYNC_RENDERING_CONFIGURATION) config) {
        super(_fieldConverter, taskContentService, _paperView, _logger, _taskEventService, config);
    }
}
