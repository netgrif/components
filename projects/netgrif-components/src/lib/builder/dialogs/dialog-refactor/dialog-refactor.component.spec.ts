import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PetriNet} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {DialogRefactorComponent} from './dialog-refactor.component';
import {TranslateService} from "@ngx-translate/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DialogRefactorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogRefactorComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateLibModule
            ],
            providers: [
                {provide: MatDialogRef, useValue: {beforeClosed() { return new Subject(); }}},
                {provide: MAT_DIALOG_DATA, useValue: {originalId: 'originalId', modelService: new MockModelService()}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(DialogRefactorComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});

class MockModelService {
    model = new PetriNet();
}
