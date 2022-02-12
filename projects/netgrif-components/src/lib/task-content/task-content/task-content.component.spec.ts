import {TaskContentComponent} from './task-content.component';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {PanelComponentModule} from '../../panel/panel.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {
    MaterialModule,
    TranslateLibModule,
    ConfigurationService,
    TestConfigurationService,
    TaskViewService,
    TaskContentService,
} from '@netgrif/components-core';

describe('TaskContentComponent', () => {
    let component: TaskContentComponent;
    let fixture: ComponentFixture<TaskContentComponent>;

    beforeEach(waitForAsync(() => {
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

