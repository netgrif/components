import {LogLevel} from '../services/log-level';

/**
 * Log entry configuration.
 * All attributes are optional.
 * Attributes that are not present in the configuration object are set to their default value.
 */
export interface LogEntryConfiguration {
    logWithDate?: boolean;
    serializeParams?: boolean;
    includeLogLevel?: boolean;

    [k: string]: any;
}

export class LogEntry {

    public readonly date: Date;
    public readonly level: LogLevel;
    public readonly message: string;
    public readonly params: object;
    public readonly config: LogEntryConfiguration;

    /**
     * Log entry class
     * @param level - Log level of this entry
     * @param message - message to write to the log
     * @param params - additional parameters to write into the log
     * @param config - extra class configuration
     */
    constructor(level: LogLevel, message: string, params?: object, config?: LogEntryConfiguration) {
        this.date = new Date();
        this.level = level;
        this.message = message;
        this.params = params;
        const defaults: LogEntryConfiguration = {
            logWithDate: true,
            serializeParams: true,
            includeLogLevel: true
        };
        this.config = {...defaults, ...config};
    }

    get levelString(): string {
        return LogLevel[this.level.toString()];
    }

    /**
     * Serialization of additional parameters of the entry.
     * @return Serialized JSON
     */
    private serializeParams(): string {
        if (!this.config.serializeParams) {
            return '';
        }
        return JSON.stringify(this.params);
    }

    /**
     * Stringify log entry. According to configuration entry can include time, log level and extra parameters
     * @return Log string
     */
    toString(): string {
        let str = '';
        if (this.config.logWithDate) {
            str += '[' + this.date.toISOString() + '] ';
        }
        if (this.config.includeLogLevel) {
            str += '<' + this.levelString + '> ';
        }
        str += this.message;
        if (this.config.serializeParams && this.params) {
            if (this.params instanceof Array) {
                if (this.params.length !== 0) {
                    str += ' , params: ' + this.serializeParams();
                }
            } else {
                str += ' , params: ' + this.serializeParams();
            }
        }
        return str;
    }

}
