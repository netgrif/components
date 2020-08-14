import {ofVoid} from './of-void';

describe('ofVoid', () => {

    it('should emit', (done) => {
        ofVoid().subscribe(() => {
            done();
        });
    });

});
