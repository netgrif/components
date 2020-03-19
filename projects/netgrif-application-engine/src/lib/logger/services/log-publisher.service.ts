import {Injectable} from '@angular/core';
import {LogPublisher} from '../publishers/log-publisher';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LogEntry} from '../models/log-entry';
import {ConsoleLogPublisher} from '../publishers/console-log-publisher';
import {LocalStorageLogPublisher} from '../publishers/local-storage-log-publisher';

export const PUBLISHERS = {
    ConsoleLogPublisher,
    LocalStorageLogPublisher
};

@Injectable({
    providedIn: 'root'
})
export class LogPublisherService {

    // public static instance: LogPublisherService;

    private readonly _log: BehaviorSubject<LogEntry>;
    private readonly _publishers: LogPublisher[];

    constructor() {
        // LogPublisherService.instance = this;
        this._log = new BehaviorSubject<LogEntry>(null);
        this._publishers = [];
        Object.keys(PUBLISHERS).forEach(key => new PUBLISHERS[key](this));
    }

    get publishers(): LogPublisher[] {
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
