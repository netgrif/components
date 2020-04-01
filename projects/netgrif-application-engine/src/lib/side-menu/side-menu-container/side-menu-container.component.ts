import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {PortalWrapper} from '../models/portal-wrapper';
import {SideMenuService} from '../services/side-menu.service';

@Component({
  selector: 'nae-side-menu-container',
  templateUrl: './side-menu-container.component.html',
  styleUrls: ['./side-menu-container.component.scss']
})
export class SideMenuContainerComponent implements AfterViewInit {

    @ViewChild('rightSideMenu') public sideMenu: MatSidenav;
    public portalWrapper = new PortalWrapper(null);


    public constructor(private _sideMenuService: SideMenuService) { }

    ngAfterViewInit() {
        this._sideMenuService.setSideMenu(this.sideMenu);
        this._sideMenuService.setPortal(this.portalWrapper);
    }

}
