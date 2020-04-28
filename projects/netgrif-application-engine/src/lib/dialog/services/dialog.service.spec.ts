import {TestBed} from '@angular/core/testing';
import {DialogService} from './dialog.service';
import {MatDialog, MatDialogModule} from '@angular/material';
import {of} from 'rxjs';

describe('DialogService', () => {
    let service: DialogService;
    let dialogSpy: jasmine.Spy;
    const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of({}), close: null});

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [MatDialog]
        });
        service = TestBed.inject(DialogService);

        dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call simple dialog', () => {
        service.openSimpleDialog('string', 'string');
        expect(dialogSpy).toHaveBeenCalled();
    });

    it('should call question dialog', () => {
        service.openQuestionDialog('string', 'string', 'yay', 'nay');
        expect(dialogSpy).toHaveBeenCalled();
    });
    it('should call dialog with answer', () => {
        service.openQuestionWithAnswerDialog('string', 'string', 'placeholder');
        expect(dialogSpy).toHaveBeenCalled();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
