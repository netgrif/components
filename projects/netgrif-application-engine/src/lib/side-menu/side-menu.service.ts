import {Injectable, TemplateRef, Type} from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material';
import {ComponentPortal, ComponentType, TemplatePortal} from '@angular/cdk/portal';
import {from, Observable} from 'rxjs';
import {PortalWrapper} from './portal-wrapper';

export enum SideMenuWidth {
    SMALL = 'side-menu-width-small',
    MEDIUM = 'side-menu-width-medium',
    LARGE = 'side-menu-width-large'
}

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {

    private _sideMenu: MatSidenav;
    private _portalWrapper: PortalWrapper;

    constructor() {}

    /**
     * Setter for _sideMenu.
     *
     * @param sideMenu - sidemenu
     */
    public setSideMenu(sideMenu: MatSidenav) {
        this._sideMenu = sideMenu;
    }

    public setPortal(portal: PortalWrapper) {
        this._portalWrapper = portal;
    }

    /**
     * Open this _sideMenu, and return a Observable that will resolve when it's fully opened (or get rejected if it didn't).
     *
     * @returns Observable<MatDrawerToggleResult>
     */
    public open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                   width: SideMenuWidth = SideMenuWidth.MEDIUM): Observable<MatDrawerToggleResult> {
        this._portalWrapper.width = width;
        this._createView(componentOrTemplateRef);
        return from(this._sideMenu.open());
    }

    private _createView<T>(template: ComponentType<T> | TemplateRef<T>) {
        if (template instanceof TemplateRef) {
            this._portalWrapper.portal = new TemplatePortal(template, null);
        }
        if (template instanceof Type) {
            this._portalWrapper.portal = new ComponentPortal(template);
        }
    }

    /**
     * Close this _sideMenu, and return a Observable that will resolve when it's fully closed (or get rejected if it didn't).
     *
     * @returns Observable<MatDrawerToggleResult>
     */
    public close(): Observable<MatDrawerToggleResult> {
        return from(this._sideMenu.close());
    }

    /**
     * Toggle this _sideMenu. This is equivalent to calling open() when it's already opened, or close() when it's closed.
     *
     * @param  isOpen  Whether the _sideMenu should be open.
     *
     * @returns open or close side menu
     */
    public toggle(isOpen?: boolean): Observable<MatDrawerToggleResult> {
        return from(this._sideMenu.toggle(isOpen));
    }
}
