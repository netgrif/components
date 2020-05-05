import {TestBed} from '@angular/core/testing';

import {LanguageService} from './language.service';
import {MaterialModule} from '../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from './translate-lib.module';

describe('SelectLanguageService', () => {
    let service: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule, TranslateLibModule],
        });
        service = TestBed.inject(LanguageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set lang', () => {
        service.setLanguage('en-US');
        expect(localStorage.getItem('Language')).toEqual('en-US');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
