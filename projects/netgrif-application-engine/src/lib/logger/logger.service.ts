import {Injectable} from '@angular/core';

export interface Logger {
    info(message: string, args?: Array<object> | object): string;
}

@Injectable()
export class LoggerService implements Logger {

    constructor() {
    }

    protected formatMessage(msg: string): string {
        return new Date().toISOString() + ': ' + msg;
    }

    info(message: string, args?: Array<object> | object): string {
        console.log(this.formatMessage(message), args);
        return this.formatMessage(message);
    }

}
