import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {ArcFactory} from '../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../services/model/model.service';
import {SimulationModeService} from './simulation-mode.service';
import {SimulationModeComponent} from './simulation-mode.component';

describe('SimulationModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SimulationModeComponent],
            providers: [
                ModelService,
                ArcFactory,
                {provide: SimulationModeService, useValue: {}},
                {provide: PetriflowCanvasService, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(SimulationModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
