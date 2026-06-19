import {TestBed} from '@angular/core/testing';
import {ArcFactory} from '../../modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {GridsterService} from './gridster.service';

describe('GridsterService', () => {
    let service: GridsterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GridsterService, ModelService, ArcFactory, SelectedTransitionService],
        });
        service = TestBed.inject(GridsterService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with empty placedDataFields', () => {
        expect(service.placedDataFields).toEqual([]);
    });

    it('should have options configured', () => {
        expect(service.options).toBeTruthy();
    });
});
