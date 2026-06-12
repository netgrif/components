import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ImportService} from '@netgrif/petriflow';
import {of} from 'rxjs';
import {BuilderModeService} from './builder-mode.service';
import {ArcFactory} from './modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {EditModeService} from './modeler/edit-mode/edit-mode.service';
import {ExportService} from '@netgrif/petriflow';
import {HistoryService} from './modeler/services/history/history.service';
import {ModelService} from './modeler/services/model/model.service';
import {BuilderComponent} from './builder.component';

describe('BuilderComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BuilderComponent],
            imports: [HttpClientTestingModule],
            providers: [
                ModelService,
                ArcFactory,
                BuilderModeService,
                HistoryService,
                ExportService,
                {provide: EditModeService, useValue: {}},
                {provide: ImportService, useValue: {}},
                {provide: MatDialog, useValue: {}},
                {provide: Router, useValue: {navigate: () => {}}},
                {provide: ActivatedRoute, useValue: {queryParams: of({})}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(BuilderComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
