import {TestBed} from '@angular/core/testing';
import {FieldListService} from './field-list.service';
import {TranslateService} from "@ngx-translate/core";

describe('FieldListService', () => {
    let service: FieldListService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [FieldListService,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ]});
        service = TestBed.inject(FieldListService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
