import {TestBed} from '@angular/core/testing';

import {SelectLanguageService} from './select-language.service';
import {MaterialModule} from '../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpLoaderFactory} from './toolbar.module';
import {HttpClient} from '@angular/common/http';

describe('SelectLanguageService', () => {
  let service: SelectLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule, HttpClientTestingModule,
            TranslateModule.forChild({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (HttpLoaderFactory),
                    deps: [HttpClient]
                }
            })],
        providers: [TranslateService, TranslatePipe, TranslateStore, HttpClient],
    });
    service = TestBed.inject(SelectLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
