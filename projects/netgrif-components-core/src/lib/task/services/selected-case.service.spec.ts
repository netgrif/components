import {TestBed} from '@angular/core/testing';
import {SelectedCaseService} from './selected-case.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('SelectedCaseService', () => {
    let service: SelectedCaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [SelectedCaseService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(SelectedCaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
