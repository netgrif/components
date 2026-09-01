import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ImportService} from '@netgrif/petriflow';
import {of} from 'rxjs';
import {BuilderModeService} from './services/builder-mode.service';
import {ArcFactory} from './modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {EditModeService} from './modeler/edit-mode/edit-mode.service';
import {ExportService} from '@netgrif/petriflow';
import {HistoryService} from './modeler/services/history/history.service';
import {ModelService} from './modeler/services/model/model.service';
import {BuilderComponent} from './builder.component';
import {ConfigurationService, TestConfigurationService} from '@netgrif/components-core';
import {CommonModule} from "@angular/common";

describe('BuilderComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BuilderComponent],
            imports: [HttpClientTestingModule, CommonModule],
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
                {provide: ConfigurationService, useClass: TestConfigurationService},
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
