import {ofVoid} from './of-void';

describe('ofVoid', () => {

    it('should emit', () => {
        const sub = ofVoid().subscribe();
        expect(sub.closed).toBeTrue();
    });

});
