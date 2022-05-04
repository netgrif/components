import moment from 'moment';
import {clearTimeInformation} from './clear-time-information';
import {TestBed} from '@angular/core/testing';


describe('clearTimeInformation', () => {
    it('should clear information correctly', () => {
        const dateTime = moment('2021-01-14 07:50:42.069');
        expect(dateTime).toBeTruthy();
        expect(dateTime.milliseconds()).toEqual(69);
        expect(dateTime.seconds()).toEqual(42);
        expect(dateTime.minutes()).toEqual(50);
        expect(dateTime.hours()).toEqual(7);
        expect(dateTime.date()).toEqual(14);
        expect(dateTime.month()).toEqual(0); // month is 0 indexed
        expect(dateTime.year()).toEqual(2021);

        clearTimeInformation(dateTime);

        expect(dateTime.milliseconds()).toEqual(0);
        expect(dateTime.seconds()).toEqual(0);
        expect(dateTime.minutes()).toEqual(0);
        expect(dateTime.hours()).toEqual(0);
        expect(dateTime.date()).toEqual(14);
        expect(dateTime.month()).toEqual(0);
        expect(dateTime.year()).toEqual(2021);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
