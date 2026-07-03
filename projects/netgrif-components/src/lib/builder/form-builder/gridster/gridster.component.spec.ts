import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {BuilderModeService} from '../../services/builder-mode.service';
import {ArcFactory} from '../../modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {HistoryService} from '../../modeler/services/history/history.service';
import {ExportService} from '@netgrif/petriflow';
import {GridsterService} from './gridster.service';
import {FieldListService} from '../field-list/field-list.service';
import {GridsterComponent} from './gridster.component';

describe('GridsterComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GridsterComponent],
            providers: [
                GridsterService,
                FieldListService,
                ModelService,
                ArcFactory,
                SelectedTransitionService,
                BuilderModeService,
                HistoryService,
                ExportService,
                {provide: Router, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(GridsterComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
