import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PetriNet} from '@netgrif/petriflow';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {BehaviorSubject, Subject} from 'rxjs';
import {ArcFactory} from '../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../services/model/model.service';
import {SelectedTransitionService} from '../selected-transition.service';
import {TutorialService} from '../../tutorial/tutorial-service';
import {SimulationModeService} from './simulation-mode.service';

describe('SimulationModeService', () => {
    let service: SimulationModeService;

    beforeEach(() => {
        const net = new PetriNet();
        TestBed.configureTestingModule({
            providers: [
                SimulationModeService,
                ArcFactory,
                SelectedTransitionService,
                {provide: PetriflowCanvasService, useValue: {gridConfiguration: {size: 0}}},
                {provide: MatDialog, useValue: {}},
                {provide: Router, useValue: {}},
                {provide: TutorialService, useValue: {}},
                {provide: ModelService, useValue: {
                    model: net,
                    modelSubject: new BehaviorSubject(net),
                    placeChange: new Subject(),
                    transitionChange: new Subject(),
                    arcChange: new Subject(),
                }},
            ],
        });
        service = TestBed.inject(SimulationModeService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
