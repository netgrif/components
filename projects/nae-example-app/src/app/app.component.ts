import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoggerService, UserField, User, TaskPanelDefinition} from '@netgrif/application-engine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';
    taskPanelDef: TaskPanelDefinition;

    @ViewChild('templatePortal') templatePortal: TemplateRef<any>;

    constructor(log: LoggerService) {
        log.info('App component has started');
        this.taskPanelDef = {featuredFields : [], panelIcon: 'home', panelIconField: 'home'};
    }
}
