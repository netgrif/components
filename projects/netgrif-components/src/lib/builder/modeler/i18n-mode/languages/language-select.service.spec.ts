import {TestBed} from '@angular/core/testing';
import {LanguageSelectService} from './language-select.service';

describe('LanguageSelectService', () => {
    let service: LanguageSelectService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [LanguageSelectService]});
        service = TestBed.inject(LanguageSelectService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
