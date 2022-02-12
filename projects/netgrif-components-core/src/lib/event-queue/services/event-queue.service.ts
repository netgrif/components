import {Injectable} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {QueuedEvent} from '../model/queued-event';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {CallChainService} from '../../utility/call-chain/call-chain.service';

/**
 * This service handles the queuing and execution of task related events (assign, finish, cancel, delegate, setData and getData)
 */
@Injectable({
    providedIn: 'root'
})
export class EventQueueService {

    protected _queue: Array<QueuedEvent>;
    protected _performingEvent: LoadingEmitter;

    constructor(protected _log: LoggerService, protected _afterActionService: CallChainService) {
        this._queue = [];
        this._performingEvent = new LoadingEmitter();
    }

    /**
     * Schedules the execution of the provided event
     * @param event
     */
    public scheduleEvent(event: QueuedEvent) {
        if (this._performingEvent.isActive) {
            this._log.debug(`Adding scheduled event to queue. Position in queue: ${this._queue.length}`);
            this._queue.push(event);
        } else {
            this._log.debug('Event queue is empty. Executing scheduled event immediately.');
            this._performingEvent.on();
            this.executeEvent(event);
        }
    }

    protected executeEvent(event: QueuedEvent) {
        event.resolve(this._afterActionService.create(() => {
            this.executeNextEventFromQueue();
        }));
    }

    protected executeNextEventFromQueue() {
        this._log.debug('Event finished execution.');

        if (this._queue.length === 0) {
            this._performingEvent.off();
            this._log.debug('Last event in queue was executed.');
            return;
        }

        this._log.debug('Executing next event in queue.');
        this.executeEvent(this._queue.shift());
    }
}
