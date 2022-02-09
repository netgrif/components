import moment, {Moment} from 'moment';

/**
 * [year month day hour minute second timestamp]
 * month and day are 1 indexed
 */
export type NaeDate = Array<number>;

export function toMoment(date: NaeDate): Moment {
    return moment(
        new Date(date[0],
                date[1] - 1,
                date[2],
                date[3] !== undefined ? date[3] : 12,
                date[4] !== undefined ? date[4] : 0)
    );
}
