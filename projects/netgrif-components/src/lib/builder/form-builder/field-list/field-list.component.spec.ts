import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {PetriNet} from '@netgrif/petriflow';
import {BuilderModeService} from '../../services/builder-mode.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {GridsterService} from '../gridster/gridster.service';
import {FieldListService} from './field-list.service';
import {FieldListComponent} from './field-list.component';

describe('FieldListComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FieldListComponent],
            providers: [
                BuilderModeService,
                SelectedTransitionService,
                FieldListService,
                {provide: GridsterService, useValue: {}},
                {provide: ModelService, useValue: {model: new PetriNet()}},
                {provide: MatDialog, useValue: {}},
                {provide: Router, useValue: {}},
                {provide: MatSnackBar, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(FieldListComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
