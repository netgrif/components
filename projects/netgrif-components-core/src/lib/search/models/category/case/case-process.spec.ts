import {CaseProcess} from './case-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {Net} from '../../../../process/net';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {filter, take} from 'rxjs/operators';
import {SimpleExpression} from "../../../../pfql/model/simple-expression";

describe('CaseProcess', () => {
    let operatorService: OperatorService;
    let category: CaseProcess;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        category = await new CaseProcess(operatorService, null, createMockDependencies(allowedNets$, operatorService));
    }));

    afterEach(() => {
        allowedNets$.complete();
        category.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        allowedNets$.next([]);
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        allowedNets$.next([]);
        expect(category.isOperatorSelected()).toBeFalse();
        category.selectDefaultOperator();
        expect(category.isOperatorSelected()).toBeTrue();
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

    it('should generate options with unique name only', () => {
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

    it('should load pfql expression', (done) => {
        allowedNets$.next([
            createMockNet('', 'A', 'A'),
            createMockNet('', 'B', 'A'),
        ]);

        const options = category.options;
        expect(options.length).toBe(1);
        const option = options[0];
        expect(option.text).toBe('A');

        configureCategory(category, operatorService, Equals, [option]);

        const loadedCategory = new CaseProcess(operatorService, null, createMockDependencies(allowedNets$, operatorService));
        const expression = new SimpleExpression(new Equals(), 'A', category);

        // wait for autocomplete options to initialize
        loadedCategory.options$.pipe(filter(o => o.length > 0), take(1)).subscribe(() => {
            loadedCategory.loadFromPfqlExpression(expression).subscribe(() => {
                expect(loadedCategory.isOperatorSelected()).toBeTrue();
                expect(loadedCategory.providesPredicate).toBeTrue();

                expect((loadedCategory as any)._operandsFormControls[0].value).toEqual((category as any)._operandsFormControls[0].value);

                done();
            });
        });
    });

    it('should generate pfql query', () => {
        configureCategory(category, operatorService, Equals, ['foo']);
        const predicate = category.generatePredicate([['process']]);
        expect(predicate.query.value === `cases: processIdentifier eq 'process'`).toBeTrue();
    });
});
