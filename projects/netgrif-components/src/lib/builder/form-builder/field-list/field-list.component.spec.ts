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
import {TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";

describe('FieldListComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
            ],
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
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
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
