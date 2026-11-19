import {TestBed} from '@angular/core/testing';

import {TreeCaseViewService} from './tree-case-view.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TreeCaseViewService', () => {
    let service: TreeCaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [TreeCaseViewService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(TreeCaseViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
