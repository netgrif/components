import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskModeComponent} from './task-mode.component';
import {ModelService} from "../services/model/model.service";
import {ArcFactory} from "../edit-mode/domain/arc-builders/arc-factory.service";
import {PetriflowCanvasService} from "@netgrif/petriflow.svg";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {provideRouter} from '@angular/router';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {NAE_VIEW_ID_SEGMENT, TestMockDependenciesModule, TranslateLibModule} from "@netgrif/components-core";
import {BuilderIntegrationService} from '../../services/builder-integration.service';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskModeComponent', () => {
    let component: TaskModeComponent;
    let fixture: ComponentFixture<TaskModeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TaskModeComponent,
                CommonModule,
                TestMockDependenciesModule,
                TranslateLibModule
            ],
            providers: [
                ModelService,
                ArcFactory,
                // provided by nc-builder in the application
                { provide: BuilderIntegrationService, useValue: {}},
                {provide: PetriflowCanvasService, useValue: { }},
                provideRouter([]),
                { provide: NAE_VIEW_ID_SEGMENT, useValue: 'builder-task-mode' },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });

        fixture = TestBed.createComponent(TaskModeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
