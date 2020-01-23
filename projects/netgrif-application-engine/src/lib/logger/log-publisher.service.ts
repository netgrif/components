import {Injectable} from '@angular/core';
import {LogPublisher} from './publishers/LogPublisher';
import {BehaviorSubject, Subject} from 'rxjs';
import {LogEntry} from './LogEntry';
import {ConsoleLogPublisher} from './publishers/ConsoleLogPublisher';
import {LocalStorageLogPublisher} from './publishers/LocalStorageLogPublisher';

const PUBLISHERS = {
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

    register(publisher: LogPublisher): Subject<LogEntry> {
        if (!publisher) {
            return null;
        }
        this._publishers.push(publisher);
        return this._log;
    }

    publish(entry: LogEntry): void {
        if (!entry) {
            return;
        }
        this._log.next(entry);
        console.log(this._log.getValue().toString());
    }

    clearAll(): void {
        this._publishers.forEach(publisher => publisher.clear());
    }
}
