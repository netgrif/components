import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ModelService} from '../../../services/model/model.service';
import {ActionEditorService} from '../action-editor.service';
import {FunctionEditorComponent} from './function-editor.component';
import {TranslateService} from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FunctionEditorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FunctionEditorComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [MatMenuModule, MatSidenavModule,
                TranslateLibModule],
            providers: [
                {provide: ActionEditorService, useValue: {nextId: () => '1'}},
                {provide: ModelService, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(FunctionEditorComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
