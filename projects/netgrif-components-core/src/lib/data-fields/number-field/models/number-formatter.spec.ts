import {DecimalPipe} from '@angular/common';
import {NumberFormatter} from './number-formatter';

describe('NumberFormatter', () => {
    const decimalPipe = new DecimalPipe('en-US');
    const values = [0, 1, -1, 0.5, 0.005, 0.0049, 1.005, 12.345, 123456, 1234567.891, -1234567.891, 999.995, -0.001, 1e21, 1.5e-7];
    const digitsInfos = [undefined, '1.0-0', '1.2-2', '3.1-5', '.3', '2.', '1.0-3'];

    it('should format the same way as DecimalPipe with en-US locale', () => {
        digitsInfos.forEach(digitsInfo => {
            const formatter = new NumberFormatter({decimalSeparator: '.', groupSeparator: ',', digitsInfo});
            values.forEach(value => {
                expect(formatter.format(value)).withContext(`${value} ${digitsInfo}`).toEqual(decimalPipe.transform(value, digitsInfo));
            });
        });
    });

    it('should use custom separators', () => {
        const formatter = new NumberFormatter({decimalSeparator: ',', groupSeparator: '.', digitsInfo: '1.2-2'});
        expect(formatter.format(1234567.891)).toEqual('1.234.567,89');
        expect(formatter.format(-12)).toEqual('-12,00');
        expect(new NumberFormatter({groupSeparator: ',', digitsInfo: '1.0-0'}).format(123456)).toEqual('123,456');
    });

    it('should use default separators', () => {
        expect(new NumberFormatter({digitsInfo: '1.2-2'}).format(1234567.891)).toEqual('1 234 567.89');
    });

    it('should return null for non numeric values', () => {
        const formatter = new NumberFormatter();
        expect(formatter.format(null)).toBeNull();
        expect(formatter.format(undefined)).toBeNull();
        expect(formatter.format(NaN)).toBeNull();
    });

    it('should throw on invalid digitsInfo', () => {
        expect(() => new NumberFormatter({digitsInfo: 'abc'})).toThrowError();
        expect(() => new NumberFormatter({digitsInfo: '1.3-2'})).toThrowError();
    });
});
