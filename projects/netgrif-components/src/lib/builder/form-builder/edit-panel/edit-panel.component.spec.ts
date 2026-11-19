import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {BuilderModeService} from '../../services/builder-mode.service';
import {ArcFactory} from '../../modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {ActionsMasterDetailService} from '../../modeler/actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../modeler/actions-mode/actions-mode.service';
import {GridsterService} from '../gridster/gridster.service';
import {FieldListService} from '../field-list/field-list.service';
import {EditPanelComponent} from './edit-panel.component';
import {TranslateService} from "@ngx-translate/core";
import {DataModeService} from "../../modeler/data-mode/data-mode.service";
import {TutorialService} from "../../tutorial/tutorial-service";
import {MortgageService} from "../../modeler/mortgage.service";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {ModelImportService} from "../../modeler/model-import-service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('EditPanelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditPanelComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [],
            providers: [
                GridsterService,
                FieldListService,
                ModelService,
                ArcFactory,
                SelectedTransitionService,
                BuilderModeService,
                {provide: ActionsModeService, useValue: {}},
                {provide: ActionsMasterDetailService, useValue: {}},
                {provide: MatDialog, useValue: {}},
                {provide: Router, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                DataModeService,
                TutorialService,
                MortgageService,
                {provide: ModelImportService, useValue: {}},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(EditPanelComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
