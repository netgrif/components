import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PetriNet} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {ModelService} from '../../modeler/services/model/model.service';
import {DialogRefactorComponent} from './dialog-refactor.component';

describe('DialogRefactorComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogRefactorComponent],
            imports: [NoopAnimationsModule],
            providers: [
                {provide: MatDialogRef, useValue: {beforeClosed() { return new Subject(); }}},
                {provide: MAT_DIALOG_DATA, useValue: {originalId: 'originalId', modelService: new MockModelService()}}
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
