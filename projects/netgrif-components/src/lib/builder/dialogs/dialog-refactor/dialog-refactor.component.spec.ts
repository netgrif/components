import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PetriNet} from '@netgrif/petriflow';
import {Subject} from 'rxjs';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {ModelService} from '../../modeler/services/model/model.service';

import {DialogRefactorComponent} from './dialog-refactor.component';

describe('DialogRefactorComponent', () => {
    let component: DialogRefactorComponent;
    let fixture: ComponentFixture<DialogRefactorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DialogRefactorComponent],
            imports: [MaterialImportModule, NoopAnimationsModule],
            providers: [
                { provide: MatDialogRef, useValue: {
                    beforeClosed() {
                        return new Subject();
                    }
                    }
                    },
                { provide: MAT_DIALOG_DATA, useValue: [] },
                { provide: ModelService, useClass: MockModelService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogRefactorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class MockModelService {
    model = new PetriNet();
}
