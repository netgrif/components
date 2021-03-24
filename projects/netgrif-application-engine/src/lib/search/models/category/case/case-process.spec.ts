import {CaseProcess} from './case-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {fakeAsync, waitForAsync} from '@angular/core/testing';
import {of, ReplaySubject} from 'rxjs';
import {Net} from '../../../../process/net';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {take} from 'rxjs/operators';

describe('CaseProcess', () => {
    let operatorService: OperatorService;
    let category: CaseProcess;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService();
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        category = await new CaseProcess(operatorService, null, createMockDependencies(allowedNets$));
    }));

    it('should create an instance', () => {
        allowedNets$.next([]);
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        allowedNets$.next([]);
        expect(category.selectDefaultOperator()).toBeUndefined();
    });

    it('should join operands correctly', () => {
        allowedNets$.next([]);
        category.selectDefaultOperator();
        const predicate = category.generatePredicate([['a', 'b']]);
        expect(predicate).toBeTruthy();
        expect(predicate.query).toBeTruthy();
        expect(predicate.query.isEmpty).toBeFalse();
        expect(predicate.query.value).toContain('OR');
    });

    it('should generate options with unique identifiers only', () => {
        allowedNets$.next([
            createMockNet('', 'A', 'A'),
            createMockNet('', 'A', 'A'),
            createMockNet('', 'A', 'B'),
            createMockNet('', 'B', 'B'),
        ]);
        category.selectDefaultOperator();

        const options = category.options;
        expect(options).toBeTruthy();
        expect(Array.isArray(options)).toBeTrue();
        expect(options.length).toBe(2);

        const optionA = options.find(o => o.text === 'A');
        const optionB = options.find(o => o.text === 'B');

        expect(optionA).toBeTruthy();
        expect(optionA.value).toBeTruthy();
        expect(Array.isArray(optionA.value)).toBeTrue();
        expect(optionA.value.length).toBe(1);
        expect(optionA.value[0]).toBe('A');

        expect(optionB).toBeTruthy();
        expect(optionB.value).toBeTruthy();
        expect(Array.isArray(optionB.value)).toBeTrue();
        expect(optionB.value.length).toBe(2);
        expect(optionB.value.some(o => o === 'A')).toBeTrue();
        expect(optionB.value.some(o => o === 'B')).toBeTrue();
    });

    afterEach(() => {
        allowedNets$.complete();
    });
});
