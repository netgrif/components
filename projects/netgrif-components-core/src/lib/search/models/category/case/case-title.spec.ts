import {CaseTitle} from './case-title';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';
import {Substring} from '../../operator/substring';
import {CaseSearch} from './case-search.enum';
import {SearchIndexResolverService} from '../../../search-keyword-resolver-service/search-index-resolver.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';

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
    });

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        expect(category.isOperatorSelected()).toBeFalse();
        category.selectDefaultOperator();
        expect(category.isOperatorSelected()).toBeTrue();
    });

    it('should not serialize incomplete instance', () => {
        expect(category.createMetadata()).toBeUndefined();
    });

    it('should serialize complete instance', () => {
        configureCategory(category, operatorService, Equals, ['foo']);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        expect(metadata.values).toEqual(['foo']);
        expect(metadata.category).toBe(Categories.CASE_TITLE);
        expect(metadata.configuration?.operator).toBe(Operators.EQUALS);
    });

    it('should deserialize stored instance', (done) => {
        configureCategory(category, operatorService, Equals, ['foo']);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        const deserialized = new CaseTitle(operatorService, null);
        deserialized.loadFromMetadata(metadata).subscribe(() => {
            expect(deserialized.isOperatorSelected()).toBeTrue();
            expect(deserialized.providesPredicate).toBeTrue();

            expect((deserialized as any)._operandsFormControls[0].value).toEqual((category as any)._operandsFormControls[0].value);

            const deserializedMetadata = deserialized.createMetadata();
            expect(deserializedMetadata).toBeTruthy();
            expect(deserializedMetadata.configuration).toEqual(metadata.configuration);
            expect(deserializedMetadata.category).toEqual(metadata.category);
            expect(deserializedMetadata.values).toEqual(metadata.values);

            done();
        });
    });

    it('should use keyword index', () => {
        configureCategory(category, operatorService, Substring, ['foo']);
        const predicate = category.generatePredicate(['input']);
        expect(predicate.query.value.includes(`${CaseSearch.TITLE}${deps.searchIndexResolver.KEYWORD}`)).toBeTrue();
    });
});
