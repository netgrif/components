import {TestBed} from '@angular/core/testing';

import {SelectLanguageService} from './select-language.service';
import {MaterialModule} from '../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../translate/translate-lib.module';

describe('SelectLanguageService', () => {
    let service: SelectLanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule, TranslateLibModule],
        });
        service = TestBed.inject(SelectLanguageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set lang', () => {
        service.setLanguage('en');
        expect(localStorage.getItem('Language')).toEqual('en');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
