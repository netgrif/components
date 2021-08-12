import {EditablePredicateWithGenerator} from './editable-predicate-with-generator';
import {CaseTitle} from '../category/case/case-title';
import {OperatorService} from '../../operator-service/operator.service';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('EditablePredicateWithGenerator', () => {
    let generator: CaseTitle;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        generator = new CaseTitle(operatorService, null);
        expect(generator).toBeTruthy();
        generator.selectDefaultOperator();
        expect(generator.isOperatorSelected()).toBeTrue();
    });

    afterEach(() => {
        generator.destroy();
    });

    it(`should create an instance with generator that doesn't provide query`, () => {
        expect(generator.providesPredicate).toBeFalse();
        const predicate = new EditablePredicateWithGenerator(generator);
        expect(predicate).toBeTruthy();
        expect(predicate.getWrappedPredicate()).toBeTruthy();
        expect(predicate.getWrappedPredicate().query.isEmpty).toBeTrue();
    });

    it(`should create an instance with generator that provides query`, () => {
        generator.setOperands(['title']);
        expect(generator.providesPredicate).toBeTrue();
        const predicate = new EditablePredicateWithGenerator(generator);
        expect(predicate).toBeTruthy();
        expect(predicate.getWrappedPredicate()).toBeTruthy();
        expect(predicate.getWrappedPredicate().query.isEmpty).toBeFalse();
    });
});
