import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskModeComponent} from './task-mode.component';
import {ModelService} from "../services/model/model.service";
import {ArcFactory} from "../edit-mode/domain/arc-builders/arc-factory.service";
import {PetriflowCanvasService} from "@netgrif/petriflow.svg";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TestMockDependenciesModule} from "@netgrif/components-core";

xdescribe('TaskModeComponent', () => {
    let component: TaskModeComponent;
    let fixture: ComponentFixture<TaskModeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TaskModeComponent,
                CommonModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TestMockDependenciesModule,
            ],
            providers: [
                ModelService,
                ArcFactory,
                {provide: PetriflowCanvasService, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
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
