import {Inject, Injectable, Injector, Optional, TemplateRef, Type} from '@angular/core';
import {ComponentPortal, ComponentType, TemplatePortal} from '@angular/cdk/portal';
import {Observable} from 'rxjs';
import {NAE_SIDE_MENU_CONTROL} from '../side-menu-injection-token';
import {SideMenuSize} from '../models/side-menu-size';
import {PortalWrapper} from '../models/portal-wrapper';
import {SideMenuRef} from '../models/side-menu-ref';
import {SideMenuInjectionData} from '../models/side-menu-injection-data';
import {SideMenuControl} from '../models/side-menu-control';
import {SideMenuEvent} from '../models/side-menu-event';
import {MatDrawerToggleResult} from '@angular/material/sidenav';
import {NAE_NET_ALL_VERSIONS, NAE_NET_VERSION_VISIBLE} from '../net-version-visible-injection-token';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {

    private _sideMenuComponent: any; // SideMenuContainerComponent
    private _controlObject: SideMenuControl;

    private readonly isVersionVisible: boolean;
    private readonly allVersionEnabled: boolean;

    constructor(@Optional() @Inject(NAE_NET_VERSION_VISIBLE) isVersionVisible: boolean,
                @Optional() @Inject(NAE_NET_ALL_VERSIONS) allVersionEnabled: boolean) {
        this.isVersionVisible = isVersionVisible !== null ? isVersionVisible : true;
        this.allVersionEnabled = allVersionEnabled !== null ? allVersionEnabled : false;
    }

    /**
     * register SideMenuContainerComponent
     *
     * params menu is SideMenuContainerComponent
     */
    public registerSideMenu(menu: any): void {
        if (this._sideMenuComponent) {
            throw new Error('SideMenuContainerComponent has been already registered!');
        }
        this._sideMenuComponent = menu;
    }

    public isOpened(): boolean {
        return this._sideMenuComponent.isOpened();
    }

    /**
     * Open this _sideMenu, and return a Observable that will resolve when it's fully opened (or get rejected if it didn't).
     *
     * @returns Observable<MatDrawerToggleResult>
     */
    public open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                   width: SideMenuSize = SideMenuSize.MEDIUM,
                   injectionData?: SideMenuInjectionData): SideMenuRef {
        if (this._sideMenuComponent.isOpened()) {
            throw new Error('Side menu has been already opened with another content');
        }

        let ref: SideMenuRef = new SideMenuRef(null);
        this._controlObject = new SideMenuControl(((event) => {
            ref = new SideMenuRef(event);
        }), this._sideMenuComponent.openedChange(), () => this._sideMenuComponent.close(this._sideMenuComponent),
            injectionData, this.isVersionVisible, this.allVersionEnabled);

        const wrapper = this._createPortal(componentOrTemplateRef, width, this._controlObject);
        this._sideMenuComponent.open(wrapper).subscribe((opened) => {
            if (opened === 'open') {
                this._controlObject.publish({opened: true});
            }
        });
        return ref;
    }

    private _createPortal<T>(template: ComponentType<T> | TemplateRef<T>,
                             size: SideMenuSize,
                             controlObject: SideMenuControl): PortalWrapper {
        if (template === undefined || template === null) {
            throw new Error('A component template must be provided to open a side menu!');
        }
        if (template instanceof TemplateRef) {
            return new PortalWrapper(new TemplatePortal(template, null), size);
        }
        if (template instanceof Type) {
            const injector = Injector.create({providers: [{provide: NAE_SIDE_MENU_CONTROL, useValue: controlObject}]});
            return new PortalWrapper(new ComponentPortal(template, null, injector), size);
        }
    }

    /**
     * Close this _sideMenu, and return a Observable that will resolve when it's fully closed (or get rejected if it didn't).
     *
     * @returns Observable<MatDrawerToggleResult>
     */
    public close(closeEvent?: SideMenuEvent): Observable<MatDrawerToggleResult> {
        return this._controlObject.close(closeEvent);
    }

    /**
     * Toggle this _sideMenu. This is equivalent to calling close() when it's already opened, or open() when it's closed.
     *
     * @param  isOpen  Whether the _sideMenu should be open.
     *
     * @returns open or close side menu
     */
    // public toggle(isOpen?: boolean): Observable<MatDrawerToggleResult> {
    //     return from(this._sideMenu.toggle(isOpen));
    // }
}
