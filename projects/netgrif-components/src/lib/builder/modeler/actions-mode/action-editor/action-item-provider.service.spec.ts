import {TestBed} from '@angular/core/testing';
import {ActionItemProviderService} from './action-item-provider.service';
import {TranslateService} from "@ngx-translate/core";

describe('ActionItemproviderService', () => {
    let service: ActionItemProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [ActionItemProviderService,
                {provide: TranslateService, useValue: { instant: (key: string) => `translated-${key}` }}
            ]});
        service = TestBed.inject(ActionItemProviderService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
