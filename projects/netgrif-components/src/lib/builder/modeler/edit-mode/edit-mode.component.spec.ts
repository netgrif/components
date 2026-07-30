import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {ArcFactory} from './domain/arc-builders/arc-factory.service';
import {ModelService} from '../services/model/model.service';
import {EditModeService} from './edit-mode.service';
import {HistoryService} from '../services/history/history.service';
import {ModelImportService} from '../model-import-service';
import {ExportService} from '@netgrif/petriflow';
import {EditModeComponent} from './edit-mode.component';
import {LocalStorageService} from "../../services/local-storage.service";

describe('EditModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditModeComponent],
            providers: [
                ModelService,
                ArcFactory,
                HistoryService,
                ExportService,
                LocalStorageService,
                {provide: ModelImportService, useValue: {}},
                {provide: EditModeService, useValue: {}},
                {provide: MatDialog, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(EditModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
