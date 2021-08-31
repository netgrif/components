import {LogPublisher} from './log-publisher';
import {LogEntry} from '../models/log-entry';
import {LogPublisherService} from '../services/log-publisher.service';

export class LocalStorageLogPublisher extends LogPublisher {

    public static readonly DEFAULT_KEY = 'application-log';

    constructor(publisherService: LogPublisherService, logKey?: string) {
        super(publisherService);
        this.location = !logKey ? LocalStorageLogPublisher.DEFAULT_KEY : logKey;
    }

    clear(): void {
        localStorage.removeItem(this.location);
    }

    log(entry: LogEntry): void {
        if (!entry) {
            return;
        }
        const logString: string = localStorage.getItem(this.location);
        let log: Array<LogEntry>;
        if (!logString) {
            log = [];
        } else {
            log = JSON.parse(logString);
        }
        log.push(entry);
        try {
            localStorage.setItem(this.location, JSON.stringify(log));
        } catch (e) {
            const deleted: LogEntry = log.splice(0, 1)[0];
            console.debug('Log entry from ' + deleted.date.toISOString() + ' was deleted from the LocalStorage \'' + this.location + '\'');
            try {
                localStorage.setItem(this.location, JSON.stringify(log));
            } catch (ex) {
                console.error(ex);
                throw new Error(ex.message);
            }
        }
    }

}
