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
import {DataGroupAlignment} from '../../resources/interface/data-groups';
import {DataGroupLayoutType} from '../../resources/interface/data-group-layout';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {UnlimitedTaskContentService} from '../services/unlimited-task-content.service';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';

describe('AbstractTaskContentComponent', () => {
    let component: TestTaskComponent;
    let fixture: ComponentFixture<TestTaskComponent>;

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

        TestBed.inject(TaskContentService).task = createMockTask();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display data group title', () => {
        expect(component.dataSource).toBeUndefined();
        expect(component.gridAreas).toBeUndefined();

        component.computeLayoutData([{
            fields: [createField()],
            title: 'hello world',
            alignment: DataGroupAlignment.START,
            stretch: true,
            layout: {
                type: DataGroupLayoutType.LEGACY,
                rows: 0,
                cols: 4
            }
        }]);

        expect(component.dataSource).toBeTruthy();
        expect(Array.isArray(component.dataSource)).toBeTrue();
        expect(component.dataSource.length).toEqual(2);

        expect(component.gridAreas).toBeTruthy();
        const grid = transformStringToGrid(component.gridAreas);
        expect(grid.length).toEqual(2);
        expect(grid[0].length).toEqual(4);
        expect(grid[0][0]).toEqual('group0');
        expect(grid[0][3]).toEqual('group0');
        expect(grid[1][0]).toEqual('f0');
        expect(grid[1][3]).toEqual('f0');
    });

    it('should test legacy layout algorithm start', () => {
        component.computeLayoutData([]);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

const counter = new IncrementingCounter();

function createField(visible = true): BooleanField {
    const b = visible ? {visible: true} : {hidden: true};
    return new BooleanField('f' + counter.next(), 'title', false, b);
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
