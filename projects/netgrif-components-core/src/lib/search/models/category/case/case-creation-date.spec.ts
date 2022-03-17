import {CaseCreationDate} from './case-creation-date';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Categories} from '../categories';
import {Operators} from '../../operator/operators';
import moment from 'moment';
import {EqualsDate} from '../../operator/equals-date';
import {TestBed} from '@angular/core/testing';

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

    it('should not serialize incomplete instance', () => {
        expect(category.createMetadata()).toBeUndefined();
    });

    it('should serialize complete instance', () => {
        configureCategory(category, operatorService, EqualsDate, [moment('2021-03-23')]);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        expect(metadata.values).toEqual([moment('2021-03-23').valueOf()]);
        expect(metadata.category).toBe(Categories.CASE_CREATION_DATE);
        expect(metadata.configuration?.operator).toBe(Operators.EQUALS_DATE);
    });

    it('should deserialize stored instance', (done) => {
        configureCategory(category, operatorService, EqualsDate, [moment('2021-03-23')]);

        const metadata = category.createMetadata();
        expect(metadata).toBeTruthy();
        const deserialized = new CaseCreationDate(operatorService, null);
        deserialized.loadFromMetadata(metadata).subscribe(() => {
            expect(deserialized.isOperatorSelected()).toBeTrue();
            expect(deserialized.providesPredicate).toBeTrue();

            const originalMoment = (category as any)._operandsFormControls[0].value;
            const deserializedMoment = (deserialized as any)._operandsFormControls[0].value;

            expect(moment.isMoment(originalMoment)).toBeTrue();
            expect(moment.isMoment(deserializedMoment)).toBeTrue();
            expect(deserializedMoment.isSame(originalMoment)).toBeTrue();

            const deserializedMetadata = deserialized.createMetadata();
            expect(deserializedMetadata).toBeTruthy();
            expect(deserializedMetadata.configuration).toEqual(metadata.configuration);
            expect(deserializedMetadata.category).toEqual(metadata.category);
            expect(deserializedMetadata.values).toEqual(metadata.values);

            done();
        });
    });
});
