import {NAE_TASK_COLS, TaskPanelContentComponent} from './task-panel-content.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskViewService} from '../../../view/task-view/task-view.service';
import {MatExpansionModule} from '@angular/material';
import {PanelModule} from '../../panel.module';
import {MaterialModule} from '../../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {TaskPanelContentService} from './task-panel-content.service';
import {MaterialAppearance, TemplateAppearance} from '../../../data-fields/models/abstract-data-field';
import {BooleanField} from '../../../data-fields/boolean-field/models/boolean-field';
import {MaterialAppearance} from '../../../data-fields/models/material-appearance';
import {TemplateAppearance} from '../../../data-fields/models/template-appearance';

describe('TaskPanelContentComponent', () => {
    let component: TaskPanelContentComponent;
    let fixture: ComponentFixture<TaskPanelContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule
            ],
            providers: [
                TaskViewService,
                TaskPanelContentService,
                {provide: NAE_TASK_COLS, useValue: 4},
            ],
            declarations: []
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskPanelContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test algoritm', () => {
        expect(component.fillBlankSpace([
            {
                fields: [
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {editable: true})
                ],
                title: 'string',
                alignment: 'end',
                stretch: false,
                layout: {
                    cols: 4,
                    rows: undefined
                }
            }, {
                fields: [
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {hidden: true}),
                    new BooleanField('', '', true, {editable: true}),
                ],
                title: 'string',
                alignment: 'center',
                stretch: true
            }, {
                fields: [
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {editable: true}),
                ],
                title: 'string',
                alignment: 'center',
                stretch: false
            }, {
                fields: [
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {editable: true}),
                    new BooleanField('', '', true, {hidden: true})
                ],
                title: 'string',
                alignment: 'start',
                stretch: false,
                layout: {cols: 3, rows: undefined}
            }, {
                fields: [
                    new BooleanField('', '', true, {editable: true},
                        undefined, undefined, {
                            x: 1,
                            y: 12,
                            cols: 2,
                            rows: 1,
                            appearance: MaterialAppearance.OUTLINE,
                            template: TemplateAppearance.NETGRIF,
                        }),
                    new BooleanField('', '', true, {hidden: true},
                        undefined, undefined, {
                            x: 0,
                            y: 13,
                            cols: 2,
                            rows: 1,
                            appearance: MaterialAppearance.OUTLINE,
                            template: TemplateAppearance.NETGRIF,
                        })
                ],
                title: '',
                alignment: 'start',
                stretch: false,
                layout: {cols: 3, rows: undefined}
            },
        ], 4).length).toEqual(20);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

