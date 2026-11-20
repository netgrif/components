import {CaseCreationDate} from './case-creation-date';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import moment from 'moment';
import {EqualsDate} from '../../operator/equals-date';
import {TestBed} from '@angular/core/testing';
import {SimpleExpression} from "../../../../pfql/model/simple-expression";

describe('CaseCreationDate', () => {
    let category: CaseCreationDate;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        category = new CaseCreationDate(operatorService, null);
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
        configureCategory(category, operatorService, EqualsDate, [moment('2021-03-23')]);

        const loadedCategory = new CaseCreationDate(operatorService, null);
        const expression = new SimpleExpression(new EqualsDate(operatorService), moment('2021-03-23'), category);
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
        configureCategory(category, operatorService, EqualsDate, [moment('2021-03-23')]);
        const predicate = category.generatePredicate([moment('2021-03-23')]);
        expect(predicate.query.value).toEqual(`cases: creationDate in (2021-03-23 : 2021-03-24)`);
    });
});
