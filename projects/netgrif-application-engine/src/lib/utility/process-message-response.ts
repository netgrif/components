import {MessageResource} from '../resources/interface/message-resource';
import {Observable, of, throwError} from 'rxjs';

/**
 * Transforms a {@link MessageResource} object into a stream containing either the message
 * or an error if the message resource contains an error.
 *
 * Can be used with rxjs' `switchMap` process responses from backend.
 * @param message a {@link MessageResource} object
 */
export function processMessageResponse(message: MessageResource): Observable<MessageResource> {
    if (message.error) {
        return throwError(new Error(message.error));
    } else {
        return of(message);
    }
}
