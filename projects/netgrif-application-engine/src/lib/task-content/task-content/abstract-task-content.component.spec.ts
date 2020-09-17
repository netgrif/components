import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TaskContentService} from '../services/task-content.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {Component, Optional} from '@angular/core';
import {AbstractTaskContentComponent} from './abstract-task-content.component';
import {FieldConverterService} from '../services/field-converter.service';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventService} from '../services/task-event.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataGroup, DataGroupAlignment} from '../../resources/interface/data-groups';
import {DataGroupLayoutType} from '../../resources/interface/data-group-layout';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {UnlimitedTaskContentService} from '../services/unlimited-task-content.service';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {GridLayout} from '../../utility/grid-layout/model/grid-element';
import {TemplateAppearance} from '../../data-fields/models/template-appearance';
import {MaterialAppearance} from '../../data-fields/models/material-appearance';

describe('AbstractTaskContentComponent', () => {
    let component: TestTaskComponent;
    let fixture: ComponentFixture<TestTaskComponent>;
    let taskContentService: TaskContentService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                TaskViewService,
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestTaskComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        taskContentService = TestBed.inject(TaskContentService);
        taskContentService.task = createMockTask();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display data group title', () => {
        expect(component.dataSource).toBeUndefined();
        expect(component.gridAreas).toBeUndefined();

        component.computeLayoutData([
            createDataGroup([createField()], 'hello world', DataGroupAlignment.START, DataGroupLayoutType.LEGACY, true)
        ]);

        expect(component.dataSource).toBeTruthy();
        expect(Array.isArray(component.dataSource)).toBeTrue();
        expect(component.dataSource.length).toEqual(2);

        expect(component.gridAreas).toBeTruthy();
        const grid = transformStringToGrid(component.gridAreas);
        expect(grid.length).toEqual(2);
        expect(grid[0].length).toEqual(4);
        expect(grid[0][0]).toEqual('group0');
        expect(grid[0][3]).toEqual('group0');
        expect(grid[1][0].startsWith('f')).toBeTrue();
        expect(grid[1][3].startsWith('f')).toBeTrue();
    });

    it('should hide data group title', () => {
        expect(component.dataSource).toBeUndefined();
        expect(component.gridAreas).toBeUndefined();

        component.computeLayoutData([
            createDataGroup([createField(false)], 'hello world'),
            createDataGroup([createField()])
        ]);

        expect(component.dataSource).toBeTruthy();
        expect(Array.isArray(component.dataSource)).toBeTrue();
        expect(component.dataSource.length).toEqual(3);

        expect(component.gridAreas).toBeTruthy();
        const grid = transformStringToGrid(component.gridAreas);
        expect(grid.length).toEqual(1);
        expect(grid[0].length).toEqual(4);
        expect(grid[0][0].startsWith('f')).toBeTrue();
        expect(grid[0][1].startsWith('f')).toBeTrue();
        expect(grid[0][2]).toEqual('blank0');
        expect(grid[0][3]).toEqual('blank1');
    });

    it('should not have input side effects', () => {
        const input = [
            createDataGroup([createField(false)], 'hello world'),
            createDataGroup([createField()])
        ];

        component.computeLayoutData(input);

        expect(input.length).toEqual(2);
        expect(input[0].fields.length).toEqual(1);
        expect(input[1].fields.length).toEqual(1);
    });

    it('legacy layout should work', () => {
        expect(component.dataSource).toBeUndefined();
        expect(component.gridAreas).toBeUndefined();

        component.computeLayoutData([
            createDataGroup([createField(), createField(), createField(false), createField()], 'title', DataGroupAlignment.START),
            createDataGroup([createField(), createField(), createField(false), createField()], 'title', DataGroupAlignment.CENTER),
            createDataGroup([createField(), createField(), createField(false), createField()], 'title', DataGroupAlignment.END)
        ]);

        expect(component.dataSource).toBeTruthy();
        expect(Array.isArray(component.dataSource)).toBeTrue();
        expect(component.dataSource.length).toEqual(18);

        expect(component.gridAreas).toBeTruthy();
        const grid = transformStringToGrid(component.gridAreas);
        expect(grid.length).toEqual(9);
        expect(grid[0].length).toEqual(4);

        expect(grid[0][0].startsWith('group')).toBeTrue();
        expect(grid[1][0].startsWith('f')).toBeTrue();
        expect(grid[1][2].startsWith('f')).toBeTrue();
        expect(grid[1][0] !== grid[1][2]).toBeTrue();
        expect(grid[2][0].startsWith('f')).toBeTrue();
        expect(grid[2][2].startsWith('blank')).toBeTrue();

        expect(grid[3][0].startsWith('group')).toBeTrue();
        expect(grid[4][0].startsWith('f')).toBeTrue();
        expect(grid[4][2].startsWith('f')).toBeTrue();
        expect(grid[4][0] !== grid[4][2]).toBeTrue();
        expect(grid[5][0].startsWith('blank')).toBeTrue();
        expect(grid[5][1].startsWith('f')).toBeTrue();
        expect(grid[5][3].startsWith('blank')).toBeTrue();

        expect(grid[6][0].startsWith('group')).toBeTrue();
        expect(grid[7][0].startsWith('f')).toBeTrue();
        expect(grid[7][2].startsWith('f')).toBeTrue();
        expect(grid[7][0] !== grid[7][2]).toBeTrue();
        expect(grid[8][1].startsWith('blank')).toBeTrue();
        expect(grid[8][2].startsWith('f')).toBeTrue();
    });

    it('flow layout should work', () => {
        expect(component.dataSource).toBeUndefined();
        expect(component.gridAreas).toBeUndefined();

        component.computeLayoutData([
            createDataGroup([createField(), createField(), createField(), createField(), createField(false), createField()],
                'title', DataGroupAlignment.START, DataGroupLayoutType.FLOW),
            createDataGroup([createField(), createField(), createField(), createField(), createField(false), createField()],
                'title', DataGroupAlignment.CENTER, DataGroupLayoutType.FLOW),
            createDataGroup([createField(), createField(), createField(), createField(), createField(false), createField()],
                'title', DataGroupAlignment.END, DataGroupLayoutType.FLOW)
        ]);

        expect(component.dataSource).toBeTruthy();
        expect(Array.isArray(component.dataSource)).toBeTrue();
        expect(component.dataSource.length).toEqual(27);

        expect(component.gridAreas).toBeTruthy();
        const grid = transformStringToGrid(component.gridAreas);
        expect(grid.length).toEqual(9);
        expect(grid[0].length).toEqual(4);

        expect(grid[0][0].startsWith('group')).toBeTrue();
        expect(grid[1][0].startsWith('f')).toBeTrue();
        expect(grid[1][1].startsWith('f')).toBeTrue();
        expect(grid[1][2].startsWith('f')).toBeTrue();
        expect(grid[1][3].startsWith('f')).toBeTrue();
        expect(grid[1][0] !== grid[1][1]).toBeTrue();
        expect(grid[1][1] !== grid[1][2]).toBeTrue();
        expect(grid[1][2] !== grid[1][3]).toBeTrue();
        expect(grid[2][0].startsWith('f')).toBeTrue();
        expect(grid[2][1].startsWith('blank')).toBeTrue();

        expect(grid[3][0].startsWith('group')).toBeTrue();
        expect(grid[4][0].startsWith('f')).toBeTrue();
        expect(grid[4][1].startsWith('f')).toBeTrue();
        expect(grid[4][2].startsWith('f')).toBeTrue();
        expect(grid[4][3].startsWith('f')).toBeTrue();
        expect(grid[4][0] !== grid[4][1]).toBeTrue();
        expect(grid[4][1] !== grid[4][2]).toBeTrue();
        expect(grid[4][2] !== grid[4][3]).toBeTrue();
        expect(grid[5][0].startsWith('blank')).toBeTrue();
        expect(grid[5][1].startsWith('f')).toBeTrue();
        expect(grid[5][2].startsWith('blank')).toBeTrue();

        expect(grid[6][0].startsWith('group')).toBeTrue();
        expect(grid[7][0].startsWith('f')).toBeTrue();
        expect(grid[7][1].startsWith('f')).toBeTrue();
        expect(grid[7][2].startsWith('f')).toBeTrue();
        expect(grid[7][3].startsWith('f')).toBeTrue();
        expect(grid[7][0] !== grid[7][1]).toBeTrue();
        expect(grid[7][1] !== grid[7][2]).toBeTrue();
        expect(grid[7][2] !== grid[7][3]).toBeTrue();
        expect(grid[8][2].startsWith('blank')).toBeTrue();
        expect(grid[8][3].startsWith('f')).toBeTrue();
    });

    it('grid layout should work', () => {
        expect(component.dataSource).toBeUndefined();
        expect(component.gridAreas).toBeUndefined();

        component.computeLayoutData([
            createDataGroup([
                    createField(true, {x: 0, y: 0, rows: 1, cols: 1}),
                    createField(false, {x: 1, y: 0, rows: 1, cols: 3}),
                    createField(true, {x: 2, y: 1, rows: 1, cols: 2}),
                    createField(true, {x: 1, y: 2, rows: 1, cols: 2}),
                    createField(true, {x: 0, y: 3, rows: 2, cols: 1})],
                '', DataGroupAlignment.START, DataGroupLayoutType.GRID)
        ]);

        expect(component.dataSource).toBeTruthy();
        expect(Array.isArray(component.dataSource)).toBeTrue();
        expect(component.dataSource.length).toEqual(9);

        expect(component.gridAreas).toBeTruthy();
        const grid = transformStringToGrid(component.gridAreas);
        expect(grid.length).toEqual(3);
        expect(grid[0].length).toEqual(4);

        expect(grid[0][0].startsWith('f')).toBeTrue();
        expect(grid[0][1].startsWith('blank')).toBeTrue();
        expect(grid[0][2].startsWith('f')).toBeTrue();
        expect(grid[0][3].startsWith('f')).toBeTrue();
        expect(grid[0][2] === grid[0][3]).toBeTrue();

        expect(grid[1][0].startsWith('f')).toBeTrue();
        expect(grid[2][0].startsWith('f')).toBeTrue();
        expect(grid[1][0] === grid[2][0]).toBeTrue();

        expect(grid[1][1].startsWith('f')).toBeTrue();
        expect(grid[1][2].startsWith('f')).toBeTrue();
        expect(grid[1][1] === grid[1][2]).toBeTrue();

        expect(grid[0][0] !== grid[0][2]).toBeTrue();
        expect(grid[0][2] !== grid[1][2]).toBeTrue();
        expect(grid[1][0] !== grid[1][1]).toBeTrue();

        expect(grid[1][3].startsWith('blank')).toBeTrue();
        expect(grid[2][1].startsWith('blank')).toBeTrue();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

function createDataGroup(fields: Array<DataField<unknown>>,
                         title?: string,
                         alignment = DataGroupAlignment.START,
                         layoutType = DataGroupLayoutType.LEGACY,
                         stretch = false,
                         cols = 4): DataGroup {
    return {
        fields,
        title,
        alignment,
        stretch,
        layout: {
            type: layoutType,
            rows: 0,
            cols
        }
    };
}

const counter = new IncrementingCounter();

function createField(visible = true, layout: GridLayout = {x: 0, y: 0, rows: 0, cols: 0}): BooleanField {
    const b = visible ? {visible: true} : {hidden: true};
    const l = {
        ...layout,
        template: TemplateAppearance.MATERIAL,
        appearance: MaterialAppearance.OUTLINE,
        offset: 0
    };
    return new BooleanField('f' + counter.next(), 'title', false, b, '', '', l);
}

function transformStringToGrid(gridString: string): Array<Array<string>> {
    const rows = gridString.split(' | ');
    const result = [];
    rows.forEach(row => result.push(row.split(' ')));
    return result;
}

@Component({
    selector: 'nae-test-panel',
    template: ''
})
class TestTaskComponent extends AbstractTaskContentComponent {
    constructor(protected _fieldConverter: FieldConverterService,
                public taskContentService: TaskContentService,
                protected _paperView: PaperViewService,
                protected _logger: LoggerService,
                @Optional() protected _taskEventService: TaskEventService) {
        super(_fieldConverter, taskContentService, _paperView, _logger, _taskEventService);
    }
}
