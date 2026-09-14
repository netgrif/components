import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import moment from 'moment';
import {CaseCreationDateTime} from './case-creation-date-time';
import {EqualsDateTime} from '../../operator/equals-date-time';
import {TestBed} from '@angular/core/testing';
import {InRangeDateTime} from "../../operator/in-range-date-time";
import {SimpleExpression} from "../../../../pfql/model/simple-expression";

describe('CaseCreationDateTime', () => {
    let category: CaseCreationDateTime;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        category = new CaseCreationDateTime(operatorService, null);
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
        configureCategory(category, operatorService, EqualsDateTime, [moment('2021-08-18 15:28')]);

        const loadedCategory = new CaseCreationDateTime(operatorService, null);
        const expression = new SimpleExpression(new EqualsDateTime(operatorService), moment('2021-08-18 15:28'), category);
        loadedCategory.loadFromPfqlExpression(expression).subscribe(() => {
            expect(loadedCategory.isOperatorSelected()).toBeTrue();
            expect(loadedCategory.providesPredicate).toBeTrue();

            const originalMoment = (category as any)._operandsFormControls[0].value;
            const loadedMoment = (loadedCategory as any)._operandsFormControls[0].value;

            expect(moment.isMoment(originalMoment)).toBeTrue();
            expect(moment.isMoment(loadedMoment)).toBeTrue();
            expect(loadedMoment.isSame(originalMoment)).toBeTrue();

            done();
        });
    });

    it('should generate pfql query', () => {
        configureCategory(category, operatorService, InRangeDateTime, ['foo']);
        const predicate = category.generatePredicate([moment('2021-08-17 15:28'), moment('2021-08-18 15:28')]);
        expect(predicate.query.value === `cases: creationDate in (2021-08-17T15:28:00 : 2021-08-18T15:29:00)`).toBeTrue();
    });
});
