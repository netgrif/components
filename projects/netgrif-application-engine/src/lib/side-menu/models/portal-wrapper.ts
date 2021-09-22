import {Portal} from '@angular/cdk/portal';
import {SideMenuSize} from './side-menu-size';

export class PortalWrapper<T = any> {
    constructor(private _portal: Portal<T> | null, private _width?: SideMenuSize) {}

    get portal(): Portal<T> | null {
        return this._portal;
    }

    get size(): SideMenuSize | undefined {
        return this._width;
    }
}
