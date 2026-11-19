import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {ModelService} from '../../services/model/model.service';
import {TaskRefInitFieldComponent} from './task-ref-init-field.component';
import {TranslateService} from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {BuilderModeService} from "../../../services/builder-mode.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskRefInitFieldComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TaskRefInitFieldComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, MatAutocompleteModule, MatChipsModule,
                TranslateLibModule],
            providers: [{provide: ModelService, useValue: {model: {}}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                BuilderModeService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(TaskRefInitFieldComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
