import {Observable, Subject, throwError} from 'rxjs';
import {SideMenuEvent} from './side-menu-event';
import {filter} from 'rxjs/operators';

export class SideMenuRef {

    constructor(private _event$: Subject<SideMenuEvent>) {
    }

    get onEvent(): Observable<SideMenuEvent> {
        return !!this._event$ ? this._event$.asObservable() :
            throwError(new Error('Side menu event stream was not correctly bound to side menu component!'));
    }

    get onClose(): Observable<SideMenuEvent> {
        return !!this._event$ ? this._event$.pipe(filter((event) => !event.opened)) :
            throwError(new Error('Side menu close event stream was not correctly bound to side menu component!'));
    }

}
