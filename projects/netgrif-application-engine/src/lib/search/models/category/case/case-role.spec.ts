import {CaseRole} from './case-role';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';

describe('CaseRole', () => {
    it('should create an instance', waitForAsync(async () => {
        const opService = new OperatorService(new OperatorResolverService());
        expect(await new CaseRole(opService, null, createMockDependencies(of([])))).toBeTruthy();
    }));
});
