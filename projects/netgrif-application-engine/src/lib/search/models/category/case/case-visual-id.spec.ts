import {CaseVisualId} from './case-visual-id';
import {OperatorService} from '../../../operator-service/operator.service';
import {waitForAsync} from '@angular/core/testing';

describe('CaseVisualId', () => {
    it('should create an instance', waitForAsync(async () => {
        expect(new CaseVisualId(await new OperatorService(), null)).toBeTruthy();
    }));
});
