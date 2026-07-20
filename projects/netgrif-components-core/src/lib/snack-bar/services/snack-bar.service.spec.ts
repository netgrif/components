import {TestBed} from '@angular/core/testing';
import {SnackBarService} from './snack-bar.service';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SuccessSnackBarComponent} from '../components/success-snack-bar/success-snack-bar.component';
import {ErrorSnackBarComponent} from '../components/error-snack-bar/error-snack-bar.component';
import {WarningSnackBarComponent} from '../components/warning-snack-bar/warning-snack-bar.component';
import {GenericSnackBarComponent} from '../components/generic-snack-bar/generic-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('SnackBarService', () => {
    let service: SnackBarService;
    let snackSpy: jasmine.Spy;

    const testConfig = {
        data: {
            message: 'info',
            matIconName: 'done'
        },
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [
                GenericSnackBarComponent,
                WarningSnackBarComponent,
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ]
        });
        service = TestBed.inject(SnackBarService);
        snackSpy = spyOn(TestBed.inject(MatSnackBar), 'openFromComponent');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open success snackbars', () => {
        service.openSuccessSnackBar('info');
        expect(snackSpy).toHaveBeenCalledWith(SuccessSnackBarComponent, {
            ...testConfig,
            data: Object.assign(testConfig.data, {message: 'info', matIconName: 'done', closable: false}),
            duration: 2500
        });
    });

    it('should open error snackbars', () => {
        service.openErrorSnackBar('error');
        expect(snackSpy).toHaveBeenCalledWith(ErrorSnackBarComponent, {
            ...testConfig,
            data: Object.assign(testConfig.data, {message: 'error', matIconName: 'error', closable: true})
        });
    });

    it('should open warning snackbars', () => {
        service.openWarningSnackBar('warn');
        expect(snackSpy).toHaveBeenCalledWith(WarningSnackBarComponent, {
            ...testConfig,
            data: Object.assign(testConfig.data, {message: 'warn', matIconName: 'warning', closable: false}),
            duration: 2500
        });
    });

    it('should open generic snackbars', () => {
        service.openGenericSnackBar('gen', 'done');
        expect(snackSpy).toHaveBeenCalledWith(GenericSnackBarComponent, {
            ...testConfig,
            data: Object.assign(testConfig.data, {message: 'gen', matIconName: 'done', closable: true}),
            duration: 2500
        });
    });

    afterEach(() => {
        snackSpy.calls.reset();
        TestBed.resetTestingModule();
    });
});
