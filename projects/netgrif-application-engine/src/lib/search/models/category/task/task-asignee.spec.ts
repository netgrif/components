import {TaskAssignee} from './task-assignee';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {OperatorService} from '../../../operator-service/operator.service';
import {CategoryFactory} from '../../../category-factory/category-factory';

describe('TaskAsignee', () => {
    let mockUserResourceService: UserResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: UserResourceService, useValue: {getAll: () => of([])}}
            ]
        });
        mockUserResourceService = TestBed.inject(UserResourceService);
    });
    it('should create an instance', () => {
        const opService = new OperatorService();
        expect(new TaskAssignee(opService, null, {
            categoryFactory: new CategoryFactory(opService, null, null, mockUserResourceService),
            userResourceService: mockUserResourceService,
            caseViewService: null,
        })).toBeTruthy();
    });
});
