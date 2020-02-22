import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoggerService, UserField, User} from '@netgrif/application-engine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    @ViewChild('templatePortal') templatePortal: TemplateRef<any>;
    public userField: UserField = new UserField('Title', 'Userfield', new User('Daniel', 'Vaník', 'vanik.daniel@gmail.com'), undefined);

    constructor(log: LoggerService) {
        log.info('App component has started');
    }
}
