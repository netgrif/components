import {CaseDataset} from './case-dataset';
import {CategoryFactory} from '../../../category-factory/category-factory';
import {OperatorService} from '../../../operator-service/operator.service';
import {CaseViewService} from '../../../../view/case-view/case-view-service';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

describe('CaseDataset', () => {
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
        expect(new CaseDataset(opService, null, {
            categoryFactory: new CategoryFactory(opService, null, mockCaseViewService, null),
            userResourceService: null,
            caseViewService: mockCaseViewService,
        })).toBeTruthy();
    });
});
