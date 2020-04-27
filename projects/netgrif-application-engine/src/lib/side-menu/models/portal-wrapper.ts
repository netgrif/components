import {Portal} from '@angular/cdk/portal';
import {SideMenuSize} from './side-menu-size';

export class PortalWrapper<T = any> {
    constructor(private _portal: Portal<T>, private _width?: SideMenuSize) {}

    get portal(): Portal<T> {
        return this._portal;
    }

    get size(): SideMenuSize {
        return this._width;
    }
}
