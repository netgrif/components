import {CaseRole} from './case-role';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';

describe('CaseRole', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = await new OperatorService();
        expect(new CaseRole(opService, null, createMockDependencies())).toBeTruthy();
    }));
});
