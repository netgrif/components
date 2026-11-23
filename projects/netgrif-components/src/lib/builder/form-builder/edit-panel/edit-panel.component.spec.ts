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
import {DataMasterDetailService} from "../../modeler/data-mode/data-master-detail.service";
import {TutorialService} from "../../tutorial/tutorial-service";
import {MortgageService} from "../../modeler/mortgage.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ModelImportService} from "../../modeler/model-import-service";

describe('EditPanelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [EditPanelComponent],
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
                {provide: DataMasterDetailService, useValue: {}},
                TutorialService,
                MortgageService,
                {provide: ModelImportService, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(EditPanelComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
