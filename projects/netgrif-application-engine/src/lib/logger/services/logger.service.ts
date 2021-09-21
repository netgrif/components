import {Injectable} from '@angular/core';
import {LogEntry, LogEntryConfiguration} from '../models/log-entry';
import {LogPublisherService} from './log-publisher.service';
import {LogLevel} from './log-level';
import {ConfigurationService} from '../../configuration/configuration.service';

export interface LoggerConfiguration extends LogEntryConfiguration {
    level?: LogLevel;
}

export abstract class AbstractLoggerService {

    protected readonly config: LoggerConfiguration;
    protected readonly publisher: LogPublisherService;

    protected constructor(private publisherService: LogPublisherService, _config: ConfigurationService) {
        this.publisher = publisherService;
        this.config = {
            logWithDate: true,
            serializeParams: true,
            level: LogLevel.ALL
        };
        const servicesConfig = _config.get().services;
        if (servicesConfig && servicesConfig.log) {
            this.config = Object.assign(this.config, servicesConfig.log, {level: this.resolveLevel(servicesConfig.log.level)});
        }
    }

    public get level() {
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

    public info(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.INFO, message, params);
    }

    public debug(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.DEBUG, message, params);
    }

    public warn(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.WARN, message, params);
    }

    public error(message: string, ...params: Array<any>): void {
        this.writeToLog(LogLevel.ERROR, message, params);
    }

    public errorAndThrow(error: Error): never {
        this.error(error.message);
        throw error;
    }

    public log(level: LogLevel, message: string, ...param: Array<any>): void {
        this.writeToLog(level, message, param);
    }

    private resolveLevel(level: string): LogLevel {
        if (!level) {
            return LogLevel.OFF;
        }
        return LogLevel[level] as LogLevel;
    }
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService extends AbstractLoggerService {

    constructor(publisherService: LogPublisherService, config: ConfigurationService) {
        super(publisherService, config);
    }
}
