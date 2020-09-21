import {TestBed} from '@angular/core/testing';
import {DialogService} from './dialog.service';
import {of} from 'rxjs';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DialogService', () => {
    let service: DialogService;
    let dialogSpy: jasmine.Spy;
    const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of({}), close: null});

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [MatDialog]
        });
        service = TestBed.inject(DialogService);

        dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call simple dialog', () => {
        service.openAlertDialog('string', 'string');
        expect(dialogSpy).toHaveBeenCalled();
    });

    it('should call question dialog', () => {
        service.openConfirmDialog('string', 'string', 'yay', 'nay');
        expect(dialogSpy).toHaveBeenCalled();
    });
    it('should call dialog with answer', () => {
        service.openPromptDialog('string', 'string', 'placeholder');
        expect(dialogSpy).toHaveBeenCalled();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
