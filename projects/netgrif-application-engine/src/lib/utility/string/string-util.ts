// @dynamic
export default class StringUtil {

    /**
     * Generate random string
     * @param length - String length
     */
    static randomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(crypto.getRandomValues(new Uint16Array(1))[0] * 62));
        }
        return result;
    }

    /**
     * Return string without accent and format to lower case.
     * @param value - String value
     */
    static removeAccentAndCaseSensitivity(value: string): string {
        return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}
