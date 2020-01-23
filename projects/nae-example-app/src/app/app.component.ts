import {Component} from '@angular/core';
import {LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    constructor(log: LoggerService) {
        log.info('App component has started');
    }
}
