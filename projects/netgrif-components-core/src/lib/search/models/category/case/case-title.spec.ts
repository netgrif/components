import {CaseTitle} from './case-title';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {TestBed} from '@angular/core/testing';
import {Substring} from '../../operator/substring';
import {CaseSearch} from './case-search.enum';
import {SearchIndexResolverService} from '../../../search-keyword-resolver-service/search-index-resolver.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NotEquals} from "../../operator/not-equals";
import {SimpleExpression} from "../../../../pfql/model/simple-expression";

describe('CaseTitle', () => {
    let category: CaseTitle;
    let operatorService: OperatorService;
    let deps: OptionalDependencies;


    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        deps = {searchIndexResolver: new SearchIndexResolverService()} as OptionalDependencies;
        category = new CaseTitle(operatorService, null, deps);
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

        const loadedCategory = new CaseTitle(operatorService, null);
        const expression = new SimpleExpression(new Equals(), 'foo', category);
        loadedCategory.loadFromPfqlExpression(expression).subscribe(() => {
            expect(loadedCategory.isOperatorSelected()).toBeTrue();
            expect(loadedCategory.providesPredicate).toBeTrue();

            expect((loadedCategory as any)._operandsFormControls[0].value).toEqual((category as any)._operandsFormControls[0].value);

            done();
        });
    });

    it('should generate pfql query', () => {
        configureCategory(category, operatorService, Substring, ['foo']);
        let predicate = category.generatePredicate(['input']);
        expect(predicate.query.value.includes(`cases: ${CaseSearch.TITLE} contains 'input'`)).toBeTrue();

        configureCategory(category, operatorService, NotEquals, ['foo']);
        predicate = category.generatePredicate(['loggedUser.id']);
        expect(predicate.query.value === `cases: ${CaseSearch.TITLE} neq loggedUser.id`).toBeTrue();
    });
});
