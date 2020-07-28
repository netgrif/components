import {TestBed} from '@angular/core/testing';
import {UserAssignService} from './user-assign.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ErrorSnackBarComponent} from '../../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../../snack-bar/components/success-snack-bar/success-snack-bar.component';

describe('UserAssignService', () => {
    let service: UserAssignService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).compileComponents();
        service = TestBed.inject(UserAssignService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
