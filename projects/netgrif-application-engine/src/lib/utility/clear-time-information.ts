import {Moment} from 'moment';

/**
 * Sets milliseconds, seconds, minutes and hours of the provided Moment object to 0
 * @param date object that we want to clear time information from
 */
export function clearTimeInformation(date: Moment): void {
    date.milliseconds(0);
    date.seconds(0);
    date.minutes(0);
    date.hours(0);
}
