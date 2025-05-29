import {DataField} from './abstract-data-field';
import {Behavior} from './behavior';
import {DEFAULT} from "./component";

describe('AbstractDataField', () => {
    let testAbstractDataField: TestAbstractDataField;

    beforeEach(() => {
        testAbstractDataField = new TestAbstractDataField('', '', 0, {});
    });
    it('should check value equality for number values', () => {
        expect(testAbstractDataField.checkValues(NaN, NaN)).toBeTrue();
        expect(testAbstractDataField.checkValues(10, 10)).toBeTrue();
        expect(testAbstractDataField.checkValues(10, NaN)).toBeFalse();
        expect(testAbstractDataField.checkValues(NaN, 10)).toBeFalse();
    });
});

class TestAbstractDataField extends DataField<any> {
    constructor(_stringId: string, _title: string, initialValue: number,
                _behavior: Behavior) {
        super(_stringId, _title, initialValue, _behavior);
    }

    public checkValues<T>(a: any, b: any): boolean {
        return this.valueEquality(a, b);
    }

    getTypedComponentType(): string {
        return DEFAULT;
    }
}
