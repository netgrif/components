import {TestBed} from '@angular/core/testing';
import {OperatorResolverService} from './operator-resolver.service';
import {Operators} from '../models/operator/operators';

describe('OperatorResolverService', () => {
    let service: OperatorResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OperatorResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve all engine operators', () => {
        const operators = Object.values(Operators);
        expect(operators.length > 0).toBeTrue();
        for (const op of operators) {
            const operator = service.toClass(op);
            expect(operator).toBeTruthy();
        }
    });

    it('should not resolve random string', () => {
        expect(service.toClass('random')).toEqual(undefined);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
