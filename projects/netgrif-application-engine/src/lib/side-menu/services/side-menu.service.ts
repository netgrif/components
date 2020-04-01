import {Injectable, Injector, StaticProvider, TemplateRef, Type} from '@angular/core';
import {MatDrawerToggleResult} from '@angular/material';
import {ComponentPortal, ComponentType, TemplatePortal} from '@angular/cdk/portal';
import {from, Observable} from 'rxjs';
import {NAE_SIDE_MENU_DATA} from '../side-menu-injection-token.module';
import {SideMenuSize} from '../models/side-menu-size';
import {SideMenuContainerComponent} from '../side-menu-container/side-menu-container.component';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {

    private _sideMenuComponent: SideMenuContainerComponent;
    private _opened: boolean;

    constructor() {
        this._opened = false;
    }

    public registerSideMenu(menu: SideMenuContainerComponent): void {
        if (this._sideMenuComponent) {
            throw new Error('SideMenuContainerComponen has been already registered!');
        }
        this._sideMenuComponent = menu;
    }

    /**
     * Open this _sideMenu, and return a Observable that will resolve when it's fully opened (or get rejected if it didn't).
     *
     * @returns Observable<MatDrawerToggleResult>
     */
    public open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                   width: SideMenuSize = SideMenuSize.MEDIUM,
                   injectionData?: any): Observable<MatDrawerToggleResult> {
        if (this._opened) {
            throw new Error('Side menu has been already opened with another conent');
        }


        this._portalWrapper.width = width;
        this._createView(componentOrTemplateRef, injectionData);
        return from(this._sideMenu.open());
    }

    private _createView<T>(template: ComponentType<T> | TemplateRef<T>, injectionData?: any) {
        if (template instanceof TemplateRef) {
            this._portalWrapper.portal = new TemplatePortal(template, null);
        }
        if (template instanceof Type) {
            const providers: Array<StaticProvider> = [];
            if (injectionData !== undefined) {
                providers.push({provide: NAE_SIDE_MENU_DATA, useValue: injectionData});
            }
            const injector = Injector.create({providers});
            this._portalWrapper.portal = new ComponentPortal(template, null, injector);
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
     * Toggle this _sideMenu. This is equivalent to calling close() when it's already opened, or open() when it's closed.
     *
     * @param  isOpen  Whether the _sideMenu should be open.
     *
     * @returns open or close side menu
     */
    public toggle(isOpen?: boolean): Observable<MatDrawerToggleResult> {
        return from(this._sideMenu.toggle(isOpen));
    }
}
