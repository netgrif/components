import {TestBed} from '@angular/core/testing';
import {LanguageSelectService} from './language-select.service';
import {TranslateService} from "@ngx-translate/core";

describe('LanguageSelectService', () => {
    let service: LanguageSelectService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [LanguageSelectService,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ]});
        service = TestBed.inject(LanguageSelectService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
