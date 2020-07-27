import {LogEntry} from '../models/log-entry';
import {LogPublisherService} from '../services/log-publisher.service';

export abstract class LogPublisher {

    protected location: string;

    constructor(publisherService: LogPublisherService) {
        publisherService
            .register(this)
            .subscribe(entry => {
                if (entry) {
                    this.log(entry);
                }
            });
    }

    abstract log(entry: LogEntry): void;

    abstract clear(): void;
}
