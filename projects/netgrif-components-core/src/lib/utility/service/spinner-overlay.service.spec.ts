import {TestBed} from '@angular/core/testing';
import {SpinnerOverlayService} from './spinner-overlay.service';
import {RouterTestingModule} from '@angular/router/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SpinnerOverlayService', () => {
    let service: SpinnerOverlayService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), OverlayModule, NoopAnimationsModule]
        });
        service = TestBed.inject(SpinnerOverlayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
