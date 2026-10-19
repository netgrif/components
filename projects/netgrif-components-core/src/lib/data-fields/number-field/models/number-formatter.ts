import {DEFAULT_NUMBER_FORMAT, NumberFormat} from './number-format';

const DIGITS_INFO_REGEX = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
const MAX_DIGITS = 22;
const GROUP_SIZE = 3;

interface ParsedNumber {
    digits: Array<number>;
    exponent: number;
    integerLen: number;
}

interface DigitsInfo {
    minInt: number;
    minFrac: number;
    maxFrac: number;
}

/**
 * Formats numbers with custom decimal and group separators.
 *
 * The `digitsInfo` attribute is interpreted and the number is rounded in the same way as by the angular `DecimalPipe`.
 * If the `digitsInfo` is not provided the `DecimalPipe` defaults are used (`1.0-3`).
 */
export class NumberFormatter {

    protected readonly _decimalSeparator: string;
    protected readonly _groupSeparator: string;
    protected readonly _digitsInfo: DigitsInfo;

    constructor(format: NumberFormat = {}) {
        this._decimalSeparator = format.decimalSeparator ?? DEFAULT_NUMBER_FORMAT.decimalSeparator;
        this._groupSeparator = format.groupSeparator ?? DEFAULT_NUMBER_FORMAT.groupSeparator;
        this._digitsInfo = NumberFormatter.parseDigitsInfo(format.digitsInfo);
    }

    /**
     * @param value number to be formatted
     * @returns the formatted number, or `null` if the value is not a number (same as `DecimalPipe`)
     */
    public format(value: number | string | null | undefined): string | null {
        if (value === null || value === undefined || value === '') {
            return null;
        }
        const num = typeof value === 'number' ? value : Number(value);
        if (Number.isNaN(num)) {
            return null;
        }
        if (!Number.isFinite(num)) {
            return (num < 0 ? '-' : '') + '∞';
        }

        const parsed = NumberFormatter.parseNumber(num);
        NumberFormatter.roundNumber(parsed, this._digitsInfo.minFrac, this._digitsInfo.maxFrac);

        let digits = parsed.digits;
        let integerLen = parsed.integerLen;
        const isZero = digits.every(d => !d);

        for (; integerLen < this._digitsInfo.minInt; integerLen++) {
            digits.unshift(0);
        }
        for (; integerLen < 0; integerLen++) {
            digits.unshift(0);
        }

        let decimals: Array<number>;
        if (integerLen > 0) {
            decimals = digits.splice(integerLen, digits.length);
        } else {
            decimals = digits;
            digits = [0];
        }

        const groups: Array<string> = [];
        while (digits.length > GROUP_SIZE) {
            groups.unshift(digits.splice(-GROUP_SIZE, GROUP_SIZE).join(''));
        }
        groups.unshift(digits.join(''));

        let formatted = groups.join(this._groupSeparator);
        if (decimals.length) {
            formatted += this._decimalSeparator + decimals.join('');
        }
        if (parsed.exponent) {
            formatted += 'e+' + parsed.exponent;
        }
        return num < 0 && !isZero ? '-' + formatted : formatted;
    }

    /**
     * Parses the `digitsInfo` string in the same way as the angular `DecimalPipe`.
     */
    public static parseDigitsInfo(digitsInfo?: string): DigitsInfo {
        const result: DigitsInfo = {minInt: 1, minFrac: 0, maxFrac: 3};
        if (!digitsInfo) {
            return result;
        }
        const parts = digitsInfo.match(DIGITS_INFO_REGEX);
        if (parts === null) {
            throw new Error(`${digitsInfo} is not a valid digit info`);
        }
        if (parts[1] !== undefined) {
            result.minInt = parseInt(parts[1], 10);
        }
        if (parts[3] !== undefined) {
            result.minFrac = parseInt(parts[3], 10);
        }
        if (parts[5] !== undefined) {
            result.maxFrac = parseInt(parts[5], 10);
        } else if (parts[3] !== undefined && result.minFrac > result.maxFrac) {
            result.maxFrac = result.minFrac;
        }
        if (result.minFrac > result.maxFrac) {
            throw new Error(`The minimum number of digits after fraction (${result.minFrac}) is higher than the maximum (${result.maxFrac}).`);
        }
        return result;
    }

    /**
     * Splits the absolute value of the number into an array of digits and the length of its integer part.
     */
    protected static parseNumber(num: number): ParsedNumber {
        let numStr = Math.abs(num) + '';
        let exponent = 0;
        let digits: Array<number>;
        let integerLen: number;
        let i: number;
        let zeros: number;

        if ((integerLen = numStr.indexOf('.')) > -1) {
            numStr = numStr.replace('.', '');
        }
        if ((i = numStr.search(/e/i)) > 0) {
            if (integerLen < 0) {
                integerLen = i;
            }
            integerLen += +numStr.slice(i + 1);
            numStr = numStr.substring(0, i);
        } else if (integerLen < 0) {
            integerLen = numStr.length;
        }

        for (i = 0; numStr.charAt(i) === '0'; i++) {
        }

        if (i === (zeros = numStr.length)) {
            digits = [0];
            integerLen = 1;
        } else {
            zeros--;
            while (numStr.charAt(zeros) === '0') {
                zeros--;
            }
            integerLen -= i;
            digits = [];
            for (let j = 0; i <= zeros; i++, j++) {
                digits[j] = Number(numStr.charAt(i));
            }
        }

        if (integerLen > MAX_DIGITS) {
            digits = digits.splice(0, MAX_DIGITS - 1);
            exponent = integerLen - 1;
            integerLen = 1;
        }
        return {digits, exponent, integerLen};
    }

    /**
     * Rounds the parsed number (half away from zero) to the given number of fraction digits.
     */
    protected static roundNumber(parsed: ParsedNumber, minFrac: number, maxFrac: number): void {
        const digits = parsed.digits;
        let fractionLen = digits.length - parsed.integerLen;
        const fractionSize = Math.min(Math.max(minFrac, fractionLen), maxFrac);

        let roundAt = fractionSize + parsed.integerLen;
        const digit = digits[roundAt];

        if (roundAt > 0) {
            digits.splice(Math.max(parsed.integerLen, roundAt));
            for (let j = roundAt; j < digits.length; j++) {
                digits[j] = 0;
            }
        } else {
            fractionLen = Math.max(0, fractionLen);
            parsed.integerLen = 1;
            digits.length = Math.max(1, roundAt = fractionSize + 1);
            digits[0] = 0;
            for (let i = 1; i < roundAt; i++) {
                digits[i] = 0;
            }
        }

        if (digit >= 5) {
            if (roundAt - 1 < 0) {
                for (let k = 0; k > roundAt; k--) {
                    digits.unshift(0);
                    parsed.integerLen++;
                }
                digits.unshift(1);
                parsed.integerLen++;
            } else {
                digits[roundAt - 1]++;
            }
        }

        for (; fractionLen < Math.max(0, fractionSize); fractionLen++) {
            digits.push(0);
        }

        let dropTrailingZeros = fractionSize !== 0;
        const minLen = minFrac + parsed.integerLen;
        const carry = digits.reduceRight((c, d, i, arr) => {
            d = d + c;
            arr[i] = d < 10 ? d : d - 10;
            if (dropTrailingZeros) {
                if (arr[i] === 0 && i >= minLen) {
                    arr.pop();
                } else {
                    dropTrailingZeros = false;
                }
            }
            return d >= 10 ? 1 : 0;
        }, 0);
        if (carry) {
            digits.unshift(carry);
            parsed.integerLen++;
        }
    }
}
