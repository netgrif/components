import {CaseStringId} from './case-string-id';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {TestBed} from '@angular/core/testing';
import {SimpleExpression} from "../../../../pfql/model/simple-expression";

describe('CaseStringId', () => {
    let category: CaseStringId;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        category = new CaseStringId(operatorService, null);
    });

    afterEach(() => {
        category.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        expect(category.isOperatorSelected()).toBeFalse();
        category.selectDefaultOperator();
        expect(category.isOperatorSelected()).toBeTrue();
    });

    it('should load pfql expression', (done) => {
        configureCategory(category, operatorService, Equals, ['foo']);

        const loadedCategory = new CaseStringId(operatorService, null);
        const expression = new SimpleExpression(new Equals(), 'foo', category);
        loadedCategory.loadFromPfqlExpression(expression).subscribe(() => {
            expect(loadedCategory.isOperatorSelected()).toBeTrue();
            expect(loadedCategory.providesPredicate).toBeTrue();

            expect((loadedCategory as any)._operandsFormControls[0].value).toEqual((category as any)._operandsFormControls[0].value);

            done();
        });
    });

    it('should generate pfql query', () => {
        configureCategory(category, operatorService, Equals, ['foo']);
        const predicate = category.generatePredicate(['6a5dc0cd2d68aa051f92cbe5']);
        expect(predicate.query.value === `cases: id eq '6a5dc0cd2d68aa051f92cbe5'`).toBeTrue();
    });
});
