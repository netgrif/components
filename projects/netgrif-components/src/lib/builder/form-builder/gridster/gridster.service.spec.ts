import {TestBed} from '@angular/core/testing';
import {ArcFactory} from '../../modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {GridsterService} from './gridster.service';
import {TranslateService} from "@ngx-translate/core";

describe('GridsterService', () => {
    let service: GridsterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GridsterService, ModelService, ArcFactory, SelectedTransitionService,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
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
