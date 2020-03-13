import {Portal} from "@angular/cdk/portal";
import {SideMenuWidth} from "./side-menu.service";

export class PortalWrapper {
    constructor(public portal: Portal<any> = null, public width?: SideMenuWidth) {};
}
