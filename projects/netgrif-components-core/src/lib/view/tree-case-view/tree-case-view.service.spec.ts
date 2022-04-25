import {TestBed} from '@angular/core/testing';

import {TreeCaseViewService} from './tree-case-view.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TreeCaseViewService', () => {
    let service: TreeCaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [TreeCaseViewService]
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
