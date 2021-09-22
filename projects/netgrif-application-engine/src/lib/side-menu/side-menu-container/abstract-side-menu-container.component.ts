import {AfterViewInit, ViewChild} from '@angular/core';
import {PortalWrapper} from '../models/portal-wrapper';
import {SideMenuService} from '../services/side-menu.service';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {tap} from 'rxjs/operators';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';

export abstract class AbstractSideMenuContainerComponent implements AfterViewInit {

    @ViewChild('rightSideMenu') public sideMenu: MatSidenav;
    public portalWrapper: PortalWrapper;


    public constructor(protected _sideMenuService: SideMenuService) {
        this.portalWrapper = new PortalWrapper<any>(null);
    }

    ngAfterViewInit() {
        this._sideMenuService.registerSideMenu(this);
    }

    public open(portalWrapper: PortalWrapper): Observable<MatDrawerToggleResult> {
        this.portalWrapper = portalWrapper;
        return fromPromise(this.sideMenu.open());
    }

    public close(context: AbstractSideMenuContainerComponent): Observable<MatDrawerToggleResult> {
        return fromPromise(context.sideMenu.close()).pipe(
            tap((result) => {
                if (result === 'close') {
                    context.portalWrapper = context.portalWrapper = new PortalWrapper<any>(null);
                }
            })
        );
    }

    public isOpened(): boolean {
        return this.sideMenu.opened;
    }

    public openedChange(): Observable<boolean> {
        return this.sideMenu.openedChange.asObservable();
    }

}
