import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PortalWrapper} from '../models/portal-wrapper';
import {SideMenuService} from '../services/side-menu.service';
import {from, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';

@Component({
    selector: 'ncc-abstract-side-menu-container',
    template: ''
})
export abstract class AbstractSideMenuContainerComponent implements AfterViewInit {

    @ViewChild('rightSideMenu') public sideMenu: MatSidenav;
    public portalWrapper: PortalWrapper;


    public constructor(protected _sideMenuService: SideMenuService) {
        this.portalWrapper = new PortalWrapper<any>(null, null);
    }

    ngAfterViewInit() {
        this._sideMenuService.registerSideMenu(this);
    }

    public open(portalWrapper: PortalWrapper): Observable<MatDrawerToggleResult> {
        this.portalWrapper = portalWrapper;
        return from(this.sideMenu.open());
    }

    public close(context: AbstractSideMenuContainerComponent): Observable<MatDrawerToggleResult> {
        return from(context.sideMenu.close()).pipe(
            tap((result) => {
                if (result === 'close') {
                    context.portalWrapper = context.portalWrapper = new PortalWrapper<any>(null, null);
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
