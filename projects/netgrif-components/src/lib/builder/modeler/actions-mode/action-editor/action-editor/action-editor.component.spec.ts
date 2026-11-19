import {MaterialModule} from '@netgrif/components-core';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {ArcFactory} from '../../../edit-mode/domain/arc-builders/arc-factory.service';
import {ModelService} from '../../../services/model/model.service';
import {ActionEditorService} from '../action-editor.service';
import {ActionEditorComponent} from './action-editor.component';
import { TranslateService } from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {BuilderModeService} from "../../../../services/builder-mode.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('ActionEditorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionEditorComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [TranslateLibModule, MaterialModule],
            providers: [
                ActionEditorService,
                ModelService,
                ArcFactory,
                {provide: MatDialog, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                BuilderModeService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionEditorComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
