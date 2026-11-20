import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PetriNet} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {DialogRefactorComponent} from './dialog-refactor.component';
import {TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateLibModule} from "@netgrif/components-core";

describe('DialogRefactorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogRefactorComponent],
            imports: [
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
            ],
            providers: [
                {provide: MatDialogRef, useValue: {beforeClosed() { return new Subject(); }}},
                {provide: MAT_DIALOG_DATA, useValue: {originalId: 'originalId', modelService: new MockModelService()}},
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ],
            schemas: [NO_ERRORS_SCHEMA],
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
