import {CaseRole} from './case-role';
import {CategoryFactory} from '../../../category-factory/category-factory';
import {OperatorService} from '../../../operator-service/operator.service';
import {CaseViewService} from '../../../../view/case-view/case-view-service';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

describe('CaseRole', () => {
    let mockCaseViewService: CaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: CaseViewService, useValue: {allowedNets$: of([])}}
            ]
        });
        mockCaseViewService = TestBed.inject(CaseViewService);
    });

    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new CaseRole(opService, null, {
            categoryFactory: new CategoryFactory(opService, null, mockCaseViewService, null),
            userResourceService: null,
            caseViewService: mockCaseViewService,
        })).toBeTruthy();
    });
});
