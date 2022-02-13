import {QueuedEvent} from './queued-event';

describe('QueuedEvent', () => {
    it('should create an instance', () => {
        expect(new QueuedEvent(() => true, () => {})).toBeTruthy();
    });
});
