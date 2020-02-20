import {Injectable} from '@angular/core';
import {LogEntry, LogEntryConfiguration} from '../models/log-entry';
import {LogPublisherService} from './log-publisher.service';

export enum LogLevel {
    ALL = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    OFF = 6
}

export interface LoggerConfiguration extends LogEntryConfiguration {
    level?: LogLevel;
}

export abstract class AbstractLoggerService {

    protected readonly config: LoggerConfiguration;
    protected readonly publisher: LogPublisherService;

    protected constructor(private publisherService: LogPublisherService) {
        this.publisher = publisherService;
        this.config = {
            logWithDate: true,
            serializeParams: true,
            level: LogLevel.ALL
        };
    }

    get level() {
        return this.config.level;
    }

    protected shouldLog(level: LogLevel): boolean {
        return (level >= this.level && level !== LogLevel.OFF) || this.level === LogLevel.ALL;
    }

    protected writeToLog(level: LogLevel, message: string, params: object): void {
        if (!this.shouldLog(level)) {
            return;
        }
        const entry = new LogEntry(level, message, params, this.config);
        this.publisher.publish(entry);
    }

    info(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.INFO, message, params);
    }

    debug(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.DEBUG, message, params);
    }

    warn(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.WARN, message, params);
    }

    error(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.ERROR, message, params);
    }

    log(level: LogLevel, message: string, ...param: Array<any>): void {
        this.writeToLog(level, message, param);
    }
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService extends AbstractLoggerService {

    constructor(publisherService: LogPublisherService) {
        super(publisherService);
    }
}
