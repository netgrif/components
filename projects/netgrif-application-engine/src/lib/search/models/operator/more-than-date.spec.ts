import {MoreThanDate} from './more-than-date';
import {OperatorService} from '../../operator-service/operator.service';
import moment from 'moment';
import {OperatorResolverService} from '../../operator-service/operator-resolver.service';

describe('MoreThanDate', () => {
    it('should create an instance', () => {
        expect(new MoreThanDate(new OperatorService(new OperatorResolverService()))).toBeTruthy();
    });

    it('moment handles negative rollover', () => {
        // native Date supports negative rollover, but I couldn't find mentions of it in Moment.js doc

        const dateTime = moment('2021-01-14 07:50:42.069');
        expect(dateTime).toBeTruthy();
        expect(dateTime.milliseconds()).toEqual(69);
        expect(dateTime.seconds()).toEqual(42);
        expect(dateTime.minutes()).toEqual(50);
        expect(dateTime.hours()).toEqual(7);
        expect(dateTime.date()).toEqual(14);
        expect(dateTime.month()).toEqual(0); // month is 0 indexed
        expect(dateTime.year()).toEqual(2021);

        dateTime.milliseconds(-1);

        expect(dateTime.milliseconds()).toEqual(999);
        expect(dateTime.seconds()).toEqual(41);
        expect(dateTime.minutes()).toEqual(50);
        expect(dateTime.hours()).toEqual(7);
        expect(dateTime.date()).toEqual(14);
        expect(dateTime.month()).toEqual(0);
        expect(dateTime.year()).toEqual(2021);
    });
});
