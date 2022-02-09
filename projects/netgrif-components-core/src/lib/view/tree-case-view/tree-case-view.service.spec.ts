import {TestBed} from '@angular/core/testing';

import {TreeCaseViewService} from './tree-case-view.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TreeCaseViewService', () => {
    let service: TreeCaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
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
