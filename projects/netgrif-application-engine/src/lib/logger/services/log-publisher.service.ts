import {Injectable, OnDestroy} from '@angular/core';
import {LogPublisher} from '../publishers/log-publisher';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LogEntry} from '../models/log-entry';
import {ConsoleLogPublisher} from '../publishers/console-log-publisher';
import {LocalStorageLogPublisher} from '../publishers/local-storage-log-publisher';
import {ConfigurationService} from '../../configuration/configuration.service';

export const PUBLISHERS = {
    console: ConsoleLogPublisher,
    localStorage: LocalStorageLogPublisher,
    backend: null
};

@Injectable({
    providedIn: 'root'
})
export class LogPublisherService implements OnDestroy {

    // public static instance: LogPublisherService;

    private readonly _log: BehaviorSubject<LogEntry>;
    private readonly _publishers: Array<LogPublisher>;

    constructor(config: ConfigurationService) {
        // LogPublisherService.instance = this;
        this._log = new BehaviorSubject<LogEntry>(null);
        this._publishers = [];
        const serviceConfig = config.get().services;
        if (serviceConfig && serviceConfig.log && serviceConfig.log.publishers) {
            Object.keys(PUBLISHERS).filter(p => serviceConfig.log.publishers.includes(p) && PUBLISHERS[p])
                .forEach(key => new PUBLISHERS[key](this));
        }
    }

    ngOnDestroy(): void {
        this._log.complete();
    }

    get publishers(): Array<LogPublisher> {
        return this._publishers;
    }

    register(publisher: LogPublisher): Observable<LogEntry> {
        if (!publisher) {
            return of(null);
        }
        this._publishers.push(publisher);
        return this._log;
    }

    publish(entry: LogEntry): void {
        if (!entry) {
            return;
        }
        this._log.next(entry);
    }

    clearAll(): void {
        this._publishers.forEach(publisher => publisher.clear());
    }
}
