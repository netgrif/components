import {TestBed} from '@angular/core/testing';

import {SnackBarService} from './snack-bar.service';
import {MaterialModule} from '../material/material.module';
import {MatDialog, MatSnackBar} from '@angular/material';

describe('SnackBarService', () => {
    let service: SnackBarService;
    let snackSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule]
        });
        service = TestBed.inject(SnackBarService);
        snackSpy = spyOn(TestBed.inject(MatSnackBar), 'open')
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open snackbars', () => {
        service.openInfoSnackBar('info');
        expect(snackSpy).toHaveBeenCalledWith('info', '✔', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' });

        service.openErrorSnackBar('error');
        expect(snackSpy).toHaveBeenCalledWith('error', '❌', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' });

        service.openWarningSnackBar('warn');
        expect(snackSpy).toHaveBeenCalledWith('warn', '!', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' });

        service.openGenericSnackBar('gen', 'action');
        expect(snackSpy).toHaveBeenCalledWith( 'gen', 'action', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
