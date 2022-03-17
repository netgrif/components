import {QueuedEvent} from './queued-event';
import {TestBed} from '@angular/core/testing';

describe('QueuedEvent', () => {
    it('should create an instance', () => {
        expect(new QueuedEvent(() => true, () => {})).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
