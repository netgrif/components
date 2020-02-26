import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoggerService, SideMenuService, UserAssignComponent} from '@netgrif/application-engine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    @ViewChild('templatePortal') templatePortal: TemplateRef<any>;

    constructor(log: LoggerService, private sideMenuService: SideMenuService) {
        log.info('App component has started');
    }

    public toggleSideMenu() {
        this.sideMenuService.open(UserAssignComponent);
    }
}
