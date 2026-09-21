import {decodeBase64, encodeBase64} from "./base64";


describe('Base64Utils', () => {

    it('should encode/decode non-latin characters', (done) => {
        const nonLatin = 'ššščččôôôžžťťť';
        const encoded = encodeBase64(nonLatin);
        const decoded = decodeBase64(encoded);
        expect(decoded).toEqual(nonLatin);
        done();
    });

    it('should encode/decode all characters', (done) => {
        const allChar = '+ľščťžýáíqwertzuiopúasdfghjklô§äú§ň><.-,mm,yé=;QWERTZUIOP/ASDFGHJKLYXCVBNM?%(!")_:?:_%A`@#$~^&*{}qwertzuiopasdfghjklyxcvbnm0/*-+≤≥0123456789';
        const encoded = encodeBase64(allChar);
        const decoded = decodeBase64(encoded);
        expect(decoded).toEqual(allChar);
        done();
    });

})
