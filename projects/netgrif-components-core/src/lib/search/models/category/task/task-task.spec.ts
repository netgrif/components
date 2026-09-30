import {TaskTask} from './task-task';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {OperatorService} from '../../../operator-service/operator.service';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Net} from '../../../../process/net';
import {createMockNet} from '../../../../utility/tests/utility/create-mock-net';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {filter, take} from 'rxjs/operators';
import {SimpleExpression} from "../../../../pfql/model/simple-expression";

describe('TaskTask', () => {
    let operatorService: OperatorService;
    let category: TaskTask;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        category = await new TaskTask(operatorService, null, createMockDependencies(allowedNets$, operatorService));
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

    it('should generate options with unique names only', () => {
        allowedNets$.next([
            createMockNet('', 'A', 'A', undefined, [{title: 'transition1', stringId: 'sid1'}, {title: 'transition2', stringId: 'sid2'}]),
            createMockNet('', 'B', 'B', undefined, [{title: 'transition2', stringId: 'sid3'}]),
        ]);
        category.selectDefaultOperator();

        const options = category.options;
        expect(options).toBeTruthy();
        expect(Array.isArray(options)).toBeTrue();
        expect(options.length).toBe(2);

        const option1 = options.find(o => o.text === 'transition1');
        const option2 = options.find(o => o.text === 'transition2');

        expect(option1).toBeTruthy();
        expect(option1.value).toBeTruthy();
        expect(Array.isArray(option1.value)).toBeTrue();
        expect(option1.value.length).toBe(1);
        expect(option1.value[0].attributeId).toBe('sid1');

        expect(option2).toBeTruthy();
        expect(option2.value).toBeTruthy();
        expect(Array.isArray(option2.value)).toBeTrue();
        expect(option2.value.length).toBe(2);
        expect(option2.value.some(o => o.attributeId === 'sid2')).toBeTrue();
        expect(option2.value.some(o => o.attributeId === 'sid3')).toBeTrue();
    });

    it('should load pfql expression', (done) => {
        allowedNets$.next([
            createMockNet('', 'A', 'A', undefined, [{title: 'transition1', stringId: 'sid1'}]),
            createMockNet('', 'B', 'B', undefined, [{title: 'transition1', stringId: 'sid2'}]),
        ]);

        const options = category.options;
        expect(options.length).toBe(1);
        const option = options[0];
        expect(option.text).toBe('transition1');

        configureCategory(category, operatorService, Equals, [option]);

        const loadedCategory = new TaskTask(operatorService, null, createMockDependencies(allowedNets$, operatorService));
        const expression = new SimpleExpression(new Equals(), 'sid1', category);

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
        allowedNets$.next([
            createMockNet('', 'A', 'A', undefined, [{title: 'transition1', stringId: 'sid1'}]),
        ]);

        const options = category.options;
        expect(options.length).toBe(1);
        const option = options[0];
        expect(option.text).toBe('transition1');

        configureCategory(category, operatorService, Equals, [option]);
        let predicate = category.generatePredicate([[{netId: 'A', attributeId: 'sid1'}]]);
        expect(predicate.query.value).toEqual('tasks: (transitionId eq \'sid1\') AND (processId eq \'A\')');
    });
});
