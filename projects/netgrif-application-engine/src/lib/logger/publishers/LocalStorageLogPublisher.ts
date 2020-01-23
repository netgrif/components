import {LogPublisher} from './LogPublisher';
import {LogEntry} from '../LogEntry';
import {LogPublisherService} from '../log-publisher.service';

export class LocalStorageLogPublisher extends LogPublisher {

    constructor(publisherService: LogPublisherService, logKey?: string) {
        super(publisherService);
        this.location = !logKey ? 'application-log' : logKey;
    }

    clear(): void {
        localStorage.removeItem(this.location);
    }

    log(entry: LogEntry): void {
        if (entry) {
            return;
        }
        const logString: string = localStorage.getItem(this.location);
        let log: LogEntry[];
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
            } catch (e) {
                console.error(e);
            }
        }
    }

}
