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
import {BooleanField} from '../../data-fields/boolean-field/models/boolean-field';
import {MaterialAppearance} from '../../data-fields/models/material-appearance';
import {TemplateAppearance} from '../../data-fields/models/template-appearance';
import {Component, Optional} from '@angular/core';
import {AbstractTaskContentComponent} from './abstract-task-content.component';
import {FieldConverterService} from '../services/field-converter.service';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventService} from '../services/task-event.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestTaskComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestTaskComponent);
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
                            offset: 0,
                            appearance: MaterialAppearance.OUTLINE,
                            template: TemplateAppearance.NETGRIF,
                        }),
                    new BooleanField('', '', true, {hidden: true},
                        undefined, undefined, {
                            x: 0,
                            y: 13,
                            cols: 2,
                            rows: 1,
                            offset: 0,
                            appearance: MaterialAppearance.OUTLINE,
                            template: TemplateAppearance.NETGRIF,
                        })
                ],
                title: '',
                alignment: 'start',
                stretch: false,
                layout: {cols: 3, rows: undefined}
            },
        ], 4).length).toEqual(24);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

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
