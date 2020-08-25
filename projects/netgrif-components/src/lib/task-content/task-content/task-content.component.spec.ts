import {TaskContentComponent} from './task-content.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PanelComponentModule} from '../../panel/panel.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {
    MaterialModule,
    TranslateLibModule,
    ConfigurationService,
    TestConfigurationService,
    BooleanField,
    TaskViewService,
    TaskContentService,
    MaterialAppearance,
    TemplateAppearance
} from '@netgrif/application-engine';

describe('TaskContentComponent', () => {
    let component: TaskContentComponent;
    let fixture: ComponentFixture<TaskContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelComponentModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                TranslateLibModule
            ],
            providers: [
                TaskViewService,
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: []
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskContentComponent);
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

