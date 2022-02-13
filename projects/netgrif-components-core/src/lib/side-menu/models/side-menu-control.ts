import {Observable, of, Subject} from 'rxjs';
import {SideMenuEvent} from './side-menu-event';
import {SideMenuInjectionData} from './side-menu-injection-data';
import {tap} from 'rxjs/operators';
import {MatDrawerToggleResult} from '@angular/material/sidenav';

export class SideMenuControl {

    private _event$: Subject<SideMenuEvent>;

    constructor(bindingsFunction: (event$: Subject<SideMenuEvent>) => void = () => {},
                sideMenuOpenedStateChange: Observable<boolean> = of(true),
                private sideMenuCloseFunction: () => Observable<MatDrawerToggleResult>,
                private readonly _injectionData?: SideMenuInjectionData,
                public isVersionVisible?: boolean,
                public allVersionEnabled?: boolean) {
        this._event$ = new Subject<SideMenuEvent>();
        bindingsFunction(this._event$);
        sideMenuOpenedStateChange.subscribe((opened) => {
            if (!opened) {
                this._event$.next({opened, message: 'Side menu closed unexpectedly'});
                this._event$.complete();
            }
        });
    }

    get data(): SideMenuInjectionData {
        return this._injectionData;
    }

    public publish(event: SideMenuEvent): void {
        this._event$.next(event);
    }

    public close(event: SideMenuEvent): Observable<MatDrawerToggleResult> {
        if (!event.message) {
            event.message = 'Side menu is closing';
        }
        this._event$.next({...event, opened: false});
        return this.sideMenuCloseFunction().pipe(
            tap((closed) => {
                if (closed === 'close') {
                    this._event$.complete();
                }
            })
        );
    }
}
