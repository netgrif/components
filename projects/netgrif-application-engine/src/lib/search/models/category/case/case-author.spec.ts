import {CaseAuthor} from './case-author';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Equals} from '../../operator/equals';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';

describe('CaseAuthor', () => {
    let category: CaseAuthor;
    let operatorService: OperatorService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        category = new CaseAuthor(operatorService, null);
    });

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('should not serialize incomplete instance', () => {
        expect(category.createMetadata()).toBeUndefined();
    });

    it('should serialize complete instance', () => {
        configureCategory(category, operatorService, Equals, ['foo']);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        expect(metadata.values).toEqual(['foo']);
        expect(metadata.category).toBe(Categories.CASE_AUTHOR);
        expect(metadata.configuration?.operator).toBe(Operators.EQUALS);
    });

    it('should deserialize stored instance', () => {
        configureCategory(category, operatorService, Equals, ['foo']);

        const metadata = category.createMetadata();
        const deserialized = new CaseAuthor(operatorService, null);
        deserialized.loadFromMetadata(metadata);
        expect(deserialized.isOperatorSelected()).toBeTrue();
        expect(deserialized.providesPredicate).toBeTrue();

        expect((category as any)._operandsFormControls[0].value).toEqual((deserialized as any)._operandsFormControls[0].value);

        const deserializedMetadata = deserialized.createMetadata();
        expect(deserializedMetadata).toBeTruthy();
        expect(deserializedMetadata.configuration).toEqual(metadata.configuration);
        expect(deserializedMetadata.category).toEqual(metadata.category);
        expect(deserializedMetadata.values).toEqual(metadata.values);
    });
});
