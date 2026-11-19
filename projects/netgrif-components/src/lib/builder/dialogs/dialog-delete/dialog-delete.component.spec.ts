import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDeleteComponent} from './dialog-delete.component';
import {TranslateService} from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DialogDeleteComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogDeleteComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [TranslateLibModule],
            providers: [
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogDeleteComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
