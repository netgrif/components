import {TestBed} from '@angular/core/testing';

import {PaperViewService} from './paper-view.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PaperViewService', () => {
    let service: PaperViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule]
        });
        service = TestBed.inject(PaperViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
